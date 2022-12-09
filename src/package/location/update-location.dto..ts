import { PartialType } from '@nestjs/mapped-types';
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
import { LocationDto as CreateLocationDto } from './insert-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}
