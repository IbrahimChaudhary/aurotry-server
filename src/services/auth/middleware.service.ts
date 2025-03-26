import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DrizzleService } from 'src/db/drizzle.service';
import { UserService } from '../users/users.service';
import { users } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { first } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  generateToken(user: any) {
    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      sub: user.id,
    };
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(userData: {
    firstName: string;
    lastName: string;
    email: string;
    planId?: number;
  }) {
    try {
      // const existingUser = await this.drizzleService.db
      //   .select()
      //   .from(users)
      //   .where(eq(users.email, userData.email));

      // if (existingUser.length > 0) {
      //   throw new ConflictException('User with this email already exists');
      // }

      // const [newUser] = await this.drizzleService.db
      //   .insert(users)
      //   .values({
      //     lastName: userData.lastName,
      //     firstName: userData.firstName,
      //     email: userData.email,
      //     planId: userData.planId || null,
      //   })
      //   .returning();

      const user = {
        firstName: userData.firstName,
        lastName : userData.lastName,
        email: userData.email,
        planId: userData.planId || null,
      }
      // const { password, ...userWithoutPassword } = newUser;

      const token = this.generateToken(user);

      return { user: user, token };
    } catch (error) {
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const [user] = await this.drizzleService.db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const { password: _, ...userWithoutPassword } = user;

      const token = this.generateToken(userWithoutPassword);

      return { user: userWithoutPassword, token };
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(userId: number) {
    try {
      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async signOut() {
    return { success: true };
  }
}
