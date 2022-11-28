import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BusinessNewsEntity } from './business-news.entity';
import { BusinessNewsDto } from './dtos/business-news.dto';

@Injectable()
export class BusinessNewsService {
  constructor(
    @InjectRepository(BusinessNewsEntity)
    private readonly businessNewsRepo: Repository<BusinessNewsEntity>,
  ) {}

  async getNewsByLinksAndMachungkhoan(links: string[], machungkhoan: string): Promise<BusinessNewsEntity[]> {
    return await this.businessNewsRepo.find({ link: In(links), machungkhoan });
  }

  async save(body: BusinessNewsDto[]): Promise<(BusinessNewsDto & BusinessNewsEntity)[]> {
    return await this.businessNewsRepo.save(body);
  }

  async getAllBusinessNewsById(machungkhoan: string, offset, limit = 10) {
    return await this.businessNewsRepo
      .createQueryBuilder()
      .select('id,title,link,source,description,date')
      .where('machungkhoan = :machungkhoan', { machungkhoan })
      .orderBy('date', 'DESC')
      .offset(offset)
      .limit(limit)
      .execute();
  }

  async countTotalItems(machungkhoan) {
    return await this.businessNewsRepo
      .createQueryBuilder()
      .select('COUNT(1) as total')
      .where('machungkhoan = :machungkhoan', { machungkhoan })
      .getRawOne();
  }
}
