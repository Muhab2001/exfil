import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from 'src/package/orders/order.service';
import { UserService } from 'src/user/user.service';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentQuery } from './dto/get-payments.query';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    private readonly userService: UserService,
    private readonly ordersService: OrderService,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  async findAll(findParams: PaymentQuery) {
    return await this.paymentRepo.findBy({
      fulfilled: findParams.fulfilled,
      issue_date: Between(
        findParams.after,
        findParams.before ?? new Date().toLocaleString(),
      ),
    });
  }

  async findOne(id: number) {
    return await this.paymentRepo.findOneByOrFail({ id: id });
  }

  async updatePayment(id: number, updatePaymentDto: UpdatePaymentDto) {
    // const customer = await this.user;
    const payment = await this.findOne(id);
    const updatedParams = {
      customer: updatePaymentDto.customer_id
        ? await this.userService.findOneCustomer(updatePaymentDto.customer_id)
        : payment.customer,
      order: Promise.resolve(
        updatePaymentDto.order_id
          ? await this.ordersService.findOne(updatePaymentDto.order_id)
          : payment.order,
      ),
    };

    await this.paymentRepo.update({ id: id }, updatedParams);
  }
  // ? maybe send an OTP email for simulation?!
  async fulfillPayment(paymentId: number) {
    await this.paymentRepo.update({ id: paymentId }, { fulfilled: 1 });
  }
}
