import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/services/auth/middleware.service';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard.';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  async signUp(
    @Body() 
    body: { 
      firstName: string; 
      lastName: string; 
      email: string; 
      planId?: number;
    },
    @Res({ passthrough: true }) response: Response
  ) {
    const result = await this.authService.signUp(body);
    
    response.cookie('authToken', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    
    return { user: result.user };
  }

  // @Post('signin')
  // async signIn(
  //   @Body() body: { email: string; password: string },
  //   @Res({ passthrough: true }) response: Response
  // ) {
  //   const result = await this.authService.signIn(body.email, body.password);
    
  //   response.cookie('authToken', result.token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'lax',
  //     maxAge: 7 * 24 * 60 * 60 * 1000, 
  //   });
    
  //   return { user: result.user };
  // }


  @Post('signout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('authToken');
    return { message: 'Signed out successfully' };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() request: Request) {
    return request.user;
  }
}