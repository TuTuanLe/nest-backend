import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BusinessNewsService } from './business-news.service';
import { Response, Request } from 'express';
import { SessionAuthGuard } from '../auth/guards/session.guard';

@Controller('business-news')
@ApiTags('Business News')
export class BusinessNewsController {
  constructor(private readonly businessNewsService: BusinessNewsService) {}

  @Get('business-all-news-by-stock')
  @UseGuards(new SessionAuthGuard())
  async getBusinessNewsByStock(@Req() req: Request, @Res() res: Response) {
    const { machungkhoan, offset } = req.query;
    const total = await this.businessNewsService.countTotalItems(machungkhoan);
    const results = await this.businessNewsService.getAllBusinessNewsById(machungkhoan.toString(), offset);
    return res.json({ results, total: parseInt(total.total) });
  }
}
