import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // findAllUsers(@Query() getUserDto: GetUserDto) {
  //   return this.userService.findAllUsers(getUserDto);
  // }

  @Get('customers')
  findAllCustomers(@Query() GetUserDto: GetUserDto) {
    return this.userService.findAllCustomers(GetUserDto);
  }

  @Get('retail-employees')
  findAllRetailEmployees(@Query() GetUserDto: GetUserDto) {
    return this.userService.findAllRetailEmployees(GetUserDto);
  }

  @Get('delivery-employees')
  findAllDeliveryEmployees(@Query() GetUserDto: GetUserDto) {
    return this.userService.findAllDeliveryEmployees(GetUserDto);
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
