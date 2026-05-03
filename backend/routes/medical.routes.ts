import express from "express";

const router = express.Router();

router.post("/records",addRecords);
router.get("/records/patient/:id",getPatientRecord);
router.get("/records/:id",getOneRecord);
router.put("/records/:id",updateOneRecord);
router.delete("/records/:id",deleteOneRecord);4