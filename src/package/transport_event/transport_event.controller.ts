import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransportEventService } from './transport_event.service';
import { CreateTransportEventDto } from './dto/create-transport_event.dto';
import { UpdateTransportEventDto } from './dto/update-transport_event.dto';

@Controller('transport-event')
export class TransportEventController {
  constructor(private readonly transportEventService: TransportEventService) {}

  @Post()
  create(@Body() createTransportEventDto: CreateTransportEventDto) {
    return this.transportEventService.create(createTransportEventDto);
  }

  @Get()
  findAll() {
    return this.transportEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transportEventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransportEventDto: UpdateTransportEventDto) {
    return this.transportEventService.update(+id, updateTransportEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transportEventService.remove(+id);
  }
}
