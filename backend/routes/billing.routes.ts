import express from "express";

const router = express.Router();

//create bill route
//list bills 
//get bills
// add payment
// patient bills
// payment details


router.post("/bills",generateBill);
router.post("/bills/:id/payments",addPayment);
router.get("/bills",getAllBill)
router.get("/bills/:id",getOneBill)
router.get("patient/:id",getPatientBills);
router.get("payments/:id",getPaymentDetails)