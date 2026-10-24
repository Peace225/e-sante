import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    return this.prisma.appointment.create({
      data: {
        patientId: dto.patientId,
        doctorId: dto.doctorId,
        dateTime: new Date(dto.dateTime || dto.date),
        reason: dto.reason || dto.motif,
        etablissement: dto.etablissement || 'PISAM Cocody',
        status: 'CONFIRME',
      },
    });
  }

  async findAll() {
    return this.prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.appointment.findUnique({ where: { id } });
  }
}