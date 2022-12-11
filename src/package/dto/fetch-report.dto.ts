import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class FetchReportDto {
  @IsISO8601()
  @IsNotEmpty()
  from: string;
  @IsISO8601()
  @IsNotEmpty()
  to: string;
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  location_ids?: number[];
}
