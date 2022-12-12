import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsAlpha,
  IsIn,
  IsNumberString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsAlphanumeric,
  ArrayNotEmpty,
  ValidateNested,
  IsString,
  IsObject,
} from 'class-validator';
import { Address } from 'cluster';
import { Package } from '../entities/package.entity';
import { PackageLocationType } from '../enums/package-location.enum';
import { PackageStatus } from '../enums/package-status.enum';
import { EventType } from '../transport_event/event.enum';

class PackageStatusIndicator {
  [id: string]: PackageStatus;
}
export class LocationDto {
  @IsNotEmpty()
  @IsEnum(PackageLocationType)
  locationType: PackageLocationType;

  @IsEnum(EventType)
  @IsNotEmpty()
  eventType: EventType;

  @IsNotEmpty()
  @IsAlpha()
  city: string;
  @IsNotEmpty()
  @IsAlpha()
  country: string;
  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsNumberString()
  zipcode: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PackageStatusIndicator)
  statuses: PackageStatusIndicator;
}
