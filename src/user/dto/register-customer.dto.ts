import { OmitType } from '@nestjs/mapped-types';
import { CreateOrderDto } from 'src/package/dto/create-order.dto';
import { CreateUserDto } from './create-user.dto';

export class RegisterCustomerDto extends OmitType(CreateUserDto, ['role']) {}
