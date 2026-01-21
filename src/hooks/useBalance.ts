'use client';

/**
 * useBalance Hook
 * Hook para gerenciar e buscar saldo do usuário
 */

import { useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getBalanceAction } from '@/actions/balance.actions';

export function useBalance() {
  const balance = useAuthStore((state) => state.balance);
  const updateBalance = useAuthStore((state) => state.updateBalance);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  /**
   * Buscar saldo do usuário no backend
   */
  const fetchBalance = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const result = await getBalanceAction();
      if (result.success && result.data) {
        updateBalance(result.data.available);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }, [isAuthenticated, updateBalance]);

  /**
   * Formatar saldo para exibição
   */
  const formattedBalance = balance.toFixed(2).replace('.', ',');

  return {
    balance,
    formattedBalance,
    fetchBalance,
    updateBalance,
  };
}
