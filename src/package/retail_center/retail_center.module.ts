import { Module } from '@nestjs/common';
import { RetailCenterService } from './retail_center.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetailCenter } from './entities/retail_center.entity';
import { Address } from 'src/address/entities/address.entity';
import { RetailCenterController } from './reatil_center.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RetailCenter, Address])],
  controllers: [RetailCenterController],
  providers: [RetailCenterService],
  exports: [RetailCenterService],
})
export class RetailCenterModule {}
