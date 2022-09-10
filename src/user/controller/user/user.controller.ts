import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { RegisterDto } from 'src/user/dtos/register.dto';
import { UserService } from 'src/user/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {}
  @Post()
  registerUser(@Body() registerDto: RegisterDto) {
    this.userService.registerUser(registerDto);
  }
}
