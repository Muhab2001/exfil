import { Module } from '@nestjs/common';
import { TransportEventService } from './transport_event.service';
import { TransportEventController } from './transport_event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportEvent } from './entities/transport_event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransportEvent])],
  controllers: [TransportEventController],
  providers: [TransportEventService],
  exports: [TransportEventService],
})
export class TransportEventModule {}
