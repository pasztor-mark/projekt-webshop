import { Controller, Get, Post, Request, Response, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req, @Response() res) {
    const user = req.body;
    return this.authService.login(user, req, res);
  }

  @Post('logout')
  async logout(@Request() req, @Response() res) {
    return this.authService.logout(req, res);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Request() req, @Response() res) {
    return this.authService.register(createUserDto, req, res);
  }

  @Get('check-auth')
  async checkAuth(@Request() req, @Response() res) {
    const token = req.cookies.token;
    
    if (token) {
      try {
        const user = await this.authService.validateToken(token);
        return res.send(user);
      } catch (error) {
      }
    }
  }
}
