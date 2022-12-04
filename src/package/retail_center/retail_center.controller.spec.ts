import { Test, TestingModule } from '@nestjs/testing';
import { RetailCenterController } from './retail_center.controller';
import { RetailCenterService } from './retail_center.service';

describe('RetailCenterController', () => {
  let controller: RetailCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetailCenterController],
      providers: [RetailCenterService],
    }).compile();

    controller = module.get<RetailCenterController>(RetailCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
