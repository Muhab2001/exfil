import { Injectable } from '@nestjs/common';
import { PackageService } from '../package.service';
import { FetchReportDto } from '../dto/fetch-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from '../entities/package.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Package)
    private packageRepo: Repository<Package>,
  ) {}

  async findPackageStats(findParams: FetchReportDto) {
    // group by category
    let baseQuery = this.packageRepo
      .createQueryBuilder('package')
      .select('package.category', 'COUNT(*)')
      .where('package.entry_timestamp >= :from', { from: findParams.from })
      .andWhere('pacakge.entry_timestamp < :to', { to: findParams.to });

    if (findParams.location_ids) {
      baseQuery = baseQuery.andWhere('current_location IN (:...id)', {
        id: findParams.location_ids,
      });
    }
    const categoryResults = await baseQuery
      .groupBy('package.category')
      .getRawMany();
    const statusResults = await baseQuery
      .groupBy('package.status')
      .getRawMany();

    return {
      categories: categoryResults,
      statuses: statusResults,
    };
  }
}
