// src/api/rdvApi.ts
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { Appointment, CreateAppointmentDto } from '../types';

// Récupère l'URL depuis .env ou utilise l'IP locale de ton Mac par défaut
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://172.20.10.4:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Intercepteur pour injecter automatiquement le token JWT de l'utilisateur
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const rdvApi = {
  // Récupérer tous les rendez-vous (gère le format { data: [...] } ou [...] direct)
  getAll: async (): Promise<Appointment[]> => {
    try {
      const response = await apiClient.get('/appointments');
      const payload = response.data;
      
      // Si l'API renvoie un objet enveloppé { data: [...] }
      if (payload && Array.isArray(payload.data)) {
        return payload.data;
      }
      // Si l'API renvoie directement le tableau
      if (Array.isArray(payload)) {
        return payload;
      }

      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous', error);
      throw error;
    }
  },

  // Récupérer un rendez-vous par son ID
  getById: async (id: string): Promise<Appointment> => {
    try {
      const response = await apiClient.get(`/appointments/${id}`);
      return response.data?.data || response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du rendez-vous ${id}`, error);
      throw error;
    }
  },

  // Créer un nouveau rendez-vous
  create: async (data: CreateAppointmentDto): Promise<Appointment> => {
    try {
      const response = await apiClient.post('/appointments', data);
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Erreur lors de la création du rendez-vous', error);
      throw error;
    }
  },

  // Annuler / Supprimer un rendez-vous
  cancel: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/appointments/${id}`);
    } catch (error) {
      console.error(`Erreur lors de l'annulation du rendez-vous ${id}`, error);
      throw error;
    }
  },
};