import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;
dotenv.config();
 const pool = new Pool({
        connectionString:process.env.CONNECTION_STRING,
        ssl: {
            rejectUnauthorized: false,
        }
    })


// Test connection on startup
pool.query('SELECT 1')
    .then(() => console.log("✅ Database connected"))
    .catch((err) => console.error("❌ Database connection failed:", err.message));

export default pool;    