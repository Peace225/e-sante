import { IsString, IsNotEmpty, IsISO8601 } from 'class-validator';

export class CreateAppointmentDto {
  @IsString() @IsNotEmpty() patientId: string;
  @IsString() @IsNotEmpty() doctorId: string;
  @IsISO8601() date: string;
  @IsString() motif: string;
  @IsString() etablissement: string;
}