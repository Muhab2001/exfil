import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
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
  @IsString({ each: true })
  cities?: string[];
}
