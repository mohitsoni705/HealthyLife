import type { Request, Response } from "express";
import {addUser, createUser, existignUser, updateUserData} from "../models/user.model.ts";
import { addDoctorData, deleteDoctorDetails, existingDoctor, getDoctorData, getDoctorsData, updateDoctorDetails } from "../models/doctor.model.ts";
import bcrypt from "bcrypt";
import pool from "../config/db.ts";

export const addDoctor = async(req:Request,res:Response)=>{
    const license_no= req.body.license_no;
    const experience = req.body.experience;
    const consultation_fee = req.body.consultation_fee;
    const specialization = req.body.specialization;
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const email = req.body.email;
    
    console.log(req.body);
    
    const client = await pool.connect();

    try{
        await client.query("BEGIN");
        const existing = await existignUser(username) as any;
     
         if(existing){
             await client.query("ROLLBACK");
             res.status(409).json({
                 "msg":"User already exist"
             })
             return;
          }
     
           const hashedPassword = await bcrypt.hash(password, 5);    
        const user_id = await addUser(username,hashedPassword,role,email) as any;

        const doctorData = await addDoctorData({user_id , specialization , license_no , experience , consultation_fee}); 
           
        await pool.query("COMMIT");
        res.status(201).json({
            msg:"Doctor Successfully Created",
            doctor:doctorData
        }) 
     }catch(err){
        await client.query("ROLLBACK");

        res.status(500).json({
            msg:"Internal server error",
            err
        });
     }finally{
        client.release();
     }
     
}

export const getDoctors = async(req:Request,res:Response)=>{
     try{
        const doctor = await getDoctorsData();
        res.json({
            doctor
        })
     }catch(err){
        const cause = err instanceof Error ? err.message : String(err);
        res.status(401).json({
            msg: "Contains error",
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
        res.json({
            err
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
     //update user
     //update doctor
     try{
        const data = await updateUserData(username,status, role , email ,user_id);
        const doc = await updateDoctorDetails({specialization , license_no , experience , consultation_fee, user_id});
        res.json({
            msg:"User updated successfully",
            data,
            doc
        })
     }catch(err){
        // console.log(err);
        res.json({
            err
        })
     }
}

export const getOneDoctor = async(req:Request,res:Response)=>{
    //checkk doctor exist?
    //if yes then get all docotor detail
    //if no then send error docotor not found
    const doc_id = parseInt(req.params.id as string);
    const existing = await existingDoctor(doc_id);
    if(!existing){
        res.json({
            msg:"Doctor does'nt exist"
        })
        return;
    }
    const data = await getDoctorData(doc_id);
        res.json({
            msg:"Successfully got doctor data",
            data
        })
}