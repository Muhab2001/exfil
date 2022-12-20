import { Module } from '@nestjs/common';
import { RetailCenterService } from './retail_center.service';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetailCenter } from './entities/retail_center.entity';
import { GeoAddress } from 'src/package/entities/address.entity';
import { RetailCenterController } from './reatil_center.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RetailCenter, GeoAddress])],
=======
import { RetailCenterController } from './retail_center.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetailCenter } from './entities/retail_center.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RetailCenter])],
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
  controllers: [RetailCenterController],
  providers: [RetailCenterService],
  exports: [RetailCenterService],
})
export class RetailCenterModule {}
