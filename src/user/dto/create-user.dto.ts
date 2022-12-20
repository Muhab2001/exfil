import { Role } from 'src/auth/role.enum';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
  ValidateIf,
  IsNumber,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsNumberString()
  id: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
  @IsNotEmpty()
  @IsEmail()
  email: string; // shall be used in both company and personal email for customer and employee entities
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string; // shall be used in both personal phone number, and company phone number
  // will validate only for employees
  @ValidateIf((o) => o.Role && o.role !== Role.Customer)
  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @ValidateIf((o) => o.Role && o.role === Role.RetailEmployee)
  @IsNotEmpty()
  @IsNumber()
  retail_center: number;
}
