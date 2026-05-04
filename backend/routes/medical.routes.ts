import express from "express";
import { addRecords, getPatientRecord, getOneRecord, updateOneRecord, deleteOneRecord } from "../controllers/medical.controller.ts";
import UserAuthMiddleware from "../middlewares/auth.middleware.ts";

const router = express.Router();

router.post("/records", UserAuthMiddleware, addRecords);
router.get("/records/patient/:id", UserAuthMiddleware, getPatientRecord);
router.get("/records/:id", UserAuthMiddleware, getOneRecord);
router.put("/records/:id", UserAuthMiddleware, updateOneRecord);
router.delete("/records/:id", UserAuthMiddleware, deleteOneRecord);

export default router;