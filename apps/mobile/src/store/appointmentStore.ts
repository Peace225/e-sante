// src/store/appointmentStore.ts
import { create } from 'zustand';
import { Appointment, CreateAppointmentDto } from '../types';
import { appointmentsApi } from '../api/appointments';

interface AppointmentState {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchAppointments: () => Promise<void>;
  createAppointment: (data: CreateAppointmentDto) => Promise<boolean>;
  selectAppointment: (id: string) => void;
  clearError: () => void;
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: [],
  selectedAppointment: null,
  loading: false,
  error: null,

  // Récupérer la liste des rendez-vous depuis l'API
  fetchAppointments: async () => {
    set({ loading: true, error: null });
    try {
      const data = await appointmentsApi.getAll();
      set({ appointments: data, loading: false });
    } catch (error: any) {
      console.error('Erreur lors du chargement des rendez-vous', error);
      set({ 
        error: error.message || 'Impossible de récupérer les rendez-vous', 
        loading: false 
      });
    }
  },

  // Créer un nouveau rendez-vous et mettre à jour la liste locale
  createAppointment: async (data: CreateAppointmentDto): Promise<boolean> => {
    set({ loading: true, error: null });
    try {
      const newAppointment = await appointmentsApi.create(data);
      set((state) => ({
        appointments: [newAppointment, ...state.appointments],
        loading: false,
      }));
      return true;
    } catch (error: any) {
      console.error('Erreur lors de la création du rendez-vous', error);
      set({ 
        error: error.message || 'Impossible de créer le rendez-vous', 
        loading: false 
      });
      return false;
    }
  },

  // Sélectionner un rendez-vous spécifique pour les écrans de détail
  selectAppointment: (id: string) => {
    const found = get().appointments.find((item) => item.id === id) || null;
    set({ selectedAppointment: found });
  },

  // Réinitialiser les erreurs
  clearError: () => set({ error: null }),
}));