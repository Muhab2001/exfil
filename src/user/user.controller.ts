import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('customers')
  findAllCustomers() {
    return this.userService.findAllCustomers();
  }

  @Get('retail-employees')
  findAllRetailEmployees() {
    return this.userService.findAllRetailEmployees();
  }

  @Get('delivery-employees')
  findAllDeliveryEmployees() {
    return this.userService.findAllDeliveryEmployees();
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.userService.findOneUserById(id);
  }

  @Get('customer/:id')
  findOneCustomer(@Param('id') id: string) {
    return this.userService.findOneCustomer(id);
  }

  @Get('retail-employee/:id')
  findOneRetailEmployee(@Param('id') id: string) {
    return this.userService.findOneRetailEmployee(id);
  }

  @Get('delivery-employee/:id')
  findOneDeliveryEmployee(@Param('id') id: string) {
    return this.userService.findOneDeliveryEmployee(id);
  }

  @Patch('customer/:id')
  updateCustomer(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateCustomer(id, updateUserDto);
  }

  @Patch('delivery-employee/:id')
  updateDeliveryEmployee(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateDeliverEmployee(id, updateUserDto);
  }

  @Patch('retail-employee/:id')
  updateRetailEmployee(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateRetailEmployee(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
