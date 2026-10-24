import { Controller, All, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
@Controller('api/appointments')
export class AppointmentsProxyController {
  constructor(private readonly http: HttpService) {}
  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    const target = `http://localhost:4002/appointments${req.url.replace('/api/appointments','') || ''}`;
    try {
      const { data, status } = await this.http.axiosRef({
        method: req.method as any,
        url: target,
        data: req.body,
        params: req.query,
      });
      return res.status(status).json(data);
    } catch (e: any) {
      return res.status(e.response?.status || 500).json(e.response?.data || { message: 'appointment-service down' });
    }
  }
}
