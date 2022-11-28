import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly category: Repository<Category>,
  ) {}

  async create(payload) {
    return this.category.save(payload);
  }

  async createMultiple(payload) {
    let failed = 0;
    for (const item of payload) {
      try {
        await this.category.save(this.category.create(item));
      } catch (e) {
        failed += 1;
      }
    }

    return { failed };
  }

  async getCategoryByName(name: string) {
    return await this.category
      .createQueryBuilder()
      .select('id, created_at')
      .where('name LIKE :name', { name })
      .getRawOne();
  }

  async getCategoriesForSector() {
    return await this.category
      .createQueryBuilder()
      .select('id, name, sector_category_id')
      .where("sector_category_id IN (SELECT id FROM sector_categories WHERE type = 'sector')")
      .execute();
  }
}
