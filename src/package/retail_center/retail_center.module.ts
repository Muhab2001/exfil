import { Module } from '@nestjs/common';
import { RetailCenterService } from './retail_center.service';
import { RetailCenterController } from './retail_center.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetailCenter } from './entities/retail_center.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RetailCenter])],
  controllers: [RetailCenterController],
  providers: [RetailCenterService],
  exports: [RetailCenterService],
})
export class RetailCenterModule {}
