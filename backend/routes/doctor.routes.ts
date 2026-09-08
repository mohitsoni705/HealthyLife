import express from "express";
import { addDoctor, deleteDoctor, getDoctors, getOneDoctor, updateDoctor } from "../controllers/doctor.controller.ts";
import UserAuthMiddleware from "../middlewares/auth.middleware.ts";


const router = express.Router();

router.post("/doctor",UserAuthMiddleware,addDoctor);
router.get("/doctor",UserAuthMiddleware,getDoctors);
router.get("/doctors",UserAuthMiddleware,getDoctors);
router.delete("/doctor/:id",UserAuthMiddleware,deleteDoctor);
router.put("/doctor/:id",UserAuthMiddleware,updateDoctor);
router.get("/doctor/:id",UserAuthMiddleware,getOneDoctor)
export default router;
