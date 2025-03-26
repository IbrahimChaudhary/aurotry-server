import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/services/auth/middleware.service';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly middlewareService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['authToken'];

    if (!token) {
      throw new UnauthorizedException('Authentication required');
    }

    try {
      const user = this.middlewareService.verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid authentication token');
    }
  }
}