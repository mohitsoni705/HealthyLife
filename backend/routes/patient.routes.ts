import express, { Router } from "express";
import { addPatients, getPatient, getOnePatient, deletePatient, updatePatient } from "../controllers/patient.controller.ts";
import UserAuthMiddleware from "../middlewares/auth.middleware.ts";

const router = express.Router();
router.post("/patients", UserAuthMiddleware, addPatients);
router.get("/patients", UserAuthMiddleware, getPatient);
router.get("/patient/:id", UserAuthMiddleware, getOnePatient);
router.delete("/patient/:id", UserAuthMiddleware, deletePatient);
router.put("/patient/:id", UserAuthMiddleware, updatePatient);

export default router;
