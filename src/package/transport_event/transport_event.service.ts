import { Injectable } from '@nestjs/common';
import { CreateTransportEventDto } from './dto/create-transport_event.dto';
import { UpdateTransportEventDto } from './dto/update-transport_event.dto';

@Injectable()
export class TransportEventService {
  create(createTransportEventDto: CreateTransportEventDto) {
    return 'This action adds a new transportEvent';
  }

  findAll() {
    return `This action returns all transportEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transportEvent`;
  }

  update(id: number, updateTransportEventDto: UpdateTransportEventDto) {
    return `This action updates a #${id} transportEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} transportEvent`;
  }
}
