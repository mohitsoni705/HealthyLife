import pool from "../config/db.ts"

interface DoctorProps{
    user_id:Number,
    specialization:string,
    license_no:string,
    experience:Number,
    consultation_fee : Number,
}
export const addDoctorData = async({user_id , specialization , license_no , experience , consultation_fee}:DoctorProps)=>{
    const result = await pool.query(`Insert into doctor (user_id , specialization , license_no , experience , consultation_fee) values($1,$2,$3,$4,$5) RETURNING *`,[user_id , specialization , license_no , experience , consultation_fee]);
    return result.rows[0] || null;
}

export const getDoctorsData = async()=>{
    const result = await pool.query(`select * from doctor`);
    return result.rows || null;
}

export const deleteDoctorDetails = async(user_id:any)=>{
     await pool.query(`delete from doctor where user_id=$1`,[user_id]);
}