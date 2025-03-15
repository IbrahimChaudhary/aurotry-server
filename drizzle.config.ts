import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

// Parse the DATABASE_URL to extract individual components
// This approach lets you use different DB_URLs for different environments
const dbUrl = new URL(process.env.DATABASE_URL || '');

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port || '6543'),
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.substring(1),
    ssl: {
      rejectUnauthorized: false
    },
  },
});