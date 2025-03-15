import { Module } from '@nestjs/common';
import { UserController } from './controllers/users/user.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { DbModule } from './db/db.module';
import { UsersModule } from './modules/users/users.module';
import { CarsModule } from './modules/cars/cars.module';

@Module({
  imports: [SupabaseModule, DbModule, UsersModule, CarsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
