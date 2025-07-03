// db.ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL!

const client = postgres(connectionString, {
  prepare: false,
  ssl: 'require', // SSL erzwingen
  connection: {
    options: `--search_path=public` // Schema explizit setzen
  }
})

export const db = drizzle(client)