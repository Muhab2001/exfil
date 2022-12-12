import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsAlpha,
  isAlpha,
  IsAlphanumeric,
  isAlphanumeric,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { CreatePackageDto } from './create-package.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePackageDto)
  packages: CreatePackageDto[];

  @IsNotEmpty()
  @IsPositive()
  payment: number;

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
  @IsDateString()
  delivery_date: string;

  @IsNotEmpty()
  @IsEmail()
  sender: string;

  @IsNotEmpty()
  @IsEmail()
  recipient: string;

  @IsNotEmpty()
  @IsEmail()
  delivery_employee: string;
}
