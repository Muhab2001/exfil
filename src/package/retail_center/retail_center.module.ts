import { Module } from '@nestjs/common';
import { RetailCenterService } from './retail_center.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetailCenter } from './entities/retail_center.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RetailCenter])],
  providers: [RetailCenterService],
  exports: [RetailCenterService],
})
export class RetailCenterModule {}
