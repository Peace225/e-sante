import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setToken: (token: string, user?: User) => Promise<void>;
  setAuthData: (token: string, user: User) => Promise<void>;
  loadStoredAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const TOKEN_KEY = 'user_token';
const USER_KEY = 'user_data';

// Pour les tests seulement, pas en prod
const DEFAULT_USER: User = {
  id: 'PAT-001',
  nom: 'Kokoliko',
  prenom: 'Brad',
  email: 'contact@bradsergueikokoliko.com',
  telephone: '+2250712068137',
};

export const useAuthStore = create<AuthState>((set) => ({
  // ✅ CORRECTION 1: Démarrage déconnecté
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // On charge au démarrage

  setToken: async (token: string, user?: User) => {
    const activeUser = user || DEFAULT_USER;
    set({ token, user: activeUser, isAuthenticated: true, isLoading: false });
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(activeUser));
    } catch (error) {
      console.warn('SecureStore sauvegarde ignorée:', error);
    }
  },

  setAuthData: async (token: string, user: User) => {
    set({ token, user, isAuthenticated: true, isLoading: false });
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.warn('SecureStore sauvegarde ignorée:', error);
    }
  },

  loadStoredAuth: async () => {
    set({ isLoading: true });
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const userString = await SecureStore.getItemAsync(USER_KEY);

      if (token && userString) {
        const user: User = JSON.parse(userString);
        set({ token, user, isAuthenticated: true, isLoading: false });
      } else {
        // ✅ CORRECTION 2: Si rien en stock, on déconnecte vraiment
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      console.warn('Erreur chargement SecureStore:', error);
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },

  logout: async () => {
    // 1. Update immédiat UI
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    
    // 2. Nettoyage en arrière-plan
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
    } catch (error) {
      console.warn('Erreur nettoyage SecureStore:', error);
    }
  },
}));
