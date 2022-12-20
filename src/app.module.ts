import { CacheModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PackageModule } from './package/package.module';
import { PaymentModule } from './payment/payment.module';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GeoAddress } from './package/entities/address.entity';
import { LoggerMiddleware } from './logger.middleware';
import { DataSource } from 'typeorm';
=======

import { AddressModule } from './address/address.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a

@Module({
  imports: [
    UserModule,
    PackageModule,
    CacheModule.register({
      isGlobal: true,
    }),
    PaymentModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/database.sqlite',
      synchronize: true,
      autoLoadEntities: true,
<<<<<<< HEAD
      logging: ['error', 'schema', 'query'],
      subscribers: ['dist/**/**/**/*.subscriber{.ts,.js}'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
=======
      logging: ['error', 'schema'],
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    // dataSource.synchronize();
  }
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
