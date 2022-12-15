import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { count } from 'console';
import { GeoAddress } from 'src/package/entities/address.entity';
import { Customer } from 'src/user/entities/customer.entity';
import { User } from 'src/user/entities/user.entity';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePackageDto } from './dto/create-package.dto';
import { GetPackagesDto } from './dto/get-packages.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { DeliveryOrder } from './entities/delivery_order.entity';
import { PackageLocation } from './entities/package-location.entity';
import { Package } from './entities/package.entity';
import { OrderService } from './orders/order.service';

@Injectable()
export class PackageService {
  constructor(
    private readonly orderService: OrderService,
    @InjectRepository(Package)
    private packageRepo: Repository<Package>,
    @InjectRepository(GeoAddress)
    private addressRepo: Repository<GeoAddress>,
  ) {}

  async create(createPackageDto: CreatePackageDto) {
    return await this.packageRepo.save(createPackageDto);
  }

  async findAll(GetPackagesDto: GetPackagesDto) {
    console.log(GetPackagesDto);

    let query = this.packageRepo
      .createQueryBuilder('package')
      .select('package.package_number')
      .addSelect('user.username')
      .addSelect('package.delivery_date')
      .addSelect('package.entry_timestamp')
      .addSelect('geo_address.city')
      .addSelect('package.category')
      .addSelect('package.status')
      .innerJoin(
        DeliveryOrder,
        'delivery_order',
        'package.deliveryOrderId = delivery_order.id',
      )
      .innerJoin(User, 'user', 'delivery_order.senderId = user.id')
      .innerJoin(
        PackageLocation,
        'package_location',
        'package.currentLocationId = package_location.id',
      )
      .innerJoin(
        GeoAddress,
        'geo_address',
        'package_location.addressId = geo_address.id',
      )
      .where('package.entry_timestamp >= :from', { from: GetPackagesDto.from })
      .andWhere('package.entry_timestamp <= :to', { to: GetPackagesDto.to })
      .andWhere('package.category IN (:...cats)', {
        cats: GetPackagesDto.categories,
      })

      .andWhere('package.status IN (:...st)', { st: GetPackagesDto.statuses });

    if (GetPackagesDto.cities?.length) {
      query = query.andWhere('geo_address.city IN (:...cities)', {
        cities: GetPackagesDto.cities,
      });
    }
    if (GetPackagesDto.customer?.length) {
      query = query.andWhere('user.username like :name', {
        name: `%${GetPackagesDto.customer}%`,
      });
    }
    query = query
      .orderBy('user.username', GetPackagesDto.customerSort)
      .orderBy('package.delivery_date', GetPackagesDto.deliveryDateSort)
      .orderBy('package.entry_timestamp', GetPackagesDto.entryDateSort);

    const allCount = await query.getCount();

    const results = await query
      .limit(GetPackagesDto.page_size)
      .offset(GetPackagesDto.offset)
      .getRawMany();

    return { results: results, count: allCount };
  }

  async findOrderPackages(orderId: number) {
    return await (
      await this.orderService.findOneRaw(orderId)
    ).packages;
  }

  async findOne(id: number) {
    return await this.packageRepo.findOne({
      where: { package_number: id },
      relations: {
        package_locations: true,
      },
    });
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    return await this.packageRepo.update(
      { package_number: id },
      updatePackageDto,
    );
  }

  async remove(id: number) {
    const pkg = await this.packageRepo.findOneByOrFail({ package_number: id });

    return await this.packageRepo.remove(pkg);
  }
}
