import {
  IsNotEmpty,
  IsAlpha,
  IsString,
  IsNumberString,
  IsEnum,
} from 'class-validator';
import { RetailCenterType } from '../enums/retail-center-type.enum';

export class CreateRetailCenterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(RetailCenterType)
  type: RetailCenterType;
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
}
