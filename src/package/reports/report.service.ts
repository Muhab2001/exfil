import { Injectable } from '@nestjs/common';
import { PackageService } from '../package.service';
import { FetchReportDto } from '../dto/fetch-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from '../entities/package.entity';
import { Between, In, Repository } from 'typeorm';
import { PackageLocation } from '../entities/package-location.entity';
import { GeoAddress } from '../entities/address.entity';
import { Payment } from 'src/payment/entities/payment.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Package)
    private packageRepo: Repository<Package>,
    @InjectRepository(GeoAddress)
    private addressRepo: Repository<GeoAddress>,
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
  ) {}

  async findPackageCategories(findParams: FetchReportDto) {
    // group by category
    let baseQuery = this.packageRepo
      .createQueryBuilder('package')
      .select('package.category')
      .addSelect('count(*)', 'count')
      .innerJoin(PackageLocation, 'loc', 'package.currentLocationId = loc.id')
      .innerJoin(GeoAddress, 'add', 'add.id = loc.addressId')
      .where('package.entry_timestamp BETWEEN :from AND :to', {
        from: findParams.from,
        to: findParams.to,
      });
    if (findParams.cities) {
      baseQuery = baseQuery.andWhere('add.city IN (:...cities)', {
        cities: findParams.cities,
      });
    }
    const categoryResults = await baseQuery
      .groupBy('package.category')
      .getRawMany();

    return categoryResults;
  }

  async findPackageStatuses(findParams: FetchReportDto) {
    let baseQuery = this.packageRepo
      .createQueryBuilder('package')
      .select('package.status')
      .addSelect('count(*)', 'count')
      .innerJoin(PackageLocation, 'loc', 'package.currentLocationId = loc.id')
      .innerJoin(GeoAddress, 'add', 'add.id = loc.addressId')
      .where('package.entry_timestamp BETWEEN :from AND :to', {
        from: findParams.from,
        to: findParams.to,
      });

    if (findParams.cities) {
      baseQuery = baseQuery.andWhere('add.city IN (:...cities)', {
        cities: findParams.cities,
      });
    }

    const statusResults = await baseQuery
      .groupBy('package.status')
      .getRawMany();

    return statusResults;
  }

  async findAllPayments(findParams: FetchReportDto) {
    const findOptions = {
      issue_date: Between(findParams.from, findParams.to),
    };

    const allPayments = await this.paymentRepo.find({
      where: findOptions,
    });

    console.log(allPayments);

    return {
      packages_count: allPayments.length,
      fulfilled_count: allPayments.filter((p) => p.fulfilled === 1).length,
    };
  }
}
