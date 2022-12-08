import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { OrConstraint } from 'src/custom-validation/or.constraint';

export class UpdatePaymentDto {
  @Validate(OrConstraint, ['order_id'])
  @IsString()
  customer_id: string;
  @Validate(OrConstraint, ['customer_id'])
  @IsNumber()
  order_id: number;
  @IsOptional()
  @IsNumber()
  amount: number;
}
