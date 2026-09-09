
import express from "express";
import authRoutes from "./routes/auth.routes.ts"
import patientsRoutes from "./routes/patient.routes.ts"
import appointmentRoutes from "./routes/appointments.routes.ts"
import userRoutes from "./routes/user.routes.ts";
import doctorRoutes from "./routes/doctor.routes.ts";
import calendlyRoutes from "./routes/calendly.routes.ts";
import { calendlyWebhook } from "./controllers/calendly.controller.ts";
import cors from "cors";
const app = express();

app.use(cors());
// Calendly's signature is calculated from the exact request bytes. This must
// run before express.json(), which otherwise consumes and reserializes them.
app.post("/api/v1/webhooks/calendly", express.raw({ type: "application/json" }), calendlyWebhook);
app.use(express.json());

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1", patientsRoutes)
app.use("/api/v1", patientsRoutes)
app.use("/api/v1", appointmentRoutes);
app.use("/api/v1", userRoutes)
app.use("/api/v1", doctorRoutes)
app.use("/api/v1", calendlyRoutes)
export default app;
