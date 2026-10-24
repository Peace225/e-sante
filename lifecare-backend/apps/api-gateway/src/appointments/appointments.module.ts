import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppointmentsProxyController } from './appointments.controller';
@Module({
  imports: [HttpModule],
  controllers: [AppointmentsProxyController],
})
export class AppointmentsProxyModule {}
