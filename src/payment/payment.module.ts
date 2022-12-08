import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { UserModule } from 'src/user/user.module';
import { PackageModule } from 'src/package/package.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), UserModule, PackageModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
