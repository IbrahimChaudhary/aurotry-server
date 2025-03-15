import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/db/drizzle.service';
import { users } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(private drizzleService: DrizzleService) {}

  async findAll() {
    return this.drizzleService.db.select().from(users);
  }

  async findOne(id: number) {
    return this.drizzleService.db.select().from(users).where(eq(users.id, id));
  }

  async create(userData: { name: string; email: string }) {
    const [newUser] = await this.drizzleService.db.insert(users)
      .values(userData)
      .returning();
    return newUser;
  }

  async update(id: number, userData: Partial<{ name: string; email: string }>) {
    const [updatedUser] = await this.drizzleService.db.update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  async remove(id: number) {
    return this.drizzleService.db.delete(users).where(eq(users.id, id));
  }
}