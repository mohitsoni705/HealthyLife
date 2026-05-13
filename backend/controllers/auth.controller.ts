import { createUser, existignUser, getUserByMail } from "../models/user.model.ts";
import type {Request , Response} from "express";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
    const { email , password} = req.body;

    const user = await getUserByMail(email);
    if(!user){
        return res.status(404).json({
            "message":"User Does'nt exist"
        })
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) {
        return res.status(401).json({
            "message":"Invalid Credentials"
        })
    }

    const token = jwt.sign({user_id:user.user_id , username : user.username, role: user.role}, process.env.JWT_SECRET as string);

    res.json({ message: "Login successful", token });
};

export const signUp = async(req:Request,res:Response)=>{
    const {username, password , email, role}  = req.body;
    const userExist = await existignUser(username);
    if(userExist){
        return res.status(401).json({
            "message":"user already exist"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 5);

    await createUser(username,hashedPassword,role,email);
    res.json({
        "message":"user created successfully"
    })
}