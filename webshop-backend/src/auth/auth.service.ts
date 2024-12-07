import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
      const user = await this.usersService.findUserByEmail(payload.username);
      if (user) {
        const { password, ...result } = user;
        return result;
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    return null;
  }

  async login(user: any, req: any, res: any) {
    let validatedUser;
    if (user.email && user.password) {
      validatedUser = await this.validateUser(user.email, user.password);
    } else {
      validatedUser = user;
    }

    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: validatedUser.email, sub: validatedUser.id };
    const token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET });
    
    res.cookie('token', token, { httpOnly: true, secure: false }); 
    
    return res.send({ message: 'Login successful', user: { email: validatedUser.email, id: validatedUser.id } });
  }

  async register(createUserDto: CreateUserDto, req: any, res: any) {
    const existingUser = await this.usersService.findUserByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const user = await this.usersService.create(createUserDto);
    return this.login(user, req, res);
  }

  async logout(req: any, res: any) {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).send({ message: 'Logout failed' });
      }
      res.clearCookie('token');
      res.send({ message: 'Logout successful' });
    });
  }
}
