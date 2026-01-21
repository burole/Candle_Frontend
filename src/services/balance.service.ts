/**
 * Balance Service
 * Serviço para consulta de saldo do usuário
 */

import httpClient from '@/lib/api/httpClient';
import type { BalanceResponse } from '@/types';

export class BalanceService {
  /**
   * Buscar saldo do usuário autenticado
   */
  static async getBalance(): Promise<BalanceResponse> {
    const response = await httpClient.get<BalanceResponse>('/balance');
    return response.data;
  }
}
