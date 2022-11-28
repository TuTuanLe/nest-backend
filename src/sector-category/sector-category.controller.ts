import { Controller, Req, Res, UseGuards, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { SessionAuthGuard } from '../auth/guards/session.guard';
import { SectorCategoryService } from './sector-category.service';

@ApiTags('category')
@Controller('category')
export class SectorCategoryController {
  constructor(private readonly sectorCategoryService: SectorCategoryService) {}

  @UseGuards(new SessionAuthGuard())
  @Get('get-sector-categories')
  async getGiaTriGiaoDich(@Req() req: Request, @Res() res: Response) {
    const data = await this.sectorCategoryService.getSectorCategoryByType('sector');

    return res.json(data);
  }
}
