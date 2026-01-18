'use client';

import { useState } from 'react';
import {
  getAllQueryTypesAction,
  getQueryTypesByCategoryAction,
  getQueryTypeByCodeAction,
  groupByCategoryAction,
} from '@/actions/query-types.actions';
import type { QueryType, QueryCategory } from '@/types/query';
import { toast } from 'sonner';

export function useQueryTypes() {
  const [isLoading, setIsLoading] = useState(false);

  const getAllTypes = async (): Promise<QueryType[]> => {
    setIsLoading(true);
    try {
      const result = await getAllQueryTypesAction();

      if (!result.success || !result.data) {
        toast.error(result.error || 'Erro ao buscar tipos de consulta');
        return [];
      }

      return result.data;
    } catch (error) {
      console.error('Error fetching query types:', error);
      toast.error('Erro ao buscar tipos de consulta');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getByCategory = async (category: QueryCategory): Promise<QueryType[]> => {
    setIsLoading(true);
    try {
      const result = await getQueryTypesByCategoryAction(category);

      if (!result.success || !result.data) {
        toast.error(result.error || 'Erro ao buscar consultas da categoria');
        return [];
      }

      return result.data;
    } catch (error) {
      console.error('Error fetching query types by category:', error);
      toast.error('Erro ao buscar consultas da categoria');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getByCode = async (code: string): Promise<QueryType | null> => {
    setIsLoading(true);
    try {
      const result = await getQueryTypeByCodeAction(code);

      if (!result.success) {
        toast.error(result.error || 'Erro ao buscar tipo de consulta');
        return null;
      }

      return result.data || null;
    } catch (error) {
      console.error('Error fetching query type by code:', error);
      toast.error('Erro ao buscar tipo de consulta');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const groupByCategory = async (): Promise<Record<QueryCategory, QueryType[]>> => {
    setIsLoading(true);
    try {
      const result = await groupByCategoryAction();

      if (!result.success || !result.data) {
        toast.error(result.error || 'Erro ao agrupar consultas');
        return {} as Record<QueryCategory, QueryType[]>;
      }

      return result.data;
    } catch (error) {
      console.error('Error grouping query types:', error);
      toast.error('Erro ao agrupar consultas');
      return {} as Record<QueryCategory, QueryType[]>;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAllTypes,
    getByCategory,
    getByCode,
    groupByCategory,
    isLoading,
  };
}
