import { PartialType } from '@nestjs/mapped-types';
import { CreateTransportEventDto } from './create-transport_event.dto';

export class UpdateTransportEventDto extends PartialType(CreateTransportEventDto) {}
