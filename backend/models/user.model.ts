import type { RowDataPacket } from "mysql2";
import pool from "../config/db.ts";

export const finduser=async(username:string,password:string)=>{
    const result = await pool.query(`select * from users_data where username=$1 and password = $2 `,[username , password])as any;
    return result.rows[0]||null;
}
export const existignUser = async(username:string)=>{
    const result = await pool.query(`select * from users_data where username = $1 `,[username])as any;
    return result.rows.length>0;
}
export const createUser =async(username:string , password:string , role:string ,email:string)=>{
     await pool.query(`insert into users_data(username, password , role , email) values ($1,$2,$3,$4)`,[username,password,role,email]);
}


export const getUserByMail = async(email:string)=>{
    const result=await pool.query(`select * from users_data where email =$1 LIMIT 1 `,[email])as any;
    return result.rows[0]||null;
}