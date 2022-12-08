import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryOrder } from './entities/delivery_order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(DeliveryOrder)
    private ordersRepo: Repository<DeliveryOrder>,
  ) {}

  async findOne(id: number) {
    return await this.ordersRepo.findOneByOrFail({ id: id });
  }
}
