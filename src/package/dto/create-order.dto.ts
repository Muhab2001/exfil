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
  IsNumber,
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
  @IsNumber()
  @Validate(({ value }) => value >= 0)
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
  @IsEmail()
  sender: string;

  @IsNotEmpty()
  @IsEmail()
  recipient: string;

  @IsNotEmpty()
  @IsEmail()
  delivery_employee: string;
}
