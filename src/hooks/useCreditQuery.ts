/**
 * useCreditQuery Hook
 * Hook customizado para consultas de crédito
 */

import { useCallback, useState } from 'react';
import {
  assessCreditCpfAction,
  assessPremiumAction,
  assessCorporateAction,
  createQueryAction,
  getQueryHistoryAction,
  getQueryByIdAction,
  getQueryByProtocolAction,
} from '@/actions/query.actions';
import type { CreateQueryRequest, CreateQueryResponse } from '@/types/credit';
import { toast } from 'sonner';

export function useCreditQuery() {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Executar consulta de CPF (Standard)
   */
  const assessCreditCpf = useCallback(async (cpf: string) => {
    setIsLoading(true);
    try {
      const result = await assessCreditCpfAction(cpf);

      if (result.success && result.data) {
        toast.success('Consulta realizada com sucesso!');
        return { success: true, data: result.data };
      }

      if (result.fieldErrors) {
        return { success: false, fieldErrors: result.fieldErrors };
      }

      toast.error(result.error || 'Erro ao realizar consulta');
      return { success: false, error: result.error };
    } catch (error) {
      toast.error('Erro inesperado ao realizar consulta');
      return { success: false, error: 'Erro inesperado' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Executar consulta Premium
   */
  const assessPremium = useCallback(async (document: string) => {
    setIsLoading(true);
    try {
      const result = await assessPremiumAction(document);

      if (result.success && result.data) {
        toast.success('Consulta Premium realizada com sucesso!');
        return { success: true, data: result.data };
      }

      if (result.fieldErrors) {
        return { success: false, fieldErrors: result.fieldErrors };
      }

      toast.error(result.error || 'Erro ao realizar consulta');
      return { success: false, error: result.error };
    } catch (error) {
      toast.error('Erro inesperado ao realizar consulta');
      return { success: false, error: 'Erro inesperado' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Executar consulta Corporate
   */
  const assessCorporate = useCallback(async (cnpj: string) => {
    setIsLoading(true);
    try {
      const result = await assessCorporateAction(cnpj);

      if (result.success && result.data) {
        toast.success('Consulta Corporativa realizada com sucesso!');
        return { success: true, data: result.data };
      }

      if (result.fieldErrors) {
        return { success: false, fieldErrors: result.fieldErrors };
      }

      toast.error(result.error || 'Erro ao realizar consulta');
      return { success: false, error: result.error };
    } catch (error) {
      toast.error('Erro inesperado ao realizar consulta');
      return { success: false, error: 'Erro inesperado' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Criar consulta genérica
   */
  const createQuery = useCallback(async (data: CreateQueryRequest) => {
    setIsLoading(true);
    try {
      const result = await createQueryAction(data);

      if (result.success && result.data) {
        toast.success('Consulta realizada com sucesso!');
        return { success: true, data: result.data };
      }

      if (result.fieldErrors) {
        return { success: false, fieldErrors: result.fieldErrors };
      }

      toast.error(result.error || 'Erro ao realizar consulta');
      return { success: false, error: result.error };
    } catch (error) {
      toast.error('Erro inesperado ao realizar consulta');
      return { success: false, error: 'Erro inesperado' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Buscar histórico de consultas
   */
  const getQueryHistory = useCallback(async (page = 1, limit = 20) => {
    setIsLoading(true);
    try {
      const result = await getQueryHistoryAction(page, limit);

      if (result.success && result.data) {
        return { success: true, data: result.data };
      }

      toast.error(result.error || 'Erro ao buscar histórico');
      return { success: false, error: result.error };
    } catch (error) {
      toast.error('Erro inesperado ao buscar histórico');
      return { success: false, error: 'Erro inesperado' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Buscar consulta por ID
   */
  const getQueryById = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const result = await getQueryByIdAction(id);

      if (result.success && result.data) {
        return { success: true, data: result.data };
      }

      toast.error(result.error || 'Erro ao buscar consulta');
      return { success: false, error: result.error };
    } catch (error) {
      toast.error('Erro inesperado ao buscar consulta');
      return { success: false, error: 'Erro inesperado' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Buscar consulta por protocolo
   */
  const getQueryByProtocol = useCallback(async (protocol: string) => {
    setIsLoading(true);
    try {
      const result = await getQueryByProtocolAction(protocol);

      if (result.success && result.data) {
        return { success: true, data: result.data };
      }

      toast.error(result.error || 'Erro ao buscar consulta');
      return { success: false, error: result.error };
    } catch (error) {
      toast.error('Erro inesperado ao buscar consulta');
      return { success: false, error: 'Erro inesperado' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    assessCreditCpf,
    assessPremium,
    assessCorporate,
    createQuery,
    getQueryHistory,
    getQueryById,
    getQueryByProtocol,
  };
}
