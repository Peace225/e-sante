import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class ApiGatewayService {
  constructor(private readonly httpService: HttpService) {}
  async forwardToAppointmentService(data: any) {
    const { data: result } = await firstValueFrom(
      this.httpService.post('http://localhost:4002/appointments', data)
    );
    console.log('📡 [GATEWAY 4000] -> [4002] RDV forward OK:', result.id);
    return result;
  }
  async getAppointments() {
    const { data } = await firstValueFrom(
      this.httpService.get('http://localhost:4002/appointments')
    );
    return data;
  }
}
