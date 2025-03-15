// src/services/cars/cars.service.ts
import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/db/drizzle.service';
import { cars } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CarsService {
  constructor(private drizzleService: DrizzleService) {}

  async findAll() {
    return this.drizzleService.db.select().from(cars);
  }

  async findOne(id: number) {
    const [car] = await this.drizzleService.db
      .select()
      .from(cars)
      .where(eq(cars.id, id));
    
    return car;
  }

  async create(carData: { name: string }) {
    const [newCar] = await this.drizzleService.db
      .insert(cars)
      .values(carData)
      .returning();
    
    return newCar;
  }

  async update(id: number, carData: { name: string }) {
    const [updatedCar] = await this.drizzleService.db
      .update(cars)
      .set(carData)
      .where(eq(cars.id, id))
      .returning();
    
    return updatedCar;
  }

  async remove(id: number) {
    return this.drizzleService.db
      .delete(cars)
      .where(eq(cars.id, id))
      .returning();
  }
}