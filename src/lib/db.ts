import { neon } from "@neondatabase/serverless"

// Cria uma conexão com o banco de dados NeonDB
export const sql = neon(process.env.DATABASE_URL!)
