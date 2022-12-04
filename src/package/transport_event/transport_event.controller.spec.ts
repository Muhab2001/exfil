import { Test, TestingModule } from '@nestjs/testing';
import { TransportEventController } from './transport_event.controller';
import { TransportEventService } from './transport_event.service';

describe('TransportEventController', () => {
  let controller: TransportEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportEventController],
      providers: [TransportEventService],
    }).compile();

    controller = module.get<TransportEventController>(TransportEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
