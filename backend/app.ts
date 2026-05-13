
import express from "express";
import authRoutes from "./routes/auth.routes.ts"
import patientsRoutes from "./routes/patient.routes.ts"
import appointmentRoutes from "./routes/appointments.routes.ts"
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/patients",patientsRoutes)
app.use("/api/v1",appointmentRoutes);

export default app;