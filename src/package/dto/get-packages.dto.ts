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
} from 'class-validator';

import { Transform } from 'class-transformer';
import { SortType } from 'src/utils.enum';
import { PackageStatus } from '../enums/package-status.enum';
import { PackageCategory } from '../enums/package-category.enum';

export class GetPackagesDto {
  @IsNotEmpty()
  @IsISO8601()
  from: string;

  @IsNotEmpty()
  @IsISO8601()
  to: string;

  @IsOptional()
  @IsString()
  customer?: string;

  @IsOptional()
  @Transform(({ value }) => {
    return value.split(',');
  })
  @IsArray()
  @IsString({ each: true })
  categories: PackageCategory[] = Object.values(PackageCategory);

  @IsOptional()
  @IsEnum(SortType)
  categorySort?: SortType = SortType.DESCENDING;

  @IsOptional()
  @Transform(({ value }) => {
    return value.split(',');
  })
  @IsArray()
  @IsString({ each: true })
  statuses: PackageStatus[] = Object.values(PackageStatus);

  @IsOptional()
  @Transform(({ value }) => {
    return value.split(',');
  })
  @IsArray()
  @IsString({ each: true })
  cities?: string[];

  @IsOptional()
  @IsEnum(SortType)
  citySort: SortType = SortType.DESCENDING;

  @IsOptional()
  @IsEnum(SortType)
  customerSort: SortType = SortType.DESCENDING;

  @IsOptional()
  @IsEnum(SortType)
  deliveryDateSort: SortType = SortType.DESCENDING;

  @IsOptional()
  @IsEnum(SortType)
  entryDateSort: SortType = SortType.DESCENDING;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  offset: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page_size: number;
}
