import type { Request, Response } from "express";
import type { PoolClient } from "pg";
import { addUser, createUser, existignUser, getUserByMail, updateUserData } from "../models/user.model.ts";
import { addDoctorData, deleteDoctorDetails, existingDoctor, getDoctorData, getDoctorsData, updateDoctorDetails } from "../models/doctor.model.ts";
import bcrypt from "bcrypt";
import pool from "../config/db.ts";

export const addDoctor = async (req: Request, res: Response): Promise<void> => {
    const {
        license_no,
        experience,
        consultation_fee,
        specialization,
        username,
        password,
        role = "doctor",
        email
    } = req.body;

    console.log("Add doctor request payload:", req.body);

    // 1. Input Validation
    if (
        !username ||
        !password ||
        !email ||
        !license_no ||
        !specialization ||
        experience === undefined ||
        experience === null ||
        experience === "" ||
        consultation_fee === undefined ||
        consultation_fee === null ||
        consultation_fee === ""
    ) {
        res.status(400).json({
            msg: "Missing required fields. Please provide username, password, email, license_no, specialization, experience, and consultation_fee."
        });
        return;
    }

    const parsedExperience = Number(experience);
    const parsedFee = Number(consultation_fee);

    if (isNaN(parsedExperience) || isNaN(parsedFee)) {
        res.status(400).json({
            msg: "Experience and consultation fee must be valid numbers"
        });
        return;
    }

    let client: PoolClient | null = null;

    try {
        client = await pool.connect();
        await client.query("BEGIN");

        // Check if username already exists
        const userExists = await existignUser(username, client);
        if (userExists) {
            await client.query("ROLLBACK");
            res.status(409).json({
                msg: "User already exists with this username"
            });
            return;
        }

        // Check if email already exists
        const emailExists = await getUserByMail(email, client);
        if (emailExists) {
            await client.query("ROLLBACK");
            res.status(409).json({
                msg: "User already exists with this email"
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const user_id = await addUser(username, hashedPassword, role, email, "active", client);

        if (!user_id) {
            throw new Error("Failed to create user record");
        }

        const doctorData = await addDoctorData(
            {
                user_id,
                specialization,
                license_no,
                experience: parsedExperience,
                consultation_fee: parsedFee
            },
            client
        );

        await client.query("COMMIT");
        res.status(201).json({
            msg: "Doctor Successfully Created",
            doctor: doctorData
        });
    } catch (err: any) {
        if (client) {
            try {
                await client.query("ROLLBACK");
            } catch (rollbackErr) {
                console.error("Error during transaction rollback:", rollbackErr);
            }
        }

        console.error("Error in addDoctor:", err);

        // PostgreSQL unique violation error code (23505)
        if (err?.code === "23505") {
            res.status(409).json({
                msg: "Doctor or user already exists with provided details",
                detail: err.detail,
                err: err.message || String(err)
            });
            return;
        }

        // PostgreSQL not-null violation error code (23502)
        if (err?.code === "23502") {
            res.status(400).json({
                msg: "Required database field is missing",
                detail: err.detail,
                err: err.message || String(err)
            });
            return;
        }

        // PostgreSQL invalid text representation error code (22P02)
        if (err?.code === "22P02") {
            res.status(400).json({
                msg: "Invalid data format provided",
                detail: err.detail,
                err: err.message || String(err)
            });
            return;
        }

        const cause = err instanceof Error ? err.message : String(err);
        res.status(500).json({
            msg: "Internal server error",
            message: cause,
            err: cause
        });
    } finally {
        if (client) {
            client.release();
        }
    }
};

export const getDoctors = async(req:Request,res:Response)=>{
     try{
        const doctor = await getDoctorsData();
        res.json({
            doctor
        })
     }catch(err){
        const cause = err instanceof Error ? err.message : String(err);
        res.status(500).json({
            msg: "Error fetching doctors",
            message: cause,
            err: cause
        })
     }
}

export const deleteDoctor=async(req:Request,res:Response)=>{
    const id = req.params.id;
    try{
        await deleteDoctorDetails(id)
        res.json({
            msg:"doctor data deleted"
        })
    }catch(err){
        const cause = err instanceof Error ? err.message : String(err);
        res.status(500).json({
            msg: "Error deleting doctor",
            err: cause
        })
    }
}

export const updateDoctor = async(req:Request,res:Response)=>{
    const user_id = parseInt(req.params.id as string);
    const license_no= req.body.license_no;
    const experience = req.body.experience;
    const consultation_fee = req.body.consultation_fee;
    const specialization = req.body.specialization;
    const username = req.body.username;
    const role = req.body.role;
    const email = req.body.email;
    const status = req.body.status;
    
    try{
        const data = await updateUserData(username, email, status, role, user_id);
        const doc = await updateDoctorDetails({specialization , license_no , experience , consultation_fee, user_id});
        res.json({
            msg:"User updated successfully",
            data,
            doc
        })
    }catch(err){
        const cause = err instanceof Error ? err.message : String(err);
        res.status(500).json({
            msg: "Error updating doctor",
            err: cause
        })
    }
}

export const getOneDoctor = async(req:Request,res:Response)=>{
    try {
        const doc_id = parseInt(req.params.id as string);
        const existing = await existingDoctor(doc_id);
        if(!existing){
            res.status(404).json({
                msg:"Doctor does'nt exist"
            })
            return;
        }
        const data = await getDoctorData(doc_id);
        res.json({
            msg:"Successfully got doctor data",
            data
        })
    } catch(err) {
        const cause = err instanceof Error ? err.message : String(err);
        res.status(500).json({
            msg: "Error fetching doctor",
            err: cause
        })
    }
}