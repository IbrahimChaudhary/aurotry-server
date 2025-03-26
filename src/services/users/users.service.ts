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
  async findByEmail(email: string) {
    return this.drizzleService.db.select().from(users).where(eq(users.email, email));
  }

  async create(userData: { name: string; email: string }) {
    console.log("🔍 Checking if user exists:", userData.email);
  
    const existingUser = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.email, userData.email))
      .limit(1);
  
    if (existingUser.length > 0) {
      console.log("✅ User already exists:", existingUser[0]);
      return existingUser[0]; 
    }
  
    console.log("🆕 Creating new user:", userData);
    const [newUser] = await this.drizzleService.db
      .insert(users)
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