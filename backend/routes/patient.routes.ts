import express, { Router } from "express";
import { addPatients, getPatient } from "../controllers/patient.controller.ts";
import UserAuthMiddleware from "../middlewares/auth.middleware.ts";
import { deletePatient, getOnePatient, updatePatient } from "../models/patient.model.ts";

const router = express.Router();
router.post("/getpatient",UserAuthMiddleware,addPatients);
router.get("/addpatients",UserAuthMiddleware,getPatient);
router.get("/patient/:id",UserAuthMiddleware,getOnePatient);
router.delete("/patient/:id",UserAuthMiddleware,deletePatient);
router.put("/patient/:id",UserAuthMiddleware,updatePatient)
export default router;
