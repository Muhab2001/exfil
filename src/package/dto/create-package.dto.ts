import { IsEnum, IsNotEmpty, IsPositive, Min } from 'class-validator';
import { Package } from '../entities/package.entity';
import { PackageCategory } from '../enums/package-category.enum';
import { PackageStatus } from '../enums/package-status.enum';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsEnum(PackageCategory)
  category: PackageCategory;

  @IsNotEmpty()
  @IsEnum(PackageStatus)
  status: PackageStatus;

  @IsNotEmpty()
  @IsPositive()
  height: number;

  @IsNotEmpty()
  @IsPositive()
  width: number;

  @IsNotEmpty()
  @IsPositive()
  length: number;

  @IsNotEmpty()
  @IsPositive()
  weight: number;

  @IsNotEmpty()
  @IsPositive()
  insurance_amount: number;
}
