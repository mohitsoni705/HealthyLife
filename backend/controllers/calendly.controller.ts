import crypto from "node:crypto";
import type { Request, Response } from "express";
import { z } from "zod";
import pool from "../config/db.ts";
import CalendlyService, {
  CalendlyServiceError,
} from "../services/calendly.service.ts";
import type { AuthenticatedRequest } from "../middlewares/reception.middleware.ts";

const availabilitySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
const bookingSchema = z.object({
  patientId: z.coerce.number().int().positive(),
  doctorId: z.coerce.number().int().positive(),
  startTime: z.string().datetime({ offset: true }),
  reason: z.string().trim().max(1000).optional().default(""),
  appointmentType: z.string().trim().max(100).optional(),
});

const calendly = new CalendlyService();

async function doctorWithCalendly(doctorId: number) {
  const result = await pool.query(
    `SELECT d.*, u.username, u.email
     FROM doctor d JOIN users_data u ON u.user_id = d.user_id
     WHERE d.user_id = $1`,
    [doctorId],
  );
  return result.rows[0] || null;
}

export async function getDoctorAvailability(req: Request, res: Response) {
  const parsed = availabilitySchema.safeParse(req.query);
  if (!parsed.success)
    return res
      .status(400)
      .json({ message: "A valid appointment date is required" });
  if (parsed.data.date < new Date().toISOString().slice(0, 10)) {
    return res
      .status(400)
      .json({ message: "Appointment date must be in the future" });
  }
  const doctorId = Number(req.params.doctorId);
  if (!Number.isInteger(doctorId) || doctorId <= 0)
    return res.status(400).json({ message: "Invalid doctor" });

  try {
    const doctor = await doctorWithCalendly(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    if (!doctor.calendly_event_type_uri) {
      return res
        .status(422)
        .json({ message: "This doctor has no Calendly configuration" });
    }
    const collection = await calendly.getAvailability(
      doctor.calendly_event_type_uri,
      parsed.data.date,
    );
    return res.json({
      slots: collection.map((slot) => ({ startTime: slot.start_time })),
    });
  } catch (error) {
    return calendlyError(res, error, "Unable to load doctor's availability");
  }
}

export async function bookCalendlyAppointment(
  req: AuthenticatedRequest,
  res: Response,
) {
  const parsed = bookingSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ message: "Invalid appointment details" });
  const input = parsed.data;

  try {
    const [patientResult, doctor] = await Promise.all([
      pool.query(
        `SELECT patient_id, patient_name, phone, email FROM patients WHERE patient_id = $1`,
        [input.patientId],
      ),
      doctorWithCalendly(input.doctorId),
    ]);
    const patient = patientResult.rows[0];
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    if (!patient.email)
      return res
        .status(422)
        .json({
          message: "Patient email is required to book through Calendly",
        });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    if (!doctor.calendly_event_type_uri)
      return res
        .status(422)
        .json({ message: "This doctor has no Calendly configuration" });

    const slots = await calendly.getAvailability(
      doctor.calendly_event_type_uri,
      input.startTime.slice(0, 10),
    );
    if (!slots.some((slot) => slot.start_time === input.startTime)) {
      return res
        .status(409)
        .json({ message: "This time slot is no longer available" });
    }

    const invitee = await calendly.createBooking({
      eventTypeUri: doctor.calendly_event_type_uri,
      startTime: input.startTime,
      name: patient.patient_name,
      email: patient.email,
      timezone: process.env.CALENDLY_TIMEZONE || "Asia/Kolkata",
      reason: input.reason,
    });

    try {
      const saved = await pool.query(
        `INSERT INTO appointments
          (patient_id, doctor_id, appointment_datetime, reason, status, created_by_user_id, calendly_event_uri, calendly_invitee_uri)
         VALUES ($1, $2, $3, $4, 'scheduled', $5, $6, $7)
         RETURNING *`,
        [
          input.patientId,
          input.doctorId,
          input.startTime,
          input.reason,
          req.user_id,
          invitee.event,
          invitee.uri,
        ],
      );
      return res
        .status(201)
        .json({
          message: "Appointment booked successfully",
          appointment: saved.rows[0],
        });
    } catch (error: any) {
      if (error?.code === "23505")
        return res
          .status(409)
          .json({ message: "This Calendly appointment is already recorded" });
      console.error(
        "Calendly booking succeeded but local appointment save failed",
        { inviteeUri: invitee.uri, eventUri: invitee.event },
      );
      return res
        .status(502)
        .json({
          message:
            "Appointment was booked with Calendly but could not be saved locally. Contact an administrator.",
        });
    }
  } catch (error) {
    return calendlyError(res, error, "Appointment could not be booked");
  }
}

export function calendlyWebhook(req: Request, res: Response) {
  const raw = req.body as Buffer;
  const signature = req.header("calendly-webhook-signature");
  const secret = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (!secret || !signature || !Buffer.isBuffer(raw))
    return res.status(401).json({ message: "Webhook verification failed" });

  const signatureParts = Object.fromEntries(
    signature.split(",").map((part) => part.split("=", 2)),
  );
  const timestamp = signatureParts.t;
  const providedSignature = signatureParts.v1;
  const timestampSeconds = Number(timestamp);
  if (
    !timestamp ||
    !providedSignature ||
    !Number.isFinite(timestampSeconds) ||
    Math.abs(Date.now() / 1000 - timestampSeconds) > 180
  ) {
    return res.status(401).json({ message: "Webhook verification failed" });
  }
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${raw.toString("utf8")}`)
    .digest("hex");
  if (
    expected.length !== providedSignature.length ||
    !crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(providedSignature),
    )
  ) {
    return res.status(401).json({ message: "Webhook verification failed" });
  }
  void applyWebhook(raw).catch((error) =>
    console.error("Calendly webhook processing failed", error),
  );
  return res.status(202).json({ received: true });
}

async function applyWebhook(raw: Buffer) {
  const payload = JSON.parse(raw.toString("utf8")) as any;
  const inviteeUri = payload?.payload?.uri;
  const eventUri = payload?.payload?.scheduled_event?.uri;
  if (!inviteeUri) return;
  if (payload.event === "invitee.canceled") {
    await pool.query(
      `UPDATE appointments SET status = 'cancelled' WHERE calendly_invitee_uri = $1`,
      [inviteeUri],
    );
  } else if (payload.event === "invitee.created") {
    // A reschedule sends cancellation plus a new creation. Only update existing records;
    // manual Calendly events without a hospital patient must never create a local patient.
    await pool.query(
      `UPDATE appointments SET status = 'scheduled', calendly_event_uri = COALESCE($2, calendly_event_uri)
       WHERE calendly_invitee_uri = $1`,
      [inviteeUri, eventUri],
    );
  }
}

function calendlyError(res: Response, error: unknown, fallback: string) {
  if (error instanceof CalendlyServiceError)
    return res.status(501).json({ message: error.message });
  console.error(fallback, error);
  return res.status(500).json({ message: fallback });
}
