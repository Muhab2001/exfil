import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Query, UseGuards } from '@nestjs/common/decorators';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/role.enum';
import { AdminCreateOrderDto } from '../dto/admin-create-order.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { LocationDto } from '../location/insert-location.dto';
import { LocationService } from '../location/location.service';
import { OrderService } from './order.service';
import { GetOrdersDto } from '../dto/get-orders.dto';
import { threadId } from 'worker_threads';

@Controller('order')
export class OrderController {
  constructor(
    private readonly ordersService: OrderService,
    private readonly locationService: LocationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Body() createorderDto: CreateOrderDto, @Req() req) {
    return this.ordersService.createOrder(req.user.id, createorderDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin')
  createAdminOrder(@Body() createorderDto: AdminCreateOrderDto) {
    const { retail_employee_id, ...others } = createorderDto;
    return this.ordersService.createOrder(retail_employee_id, others);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAllOrders(@Query() getOrderDto: GetOrdersDto) {
    return this.ordersService.findAll(getOrderDto);
  }

  @Put(':id')
  updateOrder(
    @Body() createorderDto: UpdateOrderDto,
    @Param('id') orderId: number,
  ) {
    return this.ordersService.updateOrder(orderId, createorderDto);
  }

  @Roles(Role.Customer)
  @UseGuards(JwtAuthGuard)
  @Get('customer')
  getCustomerOrders(@Req() req, @Query('side') side: 'sender' | 'recipient') {
    return this.ordersService.findCustomerDeliveryOrder(req.user.id, side);
  }

  @Roles(Role.RetailEmployee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('retail-employee')
  getRetailEmployeeOrders(@Req() req) {
    return this.ordersService.findRetailEmployeeOrders(req.user.id);
  }

  @Roles(Role.DeliveryEmployee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('delivery-employee')
  getDeliveryOrders(@Req() req) {
    return this.ordersService.findDeliveryEmployeeOrders(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneOrder(@Param('id') orderID: number, @Req() req) {
    return this.ordersService.findOne(orderID, req.user.id, req.user.role);
  }

  @Post('location/:id')
  registerPackageLocation(
    @Param('id') orderId: number,
    @Body() LocationDto: LocationDto,
  ) {
    return this.locationService.registerOrderLocation(orderId, LocationDto);
  }

  @Delete(':id')
  deleteOrder(@Param('id') orderId: number) {
    return this.ordersService.deleteOrder(orderId);
  }
}
