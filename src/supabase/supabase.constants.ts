import * as dotenv from 'dotenv';
dotenv.config();
export const SUPABASE_URL = process.env.SUPABASE_URL || 'your-supabase-url';
export const SUPABASE_KEY = process.env.SUPABASE_KEY || 'your-supabase-key';

