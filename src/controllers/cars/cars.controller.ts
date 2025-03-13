import { Body, Controller, Get, Post } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Controller('cars')
export class CarController {
  constructor(private readonly supabaseService: SupabaseService) {}
  @Post()
  async createUser(@Body() carData: { name: string }) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('cars')
      .insert([carData]);

    if (error) {
      return { error: error.message };
    }

    return data;
  }
  @Get()
  async getUsers() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('cars')
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
