import {
  Post,
  Body,
  Controller,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { SessionAuthGuard } from '../auth/guards/session.guard';
import { encrypt } from 'src/common/helpers/encryption';
import { UserService } from './user.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<any> {
    const user = await this.userService.create(dto);
    const activeCode = encrypt(`${user.email}_@@_${Date.now()}`);
    await this.userService.updateActiveCode(user.email, activeCode, 1);

    return user;
  }

  @UseGuards(new SessionAuthGuard())
  @Get('me')
  me(@Req() req: Request) {
    return req.session.user;
  }

  @UseGuards(new SessionAuthGuard())
  @Post('save-chart-options')
  async saveChartOptions(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const userId = req.session.user.id;
    const { chartOptions } = req.body;
    const results = await this.userService.updateChartOptions(
      chartOptions,
      userId,
    );

    return res.json(results);
  }
}
