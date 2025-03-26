import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './controllers/users/user.controller';
import { SupabaseModule } from './supabase/supabase.module';
import { DbModule } from './db/db.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/middleware.module';
import * as cookieParser from 'cookie-parser';
import { JwtAuthMiddleware } from './middleware/jwt-auth.middleware';

@Module({
  imports: [SupabaseModule, DbModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser())
      .forRoutes('*');
        consumer
      .apply(JwtAuthMiddleware)
      .exclude('auth/signin', 'auth/signup', 'auth/login')
      .forRoutes('*');
  }
}