import { IsNotEmpty, IsNumberString } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class AdminCreateOrderDto extends CreateOrderDto {
  @IsNotEmpty()
  @IsNumberString()
  retail_employee_id: string;
}
