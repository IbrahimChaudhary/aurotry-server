// src/modules/cars/cars.module.ts
import { Module } from '@nestjs/common';
import { CarsController } from 'src/controllers/cars/cars.controller';
import { CarsService } from 'src/services/cars/cars.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}