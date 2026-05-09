import type { Request, Response } from "express";
import { addMedicalRecord } from "../models/medical.model";
import { record } from "zod";

export const addRecords = async (req: Request, res: Response) => {
    const {appointment_id , chief_complaint , daignosis , treatment , notes} = req.body;
    try {
        const result = await addMedicalRecord({appointment_id , chief_complaint , daignosis , treatment , notes});
        res.status(200).json({ message: "Record added", result });
    } catch (err) {
        res.status(500).json({ message: "Error adding record", error: err });
    }
};

export const getPatientRecord = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        // Implementation here
        res.status(200).json({ records: [] });
    } catch (err) {
        res.status(500).json({ message: "Error fetching patient records", error: err });
    }
};

export const getOneRecord = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        // const result = await getOneMedicalRecord(id);
        // Implementation here
        // res.status(200).json({ record: result });
    } catch (err) {
        res.status(500).json({ message: "Error fetching record", error: err });
    }
};

export const updateOneRecord = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        // Implementation here
        res.status(200).json({ message: "Record updated" });
    } catch (err) {
        res.status(500).json({ message: "Error updating record", error: err });
    }
};

export const deleteOneRecord = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        // Implementation here
        res.status(200).json({ message: "Record deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting record", error: err });
    }
};