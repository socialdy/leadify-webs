// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 5432,
    user: 'postgres.ijilcjvjtdcggzrxgtrf',
    password: 'markus2004leadify',
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  }
})