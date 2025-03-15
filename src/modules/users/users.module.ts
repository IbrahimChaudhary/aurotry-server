import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/users/user.controller';
import { UserService } from 'src/services/users/users.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}