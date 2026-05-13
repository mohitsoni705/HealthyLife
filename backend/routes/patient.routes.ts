import express, { Router } from "express";
import { addPatients, getPatient, getOnePatient, deletePatient, updatePatient } from "../controllers/patient.controller.ts";
import UserAuthMiddleware from "../middlewares/auth.middleware.ts";

const router = express.Router();
router.post("/patients", UserAuthMiddleware, addPatients);
router.get("/patients", getPatient);
router.get("/patient/:id", getOnePatient);
router.delete("/patient/:id", deletePatient);
router.put("/patient/:id", updatePatient);

export default router;
