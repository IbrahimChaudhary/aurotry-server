import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { AuthService } from 'src/services/auth/middleware.service';
import { DbModule } from 'src/db/db.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        DbModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'your-secret-key',
          signOptions: { expiresIn: '7d' },
        }),
        forwardRef(() => UsersModule), 
      ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}