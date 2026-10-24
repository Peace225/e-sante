import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
@Module({}) class AppModule {}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const ports: any = { auth: 4001, patient: 4002, medecin: 4003, pharma: 4004, labo: 4005, assureur: 4006, famille: 4007, gateway: 4000 };
  await app.listen(ports['auth']);
  console.log('[auth] running on :' + ports['auth']);
}
bootstrap();
