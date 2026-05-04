import pool from "../config/db.ts";

interface addPatientProps{
    patient_id ?:number,
    patient_name:string,
    phone:string,
    gender:string,
    address:string,
    dob:Date
}
export const addPatient=async({patient_name , phone , gender , dob , address}:addPatientProps)=>{
   const result = await pool.query(`
        insert into patients(patient_name , phone , gender , dob , address) values ($1, $2, $3, $4, $5) RETURNING *`,[patient_name , phone , gender , dob , address]);
        return result.rows;
}

export const getAllPatient = async()=>{
    const result = await pool.query(`select * from patients`);
    return result.rows;
}
export const getOnePatient = async (id: number) => {
    const result = await pool.query(`select * from patients where patient_id = $1`, [id]);
    return result.rows[0] || null;
};

export const deletePatient = async (id: number) => {
    const result = await pool.query(`DELETE FROM patients where patient_id=$1 RETURNING *`, [id]);
    return result.rows[0];
};

export const updatePatient = async (id: number, updates: Partial<addPatientProps>) => {
    const { patient_name, phone, gender, dob, address } = updates;
    const result = await pool.query(`update patients set patient_name=$1 , phone=$2 , gender=$3 , dob = $4 , address=$5 where patient_id=$6 RETURNING *`, [patient_name, phone, gender, dob, address, id]);
    return result.rows[0];
};