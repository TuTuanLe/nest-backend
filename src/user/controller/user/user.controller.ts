import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { RegisterDto } from 'src/user/dtos/register.dto';
import { UserService } from 'src/user/services/user/user.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async getUsers() {
    return this.userService.findUsers();
  }
  @Post()
  public async registerUser(@Body() registerDto: RegisterDto) {
    return await this.userService.registerUser(registerDto);
  }
  @Put(':id')
  public async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUser: CreateUserDto,
  ): Promise<UpdateResult> {
    return await this.userService.updateUserDTO(id, createUser);
  }

  @Delete(':id')
  public async deleteUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.userService.deleteUSer(id);
  }
}
