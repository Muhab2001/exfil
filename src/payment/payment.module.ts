import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
<<<<<<< HEAD
import { UserModule } from 'src/user/user.module';
import { PackageModule } from 'src/package/package.module';
import { EmailsModule } from 'src/emails/emails.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    UserModule,
    PackageModule,
    EmailsModule,
  ],
=======

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
