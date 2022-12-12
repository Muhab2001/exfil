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
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { LocationDto } from '../location/insert-location.dto';
import { LocationService } from '../location/location.service';
import { OrderService } from './order.service';

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

  @Put(':id')
  updateOrder(
    @Body() createorderDto: UpdateOrderDto,
    @Param('id') orderId: number,
  ) {
    return this.ordersService.updateOrder(orderId, createorderDto);
  }

  @Get(':id')
  getOneOrder(@Param('id') orderID: number) {
    return this.ordersService.findOne(orderID);
  }

  @Post('location/:id')
  registerPackageLocation(
    @Param('id') orderId: number,
    @Body() LocationDto: LocationDto,
  ) {
    return this.locationService.registerOrderLocation(orderId, LocationDto);
  }

  @Get('customer')
  getCustomerOrders(@Req() req, @Body('side') side: 'sender' | 'recipient') {
    return this.ordersService.findCustomerDeliveryOrder(req.user.id, side);
  }

  @Get('retail-employee')
  getRetailEmployeeOrders(@Req() req) {
    return this.ordersService.findRetailEmployeeOrders(req.user.id);
  }

  @Get('delivery-employee')
  getDeliveryOrders(@Req() req) {
    return this.ordersService.findDeliveryEmployeeOrders(req.user.id);
  }

  @Delete(':id')
  deleteOrder(@Param('id') orderId: number) {
    return this.ordersService.deleteOrder(orderId);
  }
}
