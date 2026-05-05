import express from "express";
import authRoutes from "./routes/auth.routes.ts"
import patientsRoutes from "./routes/patient.routes.ts"
import appointmentRoutes from "./routes/appointments.routes.ts"
import dotenv from "dotenv";

const app = express();

dotenv.config(); 

app.use(express.json());

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/patients",patientsRoutes)
app.use("/api/v1",appointmentRoutes);

export default app;