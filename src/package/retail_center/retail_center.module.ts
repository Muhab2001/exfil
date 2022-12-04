import { Module } from '@nestjs/common';
import { RetailCenterService } from './retail_center.service';
import { RetailCenterController } from './retail_center.controller';

@Module({
  controllers: [RetailCenterController],
  providers: [RetailCenterService]
})
export class RetailCenterModule {}
