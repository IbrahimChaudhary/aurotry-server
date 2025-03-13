import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { SUPABASE_URL, SUPABASE_KEY } from './supabase.constants';
if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase URL or API Key is missing");
}

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
