import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { SessionAuthGuard } from './guards/session.guard';
import { AuthUser } from './auth.decorator';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  @UseGuards(new SessionAuthGuard())
  @Get('me')
  me(@AuthUser() user: User): User {
    return user;
  }
}
