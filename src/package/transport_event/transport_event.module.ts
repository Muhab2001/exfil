import { Module } from '@nestjs/common';
import { TransportEventService } from './transport_event.service';
<<<<<<< HEAD
=======
import { TransportEventController } from './transport_event.controller';
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportEvent } from './entities/transport_event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransportEvent])],
<<<<<<< HEAD

=======
  controllers: [TransportEventController],
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
  providers: [TransportEventService],
  exports: [TransportEventService],
})
export class TransportEventModule {}
