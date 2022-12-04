import { Test, TestingModule } from '@nestjs/testing';
import { RetailCenterService } from './retail_center.service';

describe('RetailCenterService', () => {
  let service: RetailCenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetailCenterService],
    }).compile();

    service = module.get<RetailCenterService>(RetailCenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
