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

class contact {
  username: string;
  email: string;
  phone: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested()
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
  @IsAlphanumeric()
  street: string;

  @IsNotEmpty()
  @IsNumberString()
  zipcode: string;

  @IsNotEmpty()
  @IsDateString()
  delivery_date: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => contact)
  sender: contact;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => contact)
  recipient: contact;

  @IsNotEmpty()
  @IsEmail()
  delivery_employee: string;
}
