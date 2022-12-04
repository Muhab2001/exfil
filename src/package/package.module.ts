import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { TransportEventModule } from './transport_event/transport_event.module';
import { RetailCenterModule } from './retail_center/retail_center.module';
import { LocationModule } from './location/location.module';

@Module({
  controllers: [PackageController],
  providers: [PackageService],
  imports: [TransportEventModule, RetailCenterModule, LocationModule]
})
export class PackageModule {}
