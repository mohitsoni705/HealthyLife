import pool from "../config/db.ts";

enum status{
    "scheduled",
    "completed",
    "cancelled"
}
interface apppointmentProps{
    id?:number,
    patient_id:number,
    doctor_id:number,
    appointment_datetime:string,
    reason:string,
    status:status,
}

export const insertAppointment=async({id, patient_id , doctor_id , appointment_datetime , reason , status}:apppointmentProps)=>{
    const result = await pool.query(`insert into appointments(patient_id , doctor_id , appointment_datetime , reason , status) values ($1,$2, $3, $4 ,$5) RETURNING *`,[patient_id , doctor_id , appointment_datetime , reason , status]);
    return result;
}

export const getAppoointments = async()=>{
    const result = await pool.query(`select * from appointments`);
    return result;
}
export const getOneAppointmentsData = async({id}:any)=>{
    const result = await pool.query(`select * from appointments where value = $1 `,[id])as any;
    return result.rows;
}
export const updateAppointmentStatus=async(status:string , id:number)=>{
    const result = await pool.query(`UPDATE table appointments SET status = $1 where id = $2 `,[status,id])
    return result.rows[0];
}