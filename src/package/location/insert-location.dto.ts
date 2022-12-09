import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Address } from 'cluster';
import { Package } from '../entities/package.entity';
import { PackageLocation } from '../enums/package-location.enum';

export class LocationDto {
  @IsNotEmpty()
  @IsEnum(PackageLocation)
  type: PackageLocation;
  @IsNotEmpty()
  @IsInt()
  address_id: number;
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  packages: Package[];
  @IsNotEmpty()
  @IsInt()
  event_id: number;
}
