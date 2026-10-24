import { NestFactory } from '@nestjs/core';
import { AppointmentServiceModule } from './appointment-service.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppointmentServiceModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({ origin: true });
  await app.listen(4002);
  console.log('✅ appointment-service on http://localhost:4002');
}
bootstrap();