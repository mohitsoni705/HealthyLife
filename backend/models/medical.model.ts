import app from "../app.ts";
import pool from "../config/db.ts";

interface medicalRecordsProps{
    id ?:number,
    appointment_id:number,
    chief_complaint:string,
    daignosis:string,
    treatment:string,
    notes:string,
}
export const addMedicalRecord = async({appointment_id , chief_complaint , daignosis , treatment , notes}:medicalRecordsProps)=>{
    const result =await pool.query(`insert into medical_records (appointment_id , chief_complaint , daignosis , treatment , notes) values ($1,$2,$3,$4,$5) RETURNING *`,[appointment_id , chief_complaint , daignosis , treatment , notes])
    return result;
}