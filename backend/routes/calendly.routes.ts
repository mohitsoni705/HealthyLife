import express from "express";
import { bookCalendlyAppointment, getDoctorAvailability } from "../controllers/calendly.controller.ts";
import UserAuthMiddleware from "../middlewares/auth.middleware.ts";
import receptionMiddleware from "../middlewares/reception.middleware.ts";

const router = express.Router();

router.get("/doctors/:doctorId/availability", UserAuthMiddleware, receptionMiddleware, getDoctorAvailability);
router.post("/appointments/calendly", UserAuthMiddleware, receptionMiddleware, bookCalendlyAppointment);

export default router;
