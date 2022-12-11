import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { TransportEventModule } from './transport_event/transport_event.module';
import { RetailCenterModule } from './retail_center/retail_center.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryOrder } from './entities/delivery_order.entity';
import { RetailCenter } from './retail_center/entities/retail_center.entity';
import { Package } from './entities/package.entity';
import { PackageLocation } from './entities/package-location.entity';
import { ReportController } from './reports/report.controller';
import { OrderService } from './orders/order.service';
import { ReportService } from './reports/report.service';
import { ReportsGateway } from './reports/reports.gateway';
import { OrderController } from './orders/order.controller';
import { UserModule } from 'src/user/user.module';
import { Payment } from 'src/payment/entities/payment.entity';
import { Address } from 'src/address/entities/address.entity';

@Module({
  controllers: [PackageController, ReportController, OrderController],
  providers: [PackageService, OrderService, ReportService, ReportsGateway],
  imports: [
    TransportEventModule,
    RetailCenterModule,

    TypeOrmModule.forFeature([
      DeliveryOrder,
      RetailCenter,
      Package,
      Address,
      Payment,
      PackageLocation,
    ]),
    UserModule,
  ],
  exports: [PackageService, OrderService],
})
export class PackageModule {}
