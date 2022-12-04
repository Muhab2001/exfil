import { Module } from '@nestjs/common';
import { TransportEventService } from './transport_event.service';
import { TransportEventController } from './transport_event.controller';

@Module({
  controllers: [TransportEventController],
  providers: [TransportEventService]
})
export class TransportEventModule {}
