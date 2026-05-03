import type { Request,Response } from "express"
import { addPatient, getAllPatient } from "../models/patient.model.ts";


export const addPatients =async(req:Request , res:Response)=>{
     const {patient_name , phone , address , gender  , dob} = req.body;
     await addPatient({patient_name , address , phone , gender , dob});
     res.json({
        "message":"patient added successfully",
     })
}

export const getPatient=async(req:Request, res:Response)=>{
    try{
        const users = await getAllPatient();
        res.status(200).json({users});
    }catch(err){
        res.json({
            "message":"can not get patient",
            error:err
        }) 
    }
}