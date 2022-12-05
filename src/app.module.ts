import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PackageModule } from './package/package.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PackageModule,
    PaymentModule,
    AuthModule,
    AddressModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/database.sqlite',
      synchronize: true,
      autoLoadEntities: true,
      logging: ['error', 'schema'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
