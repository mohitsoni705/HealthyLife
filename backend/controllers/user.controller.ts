import type{Request,Response} from "express";
import { getAllUser ,deleteUserData, existignUser, updateUserData } from "../models/user.model.ts";
import { ro } from "zod/locales";
import { success } from "zod";
import { Result } from "pg";
export const getUsers= async(req:Request , res:Response)=>{
    const user =await getAllUser();
    if(!getAllUser()){
        res.json({
            err:"Content Unavailable"
        })
        return;
    }
    res.json({
        user
    })
}

export const updateUser =async(req:Request , res:Response)=>{
    const userId = req.params.id as any;
    const username=req.body.username;
    const email= req.body.email;
    const status=  req.body.status;
    const role= req.body.role;
        try{
            await updateUserData(username,email,status,role,userId);
            res.json({
                success:true
            })
        }catch(err:any){
            if(err.code == '23505'){
                res.status(409).json({
                    success:false,
                    message:"username already exists"
                })
            }else{
                const cause = err instanceof Error ? err.message : String(err);
                res.status(401).json({
                    msg: "Invalid",
                    message: cause,
                    err: cause
                })       
            }
    }
}

export const deleteUser = async(req:Request , res:Response)=>{
    const user_id = req.params.id as  any;
    
    const result = await deleteUserData(user_id);
    res.json({
        result,
        msg:"User has been deleted"
    })
}