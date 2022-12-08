import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Customer } from './entities/customer.entity';
import { DeliveryEmployee } from './entities/delivery-employee.entity';
import { RetailEmployee } from './entities/retail-employee.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Employee,
      Customer,
      DeliveryEmployee,
      RetailEmployee,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
