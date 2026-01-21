/**
 * Auth Store (Zustand)
 * Gerenciamento de estado de autenticação
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, AuthResponse } from '@/types';

interface AuthStore {
  // State
  user: User | null;
  balance: number; // Saldo mantido separado do User
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  // Actions
  login: (authResponse: AuthResponse) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  updateBalance: (balance: number) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      balance: 0,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      // Login - salva usuário e tokens
      login: (authResponse: AuthResponse) => {
        set({
          user: authResponse.user || null,
          accessToken: authResponse.accessToken,
          refreshToken: authResponse.refreshToken,
          isAuthenticated: true,
        });
      },

      // Logout - limpa tudo
      logout: () => {
        set({
          user: null,
          balance: 0,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      // Atualizar dados do usuário
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      // Atualizar saldo (usado após consultas e recargas)
      updateBalance: (balance: number) => {
        set({ balance });
      },

      // Atualizar tokens (usado no refresh)
      setTokens: (accessToken: string, refreshToken: string) => {
        set({
          accessToken,
          refreshToken,
        });
      },
    }),
    {
      name: 'candle-auth-storage', // nome da chave no localStorage
      storage: createJSONStorage(() => localStorage), // usa localStorage
      partialize: (state) => ({
        // Só persiste o necessário
        user: state.user,
        balance: state.balance,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Helper hooks
export const useUser = () => useAuthStore((state) => state.user);
export const useBalance = () => useAuthStore((state) => state.balance);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAccessToken = () => useAuthStore((state) => state.accessToken);
