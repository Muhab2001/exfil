import { Test, TestingModule } from '@nestjs/testing';
import { TransportEventService } from './transport_event.service';

describe('TransportEventService', () => {
  let service: TransportEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportEventService],
    }).compile();

    service = module.get<TransportEventService>(TransportEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
