// src/store/ordonnanceStore.ts
import { create } from 'zustand';
import { Ordonnance } from '../types';

interface OrdonnanceState {
  ordonnances: Ordonnance[];
  selectedOrdonnance: Ordonnance | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchOrdonnances: () => Promise<void>;
  selectOrdonnance: (id: string) => void;
  clearError: () => void;
}

export const useOrdonnanceStore = create<OrdonnanceState>((set, get) => ({
  ordonnances: [],
  selectedOrdonnance: null,
  loading: false,
  error: null,

  // Récupérer la liste des ordonnances (simulation connectable à ton API backend)
  fetchOrdonnances: async () => {
    set({ loading: true, error: null });
    try {
      // TODO: Remplacer par un appel API réel (ex: const res = await apiClient.get('/ordonnances'))
      // Simulation temporaire :
      const data: Ordonnance[] = [
        {
          id: 'ORD-001',
          patientId: 'PAT-001',
          doctorId: 'DOC-001',
          medicaments: ['Paracétamol 1g', 'Amoxicilline 500mg'],
          instructions: 'Prendre 1 comprimé matin et soir pendant 5 jours.',
          qrCodeUrl: 'LIFECARE-SECURE-ORD-ORD-001-PAT001',
          createdAt: '2026-10-22',
        },
        {
          id: 'ORD-002',
          patientId: 'PAT-001',
          doctorId: 'DOC-002',
          medicaments: ['Ibuprofène 400mg'],
          instructions: 'En cas de douleur uniquement.',
          qrCodeUrl: 'LIFECARE-SECURE-ORD-ORD-002-PAT001',
          createdAt: '2026-10-15',
        },
      ];

      set({ ordonnances: data, loading: false });
    } catch (error: any) {
      console.error('Erreur lors du chargement des ordonnances', error);
      set({ 
        error: error.message || 'Impossible de récupérer les ordonnances', 
        loading: false 
      });
    }
  },

  // Sélectionner une ordonnance pour l'écran de détail & QR Code
  selectOrdonnance: (id: string) => {
    const found = get().ordonnances.find((item) => item.id === id) || null;
    set({ selectedOrdonnance: found });
  },

  // Réinitialiser les erreurs
  clearError: () => set({ error: null }),
}));