import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { Transform } from 'class-transformer';
import { SortType } from 'src/utils.enum';

export class GetPackagesDto {
  @IsNotEmpty()
  @IsISO8601()
  from: string;

  @IsNotEmpty()
  @IsISO8601()
  to: string;

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsString({ each: true })
  cateogries?: string[];

  @IsNotEmpty()
  @IsEnum(SortType)
  categorySort?: SortType;

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsString({ each: true })
  statuses?: string[];

  @IsNotEmpty()
  @IsEnum(SortType)
  statusSort: SortType;

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsString({ each: true })
  cities?: string[];

  @IsNotEmpty()
  @IsEnum(SortType)
  citySort: SortType;

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsString({ each: true })
  customers?: string[];

  customerSort: SortType;
}
