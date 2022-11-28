import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectorCategory } from './sector-category.entity';

@Injectable()
export class SectorCategoryService {
  constructor(
    @InjectRepository(SectorCategory)
    private readonly categoryRepository: Repository<SectorCategory>,
  ) {}

  async create(payload) {
    return this.categoryRepository.save(payload);
  }

  async createMultiple(payload) {
    let failed = 0;
    for (const item of payload) {
      try {
        await this.categoryRepository.save(this.categoryRepository.create(item));
      } catch (e) {
        failed += 1;
      }
    }

    return { failed };
  }

  async getCategoryByAlias(alias) {
    return await this.categoryRepository
      .createQueryBuilder()
      .select('id, name')
      .where('url = :alias', { alias })
      .getRawOne();
  }

  async getCategoryByName(name) {
    return await this.categoryRepository
      .createQueryBuilder()
      .select('id, name')
      .where('name = :name', { name })
      .getRawOne();
  }

  async getAllCategory() {
    return await this.categoryRepository.createQueryBuilder().select('id, url').where("type = 'sector'").execute();
  }

  async getCategoryByNameAndType(name, type) {
    return await this.categoryRepository
      .createQueryBuilder()
      .select('id, name')
      .where('name = :name', { name })
      .andWhere('type = :type', { type })
      .getRawOne();
  }

  async getSectorCategoryByType(type) {
    return await this.categoryRepository
      .createQueryBuilder()
      .select('id, name')
      .andWhere('type = :type', { type })
      .execute();
  }
}
