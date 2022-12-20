import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose', 'debug'],
  });
<<<<<<< HEAD
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
=======
  app.useGlobalPipes(new ValidationPipe());
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
  await app.listen(3000);
}
bootstrap();
