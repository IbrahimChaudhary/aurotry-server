import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth/middleware.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private middlewareService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['authToken'];

    if (!token) {
      throw new UnauthorizedException('Authentication required');
    }

    try {
      const user = this.middlewareService.verifyToken(token);
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid authentication token');
    }
  }
}