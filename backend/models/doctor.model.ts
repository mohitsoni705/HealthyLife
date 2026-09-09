import pool from "../config/db.ts"

interface DoctorProps{
    user_id:Number,
    specialization:string,
    license_no:string,
    experience:Number,
    consultation_fee : Number,
    calendly_user_uri?: string,
    calendly_event_type_uri?: string,
}
export const addDoctorData = async({user_id , specialization , license_no , experience , consultation_fee, calendly_user_uri, calendly_event_type_uri}:DoctorProps, client?: any)=>{
    const db = client || pool;
    const result = await db.query(`Insert into doctor (user_id , specialization , license_no , experience , consultation_fee, calendly_user_uri, calendly_event_type_uri) values($1,$2,$3,$4,$5, $6, $7) RETURNING *`,[user_id , specialization , license_no , experience , consultation_fee, calendly_user_uri, calendly_event_type_uri]);
    return result.rows[0] || null;
}

export const getDoctorsData = async()=>{
    const result = await pool.query(`select * from doctor`);
    return result.rows || null;
}

export const deleteDoctorDetails = async(user_id:any)=>{
     await pool.query(`delete from doctor where user_id=$1`,[user_id]);
}

export const updateDoctorDetails = async({specialization , license_no , experience , consultation_fee, user_id, calendly_user_uri, calendly_event_type_uri}:DoctorProps)=>{
    const result =await pool.query(`update doctor set specialization=$1, license_no=$2, experience=$3, consultation_fee=$4, calendly_user_uri=COALESCE($5, calendly_user_uri), calendly_event_type_uri=COALESCE($6, calendly_event_type_uri) where user_id=$7 RETURNING *`,[specialization, license_no, experience, consultation_fee, calendly_user_uri || null, calendly_event_type_uri || null, user_id]);
    return result.rows || null;
}

export const existingDoctor = async(id:number)=>{
    const result = await pool.query(`select * from doctor where user_id = $1`,[id]);
    return result.rows.length>0 || null;
}
export const getDoctorData = async(id:number)=>{
    const result = await pool.query(`select * from doctor where user_id=$1`,[id]);
    return result.rows || null;
}
