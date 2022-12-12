import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdatePaymentDto } from 'src/payment/dto/update-payment.dto';
import { PaymentService } from 'src/payment/payment.service';
import { CreateRetailCenterDto } from './dto/create-retail_center.dto';
import { UpdateRetailCenterDto } from './dto/update-retail_center.dto';
import { RetailCenterService } from './retail_center.service';

@Controller('retail-center')
export class RetailCenterController {
  constructor(private readonly retailCenterService: RetailCenterService) {}

  // ! payments will be created along an order to preserve consistency
  @Post()
  create(@Body() createPaymentDto: CreateRetailCenterDto) {
    return this.retailCenterService.create(createPaymentDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePaymentDto: UpdateRetailCenterDto,
  ) {
    return this.retailCenterService.updateRetailCenter(id, updatePaymentDto);
  }

  @Delete(':id')
  fulfillPayment(@Param('id') id: number) {
    return this.retailCenterService.delete(id);
  }
}
