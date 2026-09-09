import { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarDays,
  Check,
  Clock3,
  Loader2,
  Search,
  Stethoscope,
  UserPlus,
  UserRound,
  X,
} from "lucide-react";
import AppointmentHeader from "./AppointmentHeader";
import { BACKEND_URL } from "../config";

type Patient = {
  patient_id: number;
  patient_name: string;
  phone: string;
  email?: string;
  gender: string;
  dob: string;
  address: string;
};
type Doctor = { user_id: number; username: string; specialization?: string };
type Slot = { startTime: string };
const headers = () => ({ authorization: localStorage.getItem("token") || "" });
const dateLabel = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
const timeLabel = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(value));

export default function ReceptionAppointmentBooking() {
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [startTime, setStartTime] = useState("");
  const [reason, setReason] = useState("");
  const [newPatient, setNewPatient] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<any>(null);

  useEffect(() => {
    void loadDoctors();
    void loadPatients("");
  }, []);
  useEffect(() => {
    const timer = window.setTimeout(() => void loadPatients(query), 250);
    return () => window.clearTimeout(timer);
  }, [query]);
  useEffect(() => {
    if (!doctor || !date) {
      setSlots([]);
      setStartTime("");
      return;
    }
    void loadSlots(doctor.user_id, date);
  }, [doctor, date]);
  async function loadPatients(search: string) {
    setLoadingPatients(true);
    try {
      const { data } = await axios.get(`${BACKEND_URL}/patients`, {
        params: search ? { search } : undefined,
        headers: headers(),
      });
      setPatients(data.patients || data.users || []);
    } catch {
      setError("Unable to search patients.");
    } finally {
      setLoadingPatients(false);
    }
  }
  async function loadDoctors() {
    try {
      const [docs, users] = await Promise.all([
        axios.get(`${BACKEND_URL}/doctors`, { headers: headers() }),
        axios.get(`${BACKEND_URL}/users`, { headers: headers() }),
      ]);
      const names = new Map(
        (users.data.user || users.data.users || users.data.data || []).map(
          (user: any) => [Number(user.user_id), user.username],
        ),
      );
      setDoctors(
        (docs.data.doctor || []).map((item: any) => ({
          ...item,
          user_id: Number(item.user_id),
          username:
            names.get(Number(item.user_id)) || `Doctor #${item.user_id}`,
        })),
      );
    } catch {
      setError("Unable to load doctors.");
    }
  }
  async function loadSlots(id: number, selectedDate: string) {
    setLoadingSlots(true);
    setError("");
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/doctors/${id}/availability`,
        { params: { date: selectedDate }, headers: headers() },
      );
      setSlots(data.slots || []);
    } catch (err: any) {
      setSlots([]);
      setError(
        err.response?.data?.message || "Unable to load doctor's availability.",
      );
    } finally {
      setLoadingSlots(false);
    }
  }
  async function book() {
    if (!patient || !doctor || !startTime) return;
    setBooking(true);
    setError("");
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/appointments/calendly`,
        {
          patientId: patient.patient_id,
          doctorId: doctor.user_id,
          startTime,
          reason,
          appointmentType: "consultation",
        },
        { headers: headers() },
      );
      setSuccess(data.appointment);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Appointment could not be booked.",
      );
    } finally {
      setBooking(false);
    }
  }
  function reset() {
    setPatient(null);
    setDoctor(null);
    setDate("");
    setSlots([]);
    setStartTime("");
    setReason("");
    setSuccess(null);
    setError("");
  }
  if (success)
    return (
      <Success
        appointment={success}
        patient={patient}
        doctor={doctor}
        onReset={reset}
      />
    );
  const today = new Date().toISOString().slice(0, 10);
  return (
    <section className="mx-auto max-w-[1400px] space-y-5">
      <AppointmentHeader />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(270px,.75fr)]">
        <main className="space-y-5 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Book Appointment
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a patient, doctor, and an available Calendly time slot.
            </p>
          </div>
          <section className="border-t pt-5">
            <div className="flex justify-between">
              <h3 className="font-bold">Patient</h3>
              <button
                onClick={() => setNewPatient(true)}
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600"
              >
                <UserPlus size={16} /> New Patient
              </button>
            </div>
            <label className="mt-3 flex h-11 items-center gap-3 rounded-lg border px-3 text-slate-500">
              <Search size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-w-0 flex-1 outline-none"
                placeholder="Search by name, patient ID, or phone"
              />
            </label>
            <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border">
              {loadingPatients && (
                <p className="p-3 text-sm text-slate-500">
                  Searching patients…
                </p>
              )}
              {!loadingPatients &&
                patients.map((item) => (
                  <button
                    key={item.patient_id}
                    onClick={() => setPatient(item)}
                    className={`flex w-full items-center justify-between border-b p-3 text-left last:border-0 hover:bg-blue-50 ${patient?.patient_id === item.patient_id ? "bg-blue-50" : ""}`}
                  >
                    <span>
                      <b className="block text-sm">{item.patient_name}</b>
                      <span className="text-xs text-slate-500">
                        P{item.patient_id} · {item.phone}
                      </span>
                    </span>
                    {patient?.patient_id === item.patient_id && (
                      <Check className="text-blue-600" size={18} />
                    )}
                  </button>
                ))}
              {!loadingPatients && !patients.length && (
                <p className="p-3 text-sm text-slate-500">
                  No patients found. Create one without leaving this page.
                </p>
              )}
            </div>
          </section>
          <section className="border-t pt-5">
            <h3 className="font-bold">Doctor</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {doctors.map((item) => (
                <button
                  key={item.user_id}
                  onClick={() => setDoctor(item)}
                  className={`rounded-lg border p-3 text-left text-sm ${doctor?.user_id === item.user_id ? "border-blue-500 bg-blue-50 text-blue-700" : "hover:border-blue-300"}`}
                >
                  <Stethoscope className="mb-1" size={18} />
                  <b className="block">Dr. {item.username}</b>
                  <span className="text-xs">
                    {item.specialization || "General"}
                  </span>
                </button>
              ))}
            </div>
          </section>
          <section className="border-t pt-5">
            <h3 className="font-bold">Date & available slots</h3>
            <input
              min={today}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-3 rounded-lg border p-3 outline-blue-500"
            />
            {loadingSlots && (
              <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                <Loader2 size={16} className="animate-spin" /> Loading
                availability…
              </p>
            )}
            {!loadingSlots && date && doctor && (
              <div className="mt-3 flex flex-wrap gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot.startTime}
                    onClick={() => setStartTime(slot.startTime)}
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold ${startTime === slot.startTime ? "border-blue-600 bg-blue-600 text-white" : "border-blue-200 text-blue-700"}`}
                  >
                    {timeLabel(slot.startTime)}
                  </button>
                ))}
                {!slots.length && !error && (
                  <p className="text-sm text-slate-500">
                    No available slots for this date.
                  </p>
                )}
              </div>
            )}
          </section>
          <section className="border-t pt-5">
            <label className="block font-bold">
              Reason for visit
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                maxLength={1000}
                className="mt-2 min-h-24 w-full rounded-lg border p-3 text-sm font-normal outline-blue-500"
                placeholder="Optional reason for visit"
              />
            </label>
          </section>
        </main>
        <aside className="flex min-h-96 flex-col rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-bold">Appointment Summary</h2>
          <div className="mt-4 space-y-4">
            <Summary
              icon={UserRound}
              label="Patient"
              value={patient?.patient_name || "Not selected"}
            />
            <Summary
              icon={Stethoscope}
              label="Doctor"
              value={doctor ? `Dr. ${doctor.username}` : "Not selected"}
            />
            <Summary
              icon={CalendarDays}
              label="Date"
              value={date ? dateLabel(date) : "Not selected"}
            />
            <Summary
              icon={Clock3}
              label="Time"
              value={startTime ? timeLabel(startTime) : "Not selected"}
            />
          </div>
          {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <button
            disabled={!patient || !doctor || !startTime || booking}
            onClick={() => void book()}
            className="mt-auto flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white disabled:bg-slate-200"
          >
            {booking && <Loader2 size={17} className="animate-spin" />}
            {booking ? "Booking…" : "Book Appointment"}
          </button>
        </aside>
      </div>
      {newPatient && (
        <PatientModal
          onClose={() => setNewPatient(false)}
          onCreated={(created) => {
            setPatient(created);
            setPatients((current) => [
              created,
              ...current.filter(
                (item) => item.patient_id !== created.patient_id,
              ),
            ]);
            setNewPatient(false);
          }}
        />
      )}
    </section>
  );
}
function Summary({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-100">
        <Icon size={19} />
      </span>
      <span>
        <span className="block text-xs font-semibold text-slate-500">
          {label}
        </span>
        <b className="block text-sm">{value}</b>
      </span>
    </div>
  );
}
function PatientModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (patient: Patient) => void;
}) {
  const [form, setForm] = useState({
    patient_name: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    address: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fields = [
    ["patient_name", "Name", "text"],
    ["phone", "Phone", "tel"],
    ["email", "Email", "email"],
    ["dob", "Date of birth", "date"],
    ["gender", "Gender", "text"],
    ["address", "Address", "text"],
  ] as const;
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const { data } = await axios.post(`${BACKEND_URL}/patients`, form, {
        headers: headers(),
      });
      onCreated(data.patient);
    } catch (err: any) {
      setError(err.response?.data?.message || "Patient could not be created.");
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <form
        onSubmit={(e) => void submit(e)}
        className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold">Create New Patient</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {fields.map(([key, label, type]) => (
            <label
              key={key}
              className={key === "address" ? "sm:col-span-2" : ""}
            >
              <span className="mb-1 block text-sm font-medium">{label}</span>
              <input
                required
                type={type}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full rounded-lg border p-2.5 outline-blue-500"
              />
            </label>
          ))}
        </div>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <button
          disabled={saving}
          className="mt-5 w-full rounded-lg bg-blue-600 p-3 font-semibold text-white disabled:bg-slate-300"
        >
          {saving ? "Creating…" : "Create & Select Patient"}
        </button>
      </form>
    </div>
  );
}
function Success({
  appointment,
  patient,
  doctor,
  onReset,
}: {
  appointment: any;
  patient: Patient | null;
  doctor: Doctor | null;
  onReset: () => void;
}) {
  return (
    <section className="mx-auto max-w-2xl">
      <AppointmentHeader />
      <div className="mt-5 rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <Check size={30} />
        </span>
        <h1 className="mt-4 text-2xl font-bold">
          Appointment Booked Successfully
        </h1>
        <div className="mx-auto mt-5 max-w-sm space-y-2 rounded-lg bg-slate-50 p-4 text-left text-sm">
          <p>
            <b>Appointment ID:</b> A-{appointment.id}
          </p>
          <p>
            <b>Patient:</b> {patient?.patient_name}
          </p>
          <p>
            <b>Doctor:</b> Dr. {doctor?.username}
          </p>
          <p>
            <b>Date:</b> {dateLabel(appointment.appointment_datetime)}
          </p>
          <p>
            <b>Time:</b> {timeLabel(appointment.appointment_datetime)}
          </p>
          <p>
            <b>Status:</b> Scheduled
          </p>
        </div>
        <button
          onClick={onReset}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          Book Another Appointment
        </button>
      </div>
    </section>
  );
} 
