import type { Request, Response } from "express";
import { addUser , existignUser} from "../models/user.model.ts";
import { addDoctorData, deleteDoctorDetails, getDoctorsData } from "../models/doctor.model.ts";

export const addDoctor = async(req:Request,res:Response)=>{
    const license_no= req.body.license_no;
    const experience = req.body.experience;
    const consultation_fee = req.body.consultation_fee;
     const specialization = req.body.specialization;
     const username = req.body.username;
     const password = req.body.password;
     const role = req.body.role;
     const email = req.body.email;
     
     //check existing doctor
     const existing = await existignUser(username) as any;
     if(existing){
        res.status(409).json({
            "msg":"User already exist"
        })
        return;
     }
     //add data in user 
     try{
        const user_id = await addUser(username,password,role,email) as any;
        console.log(user_id)
        if(user_id){
            const doctorData = await addDoctorData({user_id , specialization , license_no , experience , consultation_fee}); 
            res.json({
                "msg":"user created successfully",
                doctorData
            })
        }else{
            res.status(500).json({
                msg:"Internal Server Error"
                
            })
        }
     }catch(err){
        res.json({
            msg:"Internal server error",
            err
        })
     }
     //then get id 
     //then use id to create table in doctor 
     //implement in db when doctor it also delete users
     //if user delete doctro then doctor db also delete user
}

export const getDoctors = async(req:Request,res:Response)=>{
     try{
        const doctor = await getDoctorsData();
        res.json({
            doctor
        })
     }catch(err){
        res.status(401).json({
            msg:"Contains error",
            err
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