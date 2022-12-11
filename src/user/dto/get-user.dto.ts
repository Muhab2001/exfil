import {
  IsEAN,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/auth/role.enum';

export class GetUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
