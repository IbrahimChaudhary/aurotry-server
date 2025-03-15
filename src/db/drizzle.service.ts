import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres'; 

import * as schema from './schema';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private client;
  public db;
  public supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );

    const connectionString = process.env.DATABASE_URL!;
    
    this.client = postgres(connectionString, { ssl: { rejectUnauthorized: false } });
    
    this.db = drizzle(this.client, { schema });
  }

  async onModuleInit() {
    console.log('DrizzleService initialized');
  }

  async onModuleDestroy() {
    await this.client.end();
    console.log('Database connection closed');
  }
}