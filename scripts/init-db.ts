// Init DB script - creates tables in Neon PostgreSQL
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'

dotenv.config({ path: ".env" })

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' })

async function main() {
    console.log('🔧 Creating tables...')

    const schema = readFileSync('./scripts/schema.sql', 'utf-8')

    // Execute each statement separately
    const statements = schema.split(';').filter(s => s.trim())

    for (const statement of statements) {
        if (statement.trim()) {
            console.log('Executing:', statement.substring(0, 50) + '...')
            await sql.unsafe(statement)
        }
    }

    console.log('✅ Tables created!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => sql.end())
