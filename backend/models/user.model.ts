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
export const createUser =async(username:string , password:string , role:string ,email:string ,status="active")=>{
     await pool.query(`insert into users_data (username, password , role , email , status) values ($1,$2,$3,$4,$5)`,[username,password,role,email,status]);
}
export const addUser =async(username:string , password:string , role:string ,email:string ,status="active")=>{
     const result = await pool.query(`insert into users_data (username, password , role , email , status) values ($1,$2,$3,$4,$5) RETURNING user_id`,[username,password,role,email,status]);
     return result.rows[0].user_id || null
}

export const getUserByMail = async(email:string)=>{
    const result = await pool.query(`SELECT * FROM users_data WHERE email = $1 `,[email])as any;
    return result.rows[0]||null;
}

export const getAllUser = async()=>{
    const result  = await pool.query(`select * from users_data `)as any;
    return result.rows;
}

export const updateUserData = async(username:string,email:string,status:string,role:string,user_id:any)=>{
    const result = await pool.query(`update users_data set username=$1 , email = $2 , status=$3 , role = $4 where user_id = $5 RETURNING *`,[username,email,status,role,user_id]);;
    return result.rows[0];
}


export const deleteUserData =async(user_id:number)=>{
    const result = await pool.query(`delete from users_data where user_id =$1 `,[user_id]);
    return result.rows[0];
}
