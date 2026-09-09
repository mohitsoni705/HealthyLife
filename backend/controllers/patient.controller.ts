import type { Request, Response } from "express";
import { addPatient, getAllPatient, getOnePatientModel, getPatientByPhone, searchPatients, deletePatient as deletePatientModel, updatePatient as updatePatientModel } from "../models/patient.model.ts";

export const addPatients = async (req: Request, res: Response) => {
    try {
        const { patient_name, phone, address, gender, dob, email } = req.body;
        if (![patient_name, phone, address, gender, dob, email].every((value) => typeof value === "string" && value.trim())) {
            return res.status(400).json({ message: "Patient name, phone, email, address, gender, and date of birth are required" });
        }
        const duplicate = await getPatientByPhone(phone.trim());
        if (duplicate) return res.status(409).json({ message: "A patient with this phone number already exists", patient: duplicate });
        const patient = await addPatient({ patient_name: patient_name.trim(), address: address.trim(), phone: phone.trim(), gender, dob, email: email.trim() });
        res.status(201).json({ message: "patient added successfully", patient });
    } catch (err: any) {
        if (err?.code === "23505") return res.status(409).json({ message: "A patient with this phone number already exists" });
        res.status(500).json({
            "message": "Error adding patient",
            error: err
        });
    }
};

export const getPatient = async (req: Request, res: Response) => {
    try {
        const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
        const users = search ? await searchPatients(search) : await getAllPatient();
        res.status(200).json({ users, patients: users });
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
