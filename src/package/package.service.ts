import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { DeliveryOrder } from './entities/delivery_order.entity';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(DeliveryOrder)
    private orderRepo: Repository<DeliveryOrder>,
  ) {}

  create(createPackageDto: CreatePackageDto) {
    return 'This action adds a new package';
  }

  findAll() {
    return `This action returns all package`;
  }

  findOne(id: number) {
    return `This action returns a #${id} package`;
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }

  async findUserOrders(userId: number) {
    return await this.orderRepo
      .createQueryBuilder('order')
      .innerJoin('order.packages', 'package')
      .innerJoin('package.recipient', 'user', 'user.id =:id', { id: userId })
      .getMany();
  }
}
