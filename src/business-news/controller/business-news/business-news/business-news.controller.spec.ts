import { Test, TestingModule } from '@nestjs/testing';
import { BusinessNewsController } from './business-news.controller';

describe('BusinessNewsController', () => {
  let controller: BusinessNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessNewsController],
    }).compile();

    controller = module.get<BusinessNewsController>(BusinessNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
