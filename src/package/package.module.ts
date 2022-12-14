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
<<<<<<< HEAD
import { ReportController } from './reports/report.controller';
import { OrderService } from './orders/order.service';
import { ReportService } from './reports/report.service';
import { OrderController } from './orders/order.controller';
import { UserModule } from 'src/user/user.module';
import { Payment } from 'src/payment/entities/payment.entity';

import { TransportEvent } from './transport_event/entities/transport_event.entity';
import { LocationService } from './location/location.service';
import { GeoAddress } from 'src/package/entities/address.entity';
import { EmailsModule } from 'src/emails/emails.module';

@Module({
  controllers: [PackageController, ReportController, OrderController],
  providers: [PackageService, OrderService, ReportService, LocationService],
  imports: [
=======
import { ReportController } from './report.controller';

@Module({
  controllers: [PackageController, ReportController],
  providers: [PackageService],
  imports: [
    TransportEventModule,
    RetailCenterModule,

>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
    TypeOrmModule.forFeature([
      DeliveryOrder,
      RetailCenter,
      Package,
<<<<<<< HEAD
      Payment,
      PackageLocation,
      TransportEvent,
      GeoAddress,
    ]),
    TransportEventModule,
    RetailCenterModule,
    UserModule,
    EmailsModule,
  ],
  exports: [PackageService, OrderService, LocationService],
=======
      PackageLocation,
    ]),
  ],
  exports: [PackageService],
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
})
export class PackageModule {}
