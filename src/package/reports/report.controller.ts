import { Controller, Get, Query } from '@nestjs/common';
import { throwIfEmpty } from 'rxjs';
import { FetchReportDto } from '../dto/fetch-report.dto';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportsService: ReportService) {}

  @Get()
  async getReports(@Query() fetchReportDto: FetchReportDto) {
    const categories = await this.reportsService.findPackageCategories(
      fetchReportDto,
    );
    const statuses = await this.reportsService.findPackageStatuses(
      fetchReportDto,
    );
    const { fulfilled_count, packages_count } =
      await this.reportsService.findAllPayments(fetchReportDto);
    return {
      categories: categories,
      statuses: statuses,
      confirmed_payments: fulfilled_count,
      packages_count: packages_count,
    };
  }
}
