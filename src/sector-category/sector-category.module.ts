import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorCategoryController } from './sector-category.controller';
import { SectorCategoryService } from './sector-category.service';
import { SectorCategory } from './sector-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectorCategory])],
  controllers: [SectorCategoryController],
  providers: [SectorCategoryService],
  exports: [SectorCategoryService],
})
export class SectorCategoryModule {}
