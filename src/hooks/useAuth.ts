/**
 * useAuth Hook
 * Hook customizado para autenticação
 */

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { loginAction, registerAction, logoutAction } from '@/actions/auth.actions';
import type { LoginDTO, RegisterDTO } from '@/types';
import { toast } from 'sonner';

export function useAuth() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    login: setAuth,
    logout: clearAuth,
    updateBalance,
  } = useAuthStore();

  /**
   * Login
   */
  const login = useCallback(
    async (credentials: LoginDTO) => {
      try {
        const result = await loginAction(credentials);

        if (result.success && result.data) {
          setAuth(result.data);
          toast.success('Login realizado com sucesso!');
          router.push('/dashboard');
          return { success: true };
        }

        if (result.fieldErrors) {
          return { success: false, fieldErrors: result.fieldErrors };
        }

        toast.error(result.error || 'Erro ao fazer login');
        return { success: false, error: result.error };
      } catch (error) {
        toast.error('Erro inesperado ao fazer login');
        return { success: false, error: 'Erro inesperado' };
      }
    },
    [setAuth, router]
  );

  /**
   * Registro
   */
  const register = useCallback(
    async (userData: RegisterDTO) => {
      try {
        const result = await registerAction(userData);

        if (result.success && result.data) {
          setAuth(result.data);
          toast.success('Conta criada com sucesso!');
          router.push('/dashboard');
          return { success: true };
        }

        if (result.fieldErrors) {
          return { success: false, fieldErrors: result.fieldErrors };
        }

        toast.error(result.error || 'Erro ao criar conta');
        return { success: false, error: result.error };
      } catch (error) {
        toast.error('Erro inesperado ao criar conta');
        return { success: false, error: 'Erro inesperado' };
      }
    },
    [setAuth, router]
  );

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    try {
      await logoutAction();
      clearAuth();
      toast.success('Logout realizado com sucesso');
      router.push('/auth/login');
    } catch (error) {
      // Mesmo com erro, limpa o estado local
      clearAuth();
      router.push('/auth/login');
    }
  }, [clearAuth, router]);

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateBalance,
  };
}
