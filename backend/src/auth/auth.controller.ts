import { Controller, Get, Post, Body, Param, Res, Req } from '@nestjs/common';
import type { Response } from 'express';
import { LoginUserDto } from './dto/login.dto.js';
import { GoogleAuthDto } from './dto/google.dto.js';
import { AuthService } from './auth.service.js';
import { RegisterUserDto } from './dto/register.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(@Body() registerUserDto: RegisterUserDto, @Res({passthrough: true}) response : Response) {
    console.log('request hit')
    const token = await this.authService.registerUser(registerUserDto);

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Authentication successful' };
  }
  
  @Post('login')
  async loginUser(@Body() loginUserDto : LoginUserDto, @Res({passthrough: true}) response : Response) {
    const token = await this.authService.loginUser(loginUserDto);
    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Authentication successful' };
  }

  @Post("google")
  async googleLogin(@Body() googleAuthDto : GoogleAuthDto, @Res({passthrough: true}) response : Response){
    const token = await this.authService.googleAuth(googleAuthDto);

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
     return { message: 'Authentication successful' };
  }
  

  @Get('me')
  async getMe (@CurrentUser('id') userId : number){
    return  await this.authService.getMe(userId);

  }

  @Get("logout")
  logout (@Res({passthrough: true}) res : Response) {
      res.clearCookie('access_token');

      return ({message: "User successfully logout"})
  }

  
}