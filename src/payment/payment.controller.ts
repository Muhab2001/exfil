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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentQuery } from './dto/get-payments.query';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // ! payments will be created along an order to preserve consistency
  // @Post()
  // create(@Body() createPaymentDto: CreatePaymentDto) {
  //   return this.paymentService.create(createPaymentDto);
  // }

  @Get()
  findAll(@Query() params: PaymentQuery) {
    return this.paymentService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Roles(Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('request')
  requestOTP(@Req() req) {
    return this.paymentService.requestOTP(req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.updatePayment(id, updatePaymentDto);
  }

  @Roles(Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('fulfill/:id')
  fulfillPayment(
    @Param('id') paymentId: number,
    @Body('otp') otp: string,
    @Req() req,
  ) {
    return this.paymentService.fulfillPayment(req.user.id, paymentId, otp);
  }
}
