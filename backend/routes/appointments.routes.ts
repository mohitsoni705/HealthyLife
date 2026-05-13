
import express from "express";
import { addAppointment, getAllAppointment, getDoctorSchedule, getOneAppointment, getPatientSchedule, updateStatus } from "../controllers/appointment.controller.ts";
import UserAuthMiddleware from "../middlewares/auth.middleware.ts";

const router = express.Router();

router.post("/appointments", UserAuthMiddleware, addAppointment);
router.get("/appointments", UserAuthMiddleware, getAllAppointment);
router.get("/appointment/:id", UserAuthMiddleware, getOneAppointment);
router.patch("/appointment/:id", UserAuthMiddleware, updateStatus);
router.get("/appointment/doctor/:id", UserAuthMiddleware, getDoctorSchedule);
router.get("/appointment/patient/:id", UserAuthMiddleware, getPatientSchedule);

export default router;
