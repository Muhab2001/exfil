import {
  IsISO8601,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class PaymentQuery {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1)
  fulfilled?: number;
  @IsNotEmpty()
  @IsISO8601()
  after: string;
  @IsOptional()
  @IsISO8601()
  before: string;
}
