import express from "express";
import { addDoctor, deleteDoctor, getDoctors } from "../controllers/doctor.controller.ts";


const router = express.Router();

router.post("/doctor",addDoctor);
router.get("/doctor",getDoctors);
router.delete("/doctor/:id",deleteDoctor);
// router.put("/doctor/:id",updateDoctor);

export default router;
