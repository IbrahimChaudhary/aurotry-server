import { Body, Controller, Get, Post } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Controller('users')
export class UserController {
  constructor(private readonly supabaseService: SupabaseService) {}
  @Post()
  async createUser(@Body() userData: { name: string }) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('users')
      .insert([userData]);

    if (error) {
      return { error: error.message };
    }

    return data;
  }
  @Get()
  async getUsers() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('users')
      .select('*');

    if (error) {
      return { error: error.message };
    }

    return data;
  }
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
