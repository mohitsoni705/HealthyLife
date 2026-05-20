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
     await pool.query(`insert into users_data (username, password , role , email) values ($1,$2,$3,$4)`,[username,password,role,email]);
}

export const getUserByMail = async(email:string)=>{
    const result = await pool.query(`SELECT * FROM users_data WHERE email = $1 `,[email])as any;
    return result.rows[0]||null;
}

export const getAllUser = async()=>{
    const result  = await pool.query(`select * from users_data `)as any;
    return result.rows;
}

export const updateUserData = async(username:string,email:string,status:string,role:string,user_id:number)=>{
    const result = await pool.query(`update users_data set username=$1 , email = $2 , status=$3 , role = $4 where user_id = $5 RETURNING *`,[username,email,status,role]);;
    return result.rows[0];
}

export const deleteUserData =async(user_id:number)=>{
    const result = await pool.query(`delete users_data where user_id =$1 RETURNING`,[user_id]);
    return result.rows[0];
}
