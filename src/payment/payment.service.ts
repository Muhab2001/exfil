import { Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common/cache/cache.constants';
import { Inject } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { EmailsService } from 'src/emails/emails.service';
import { OrderService } from 'src/package/orders/order.service';
import { UserService } from 'src/user/user.service';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentQuery } from './dto/get-payments.query';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { randomBytes } from 'crypto';
import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    private readonly userService: UserService,
    private readonly ordersService: OrderService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly emailservice: EmailsService,
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
          ? await this.ordersService.findOneRaw(updatePaymentDto.order_id)
          : payment.order,
      ),
    };

    await this.paymentRepo.update({ id: id }, updatedParams);
  }

  async requestOTP(customerId: string) {
    // get customer email, send an OTP, cache it for 3 minutes, and disallow any other requests if the OTP exists in the cache
    const customer = await this.userService.findOneCustomer(customerId);
    if ((await this.cacheManager.get(customerId + '-otp')) !== undefined) {
      throw new BadRequestException(
        'You cannot request mroe than one OTP every 3 minutes',
      );
    }

    const otp = randomBytes(3).toString('hex');

    await this.cacheManager.set(customer.userId + '-otp', otp, 60 * 3 * 1000);
    await this.emailservice.sendEmail({
      subject: 'OTP confirmation',
      email: customer.email,
      template: 'otp',
      context: {
        otp: otp,
      },
    });
  }

  // ? maybe send an OTP email for simulation?!
  async fulfillPayment(customerId: string, paymentId: number, otp: string) {
    console.log(otp);
    console.log(await this.cacheManager.get(customerId + '-otp'));

    if ((await this.cacheManager.get(customerId + '-otp')) === otp) {
      await this.paymentRepo.update({ id: paymentId }, { fulfilled: 1 });
      await this.cacheManager.del(customerId + '-otp');
    } else {
      throw new UnauthorizedException('Invalid OTP code');
    }
  }
}
