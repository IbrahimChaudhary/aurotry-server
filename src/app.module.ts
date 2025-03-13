import { Module } from '@nestjs/common';
import { UserController } from './controllers/users/user.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { CarController } from './controllers/cars/cars.controller';

@Module({
  imports: [SupabaseModule],
  controllers: [UserController, CarController],
  providers: [AppService],
})
export class AppModule {}
