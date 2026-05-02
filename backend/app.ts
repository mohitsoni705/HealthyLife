import express from "express";
import authRoutes from "./routes/auth.routes.ts"
import dotenv from "dotenv";

const app = express();

dotenv.config(); 

app.use(express.json());

app.use("/api/v1/auth",authRoutes)

export default app;