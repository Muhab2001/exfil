import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePackageDto } from './dto/create-package.dto';
import { GetPackagesDto } from './dto/get-packages.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { DeliveryOrder } from './entities/delivery_order.entity';
import { Package } from './entities/package.entity';
import { OrderService } from './orders/order.service';

@Injectable()
export class PackageService {
  constructor(
    private readonly orderService: OrderService,
    @InjectRepository(Package)
    private packageRepo: Repository<Package>,
  ) {}

  async create(createPackageDto: CreatePackageDto) {
    return await this.packageRepo.save(createPackageDto);
  }

  async findAll(GetPackagesDto: GetPackagesDto) {
    console.log(GetPackagesDto);

    let query = this.packageRepo
      .createQueryBuilder('package')
      .innerJoin('package.delivery_order', 'delivery_order')
      .innerJoin('delivery_order.sender', 'customer')
      .innerJoin('customer.user', 'user')
      .innerJoin('package.current_location', 'package_location')
      .innerJoin('package_location.address', 'address')
      .select('user.username')
      .addSelect('package.delivery_date')
      .addSelect('address.city')
      .addSelect('package.category')
      .addSelect('package.status')
      .where('package.delivery_date >= :from', { from: GetPackagesDto.from })
      .andWhere('package.delivery_date <= :to', { to: GetPackagesDto.to })
      .andWhere('package.category IN (:...cats)', {
        cats: GetPackagesDto.categories,
      })
      .andWhere('package.status IN (:...st)', { st: GetPackagesDto.statuses });

    if (GetPackagesDto.cities) {
      query = query.andWhere('address.city IN (:...cities)', {
        cities: GetPackagesDto.cities,
      });
    }
    query = query
      .orderBy('user.username', GetPackagesDto.customerSort)
      .orderBy('package.delivery_date', GetPackagesDto.deliveryDateSort)
      .orderBy('package.entry_timestamp', GetPackagesDto.entryDateSort)
      .limit(GetPackagesDto.page_size)
      .offset(GetPackagesDto.offset - 1);

    return await query.getRawMany();
  }

  async findOrderPackages(orderId: number) {
    return await (
      await this.orderService.findOne(orderId)
    ).packages;
  }

  async findOne(id: number) {
    return await this.packageRepo.findOneBy({ package_number: id });
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    return await this.packageRepo.update(
      { package_number: id },
      updatePackageDto,
    );
  }

  async remove(id: number) {
    return await this.packageRepo.delete(id);
  }
}
