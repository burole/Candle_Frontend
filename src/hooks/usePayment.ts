/**
 * usePayment Hook
 * Hook customizado para pagamentos e recargas
 */

import { useCallback, useState } from 'react';
import {
  createRechargeAction,
  getTransactionsAction,
  checkPaymentStatusAction,
  cancelPaymentAction,
  refreshBalanceAction,
} from '@/actions/payment.actions';
import type { RechargeRequest } from '@/types/payment';
import { toast } from 'sonner';

export function usePayment() {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Criar recarga
   */
  const createRecharge = useCallback(async (data: RechargeRequest) => {
    setIsLoading(true);
    try {
      const result = await createRechargeAction(data);

      if (result.success && result.data) {
        toast.success('Recarga criada com sucesso!');
        return { success: true, data: result.data };
      }

      if (result.fieldErrors) {
        return { success: false, fieldErrors: result.fieldErrors };
      }

      toast.error(result.error || 'Erro ao criar recarga');
      return { success: false, error: result.error };
    } catch (error) {
      toast.error('Erro inesperado ao criar recarga');
      return { success: false, error: 'Erro inesperado' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Buscar transações
   */
  const getTransactions = useCallback(async (page = 1, limit = 20) => {
    setIsLoading(true);
    try {
      const result = await getTransactionsAction(page, limit);

      if (result.success && result.data) {
        return { success: true, data: result.data };
      }

      toast.error(result.error || 'Erro ao buscar transações');
      return { success: false, error: result.error };
    } catch (error) {
      toast.error('Erro inesperado ao buscar transações');
      return { success: false, error: 'Erro inesperado' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Verificar status de pagamento
   */
  const checkPaymentStatus = useCallback(async (paymentId: string) => {
    try {
      const result = await checkPaymentStatusAction(paymentId);

      if (result.success && result.data) {
        // Notificar se pagamento foi confirmado
        if (
          result.data.status === 'CONFIRMED' ||
          result.data.status === 'RECEIVED'
        ) {
          toast.success('Pagamento confirmado! Saldo atualizado.');
        }
        return { success: true, data: result.data };
      }

      return { success: false, error: result.error };
    } catch (error) {
      return { success: false, error: 'Erro ao verificar status' };
    }
  }, []);

  /**
   * Cancelar pagamento
   */
  const cancelPayment = useCallback(async (paymentId: string) => {
    setIsLoading(true);
    try {
      const result = await cancelPaymentAction(paymentId);

      if (result.success) {
        toast.success('Pagamento cancelado com sucesso');
        return { success: true };
      }

      toast.error(result.error || 'Erro ao cancelar pagamento');
      return { success: false, error: result.error };
    } catch (error) {
      toast.error('Erro inesperado ao cancelar pagamento');
      return { success: false, error: 'Erro inesperado' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Atualizar saldo
   */
  const refreshBalance = useCallback(async () => {
    try {
      const result = await refreshBalanceAction();

      if (result.success) {
        return { success: true, balance: result.data };
      }

      return { success: false, error: result.error };
    } catch (error) {
      return { success: false, error: 'Erro ao atualizar saldo' };
    }
  }, []);

  return {
    isLoading,
    createRecharge,
    getTransactions,
    checkPaymentStatus,
    cancelPayment,
    refreshBalance,
  };
}
