import express from "express";

import UserAuthMiddleware from "../middlewares/auth.middleware.ts";
import { addPayment, generateBill, getAllBill, getOneBill, getPatientBills, getPaymentDetails } from "../controllers/billing.controller.ts";

const router = express.Router();

//create bill route
//list bills
//get bills
// add payment
// patient bills
// payment details

router.post("/bills", UserAuthMiddleware, generateBill);
router.post("/bills/:id/payments", UserAuthMiddleware, addPayment);
router.get("/bills", UserAuthMiddleware, getAllBill);
router.get("/bills/:id", UserAuthMiddleware, getOneBill);
router.get("/patient/:id", UserAuthMiddleware, getPatientBills);
router.get("/payments/:id", UserAuthMiddleware, getPaymentDetails);

export default router;