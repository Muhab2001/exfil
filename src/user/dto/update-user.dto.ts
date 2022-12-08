import { PartialType } from '@nestjs/mapped-types';
import { IsInstance, IsNotEmpty } from 'class-validator';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @IsNotEmpty()
  @IsInstance(User)
  user: User;
}
