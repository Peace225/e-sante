// src/api/appointments.ts
import { apiClient } from './client';
import { Appointment, CreateAppointmentDto } from '../types';

export const appointmentsApi = {
  // Récupérer la liste de tous les rendez-vous
  getAll: async (): Promise<Appointment[]> => {
    const response = await apiClient.get('/appointments');
    return response.data.data || response.data;
  },

  // Créer un nouveau rendez-vous (envoi direct avec 'date' et 'motif')
  create: async (data: CreateAppointmentDto): Promise<Appointment> => {
    const payload = {
      patientId: data.patientId,
      doctorId: data.doctorId,
      date: data.date,
      motif: data.motif,
      etablissement: data.etablissement || 'PISAM Cocody',
    };

    const response = await apiClient.post('/appointments', payload);
    return response.data.data || response.data;
  },
};