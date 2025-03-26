import { forwardRef, Module } from '@nestjs/common';
import { UserController } from 'src/controllers/users/user.controller';
import { UserService } from 'src/services/users/users.service';
import { AuthModule } from '../auth/middleware.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [
    DbModule, 
    forwardRef(() => AuthModule), 
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}