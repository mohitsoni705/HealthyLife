import { createUser, existignUser, finduser, getUserByUsername } from "../models/user.model.ts";
import type {Request , Response} from "express";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";

const SALT_ROUND = 5;

const JWT_SECRET = "dcvbnjkiuytfcvbnmkoiuyhnmloiuyhnamkidwjmckpwokjmloijhnmloiuytrfbnko";
export const loginUser = async (req: Request, res: Response) => {
    const { username , password} = req.body;

    const user = await getUserByUsername(username);
    if(!user){
        res.json({
            "message":"User Does'nt exist"
        })
    }

    const isMatch = await bcrypt.compare(password,user.password);
    const token = jwt.sign({user_id:user.user_id , username : user.username},JWT_SECRET);


    if (!isMatch) {
        return res.status(401).json({
            "message":"Invalid Credentials"
        })
    }

    res.json({ message: "Login successful", token });
};

export const signUp = async(req:Request,res:Response)=>{
    const {username, password , role}  = req.body;
    const userExist = await existignUser(username);
    if(userExist){
        res.status(401).json({
            "message":"user already exist"
        })
    }
        const hashedPassword = await bcrypt.hash(password,SALT_ROUND);

        await createUser(username,hashedPassword,role);
        res.json({
            "message":"user created successfully"
        })
}