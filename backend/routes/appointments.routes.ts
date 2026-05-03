import express from "express";

const router = express.Router();

router.post("/appointments",addAppointment);
router.get("/appointments",getAllAppointment);
router.get("/appointmnet/:id",getOneAppointment);
router.patch("/appointment/:id",updateStatus);
router.get("appointment/doctor/:id",getDoctorSchedule);
router.get("appointment/patient/:id",getPatientSchedule);
