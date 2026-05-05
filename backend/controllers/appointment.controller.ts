import type { Request, Response } from "express";
import { getAppoointments, getDoctorScheduleData, getOneAppointmentsData, getPatientScheduleData, insertAppointment, updateAppointmentStatus } from "../models/appointments.model.ts";

export const addAppointment = async (req: Request, res: Response) => {
    const { patient_id, doctor_id, appointment_datetime, reason, status} = req.body;
    try {
        const appointment = await insertAppointment({ patient_id, doctor_id, appointment_datetime, status, reason });
        res.status(200).json({
            "message": "Successfully added appointment",
            appointment
        });
    } catch (err) {
        res.status(500).json({
            "message": "Error adding appointment",
            error: err
        });
    }
};

export const getAllAppointment = async (req: Request, res: Response) => {
    try {
        const data = await getAppoointments();
        res.status(200).json({
            data
        });
    } catch (err) {
        res.status(500).json({
            "message": "Something went wrong",
            error: err
        });
    }
};

export const getOneAppointment = async (req: Request, res: Response) => {
    const appointment_id = req.params.id;
    try {
        const result = await getOneAppointmentsData(appointment_id);
        res.status(200).json({ result });
    } catch (err) {
        res.status(500).json({
            "message": "Error fetching appointment",
            error: err
        });
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const { status } = req.body;
    
    try {
        const result = await updateAppointmentStatus(status,id);
        res.status(200).json({ message: "Status updated", result });
    } catch (err) {
        res.status(500).json({
            "message": "Error updating status",
            error: err
        });
    }
};

export const getDoctorSchedule = async (req: Request, res: Response) => {
    const doctor_id = req.params.id;
    try {
        const result = await getDoctorScheduleData(doctor_id);
        res.status(200).json({ schedule: result });
    } catch (err) {
        res.status(500).json({
            "message": "Error fetching doctor schedule",
            error: err
        });
    }
};

export const getPatientSchedule = async (req: Request, res: Response) => {
    const patient_id = req.params.id;
    try {
        const result = await getPatientScheduleData(patient_id);
        res.status(200).json({ schedule: result });
    } catch (err) {
        res.status(500).json({
            "message": "Error fetching patient schedule",
            error: err
        });
    }
};