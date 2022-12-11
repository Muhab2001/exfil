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
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

  @Post()
  createOrder(@Body() createorderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createorderDto);
  }

  @Put(':id')
  updateOrder(
    @Body() createorderDto: UpdateOrderDto,
    @Param('id') orderId: number,
  ) {
    return this.ordersService.updateOrder(createorderDto);
  }

  @Get(':id')
  getOneOrder(@Param('id') orderID: number) {
    return this.ordersService.findOne(orderID);
  }

  @Get('customer')
  getCustomerOrders(@Req() req) {}

  @Get('retail-employee')
  getCRetailEmployeeOrders(@Req() req) {}

  @Get('delivery-employee')
  getDeliveryOrders(@Req() req) {}

  @Delete(':id')
  deleteORder(@Param('id') orderId: number) {}
}
