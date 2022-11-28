import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessNewsController } from './business-news.controller';
import { BusinessNewsService } from './business-news.service';
import { BusinessNewsEntity } from './business-news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessNewsEntity])],
  controllers: [BusinessNewsController],
  providers: [BusinessNewsService],
  exports: [BusinessNewsService],
})
export class BusinessNewsModule {}
