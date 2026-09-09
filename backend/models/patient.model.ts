import pool from "../config/db.ts";

interface addPatientProps{
    patient_id ?:number,
    patient_name:string,
    phone:string,
    gender:string,
    address:string,
    dob:Date,
    email?: string
}
export const addPatient=async({patient_name , phone , gender , dob , address, email}:addPatientProps)=>{
   const result = await pool.query(`
        insert into patients(patient_name , phone , gender , dob , address, email) values ($1, $2, $3, $4, $5, $6) RETURNING *`,[patient_name , phone , gender , dob , address, email || null]);
        return result.rows[0] || null;
}

export const getAllPatient = async()=>{
    const result = await pool.query(`select * from patients`);
    return result.rows;
}
export const searchPatients = async (search: string) => {
    const result = await pool.query(
        `SELECT * FROM patients
         WHERE patient_name ILIKE $1 OR phone ILIKE $1 OR patient_id::text ILIKE $1
         ORDER BY patient_name ASC LIMIT 20`,
        [`%${search}%`],
    );
    return result.rows;
};
export const getPatientByPhone = async (phone: string) => {
    const result = await pool.query(`SELECT * FROM patients WHERE phone = $1 LIMIT 1`, [phone]);
    return result.rows[0] || null;
};
export const getOnePatientModel  = async (id: number) => {
    const result = await pool.query(`select * from patients where patient_id =${id}`);
    return result.rows[0] || null;
};

export const deletePatient = async (id: number) => {
    const result = await pool.query(`DELETE FROM patients where patient_id=$1 RETURNING *`, [id]);
    return result.rows[0];
};

export const updatePatient = async (id: number, updates: Partial<addPatientProps>) => {
    const { patient_name, phone, gender, dob, address, email } = updates;
    const result = await pool.query(`update patients set patient_name=$1 , phone=$2 , gender=$3 , dob = $4 , address=$5, email=$6 where patient_id=$7 RETURNING *`, [patient_name, phone, gender, dob, address, email || null, id]);
    return result.rows[0];
};
