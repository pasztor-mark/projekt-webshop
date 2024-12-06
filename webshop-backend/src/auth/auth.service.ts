import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    console.log(user);
    if (user && (password === user.password)) {
      const { password, ...result } = user;
      
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    const validatedUser = await this.validateUser(user.email, user.password);
    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: validatedUser.email, sub: validatedUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
