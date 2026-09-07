import type { NextFunction, Request,Response } from "express"
import  jwt, { decode }  from "jsonwebtoken";

const UserAuthMiddleware =async(req:Request,res:Response,next:NextFunction)=>{
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const header = req.headers["authorization"];

    if(!header){
        res.status(401).json({
            message: "Missing authorization token",
        })
        return
    }
    const token = header;
    try{
        const decoded = jwt.verify(token as string , JWT_SECRET)
        //@ts-ignore
        req.user_id = decoded.user_id;
        next();
    }catch (err) {
        const cause = err instanceof Error ? err.message : String(err);
        return res.status(401).json({
            message: "You are not logged in",
            err: cause
        });
    }
}
export default UserAuthMiddleware;