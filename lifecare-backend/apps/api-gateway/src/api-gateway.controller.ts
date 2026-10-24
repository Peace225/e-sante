import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly service: ApiGatewayService) {}

  // Route que ton bouton Frontend va appeler
  @Post('appointments')
  createAppointment(@Body() body: any) {
    return this.service.forwardToAppointmentService(body);
  }

  @Get('appointments')
  getAppointments() {
    return this.service.getAppointments();
  }

  @Get()
  health() {
    return { status: 'Gateway OK', gateway: 4000, appointmentService: 4002 };
  }
}