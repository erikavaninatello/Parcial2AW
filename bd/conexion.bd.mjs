// Conexión a la base de datos PostgreSQL
// Utilizamos Pool de pg para gestionar múltiples conexiones
// Las credenciales se leen desde el .env

import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
    host:     process.env.BD_HOST,
    user:     process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_BD,
    port:     process.env.BD_PORT,
})

export default pool