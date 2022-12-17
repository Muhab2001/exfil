import {
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { Transform } from 'class-transformer';
import { SortType } from 'src/utils.enum';

export class GetOrdersDto {
  @IsNotEmpty()
  @IsISO8601()
  from: string;

  @IsNotEmpty()
  @IsISO8601()
  to: string;

  @IsOptional()
  @Transform(({ value }) => {
    return value.split(',').map((v) => parseInt(v));
  })
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(1, { each: true })
  isDelivered: number[] = [1, 2];

  @IsOptional()
  @IsNumber()
  order_number?: number;

  @IsOptional()
  @IsString()
  retailer: string;

  @IsOptional()
  @IsEnum(SortType)
  customerSort: SortType = SortType.DESCENDING;

  @IsOptional()
  @Transform(({ value }) => {
    return value.split(',');
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  offset: number;

  @IsOptional()
  @IsEnum(SortType)
  entryDateSort: SortType = SortType.DESCENDING;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page_size: number;
}
