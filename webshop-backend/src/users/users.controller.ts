import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Response } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id/name')
  updateName(@Param('id') id: number, @Body('name') name: string) {
    return this.usersService.updateProfileName(+id, name);
  }
  
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id/password')
  updatePassword(@Param('id') id: number, @Body('password') password: string) {
    return this.usersService.updatePassword(+id, password);
  }
  @UseGuards(JwtAuthGuard)
  @Get('authors')
  findAuthors() {
    return this.usersService.findAuthors();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('paying')
  findPayingUsers() {
    return this.usersService.findPayingUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:userId')
  getProfileData(@Param('userId') userId: string) {
    return this.usersService.getProfileData(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @Get(':email')
  findUserByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res: Response) {
    return this.authService.login(req.body, req, res);
  }
}
