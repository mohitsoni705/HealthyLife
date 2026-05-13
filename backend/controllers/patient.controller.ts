import type { Request, Response } from "express";
import { addPatient, getAllPatient, getOnePatientModel , deletePatient as deletePatientModel, updatePatient as updatePatientModel } from "../models/patient.model.ts";

export const addPatients = async (req: Request, res: Response) => {
    try {
        const { patient_name, phone, address, gender, dob } = req.body;
        await addPatient({ patient_name, address, phone, gender, dob });
        res.status(200).json({
            "message": "patient added successfully",
        });
    } catch (err) {
        res.status(500).json({
            "message": "Error adding patient",
            error: err
        });
    }
};

export const getPatient = async (req: Request, res: Response) => {
    try {
        const users = await getAllPatient();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({
            "message": "Cannot get patients",
            error: err
        });
    }
};

export const getOnePatient = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const idNumber = id as number;
        const patient = await getOnePatientModel(idNumber);
        res.status(200).json({ patient });
    } catch (err) {
        res.status(500).json({
            "message": "Cannot get patient",
            error: err
        });
    }
};

export const deletePatient = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        await deletePatientModel(id);
        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (err) {
        res.status(500).json({
            "message": "Error deleting patient",
            error: err
        });
    }
};

export const updatePatient = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const updates = req.body;
        await updatePatientModel(id, updates);
        res.status(200).json({ message: "Patient updated successfully" });
    } catch (err) {
        res.status(500).json({
            "message": "Error updating patient",
            error: err
        });
    }
};