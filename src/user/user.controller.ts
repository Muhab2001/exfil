import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
<<<<<<< HEAD
  Query,
=======
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RegisterCustomerDto } from './dto/register-customer.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('register')
  registerCustomer(@Body() createUserDto: RegisterCustomerDto) {
    return this.userService.create({ ...createUserDto, role: Role.Customer });
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

  @Roles(Role.Admin, Role.DeliveryEmployee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('delivery-employee/:id')
  updateDeliveryEmployee(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateDeliverEmployee(id, updateUserDto);
  }

  @Roles(Role.Admin, Role.RetailEmployee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('retail-employee/:id')
  updateRetailEmployee(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto & { retail_center: number },
  ) {
    return this.userService.updateRetailEmployee(id, updateUserDto);
  }

  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
