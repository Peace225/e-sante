import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({ 
    origin: ['http://localhost:3000','http://localhost:3001','http://localhost:3002','http://localhost:3004'],
  });
  await app.listen(4000);
  console.log('✅ api-gateway on http://localhost:4000');
}
bootstrap();