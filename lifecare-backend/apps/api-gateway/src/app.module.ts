import { Module } from '@nestjs/common';
import { AppointmentsProxyModule } from './appointments/appointments.module';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
@Module({
  imports: [AppointmentsProxyModule],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class AppModule {}
