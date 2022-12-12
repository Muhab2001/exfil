import { PartialType } from '@nestjs/mapped-types';
import { IsInstance, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsInstance(User)
  user: User;
}
