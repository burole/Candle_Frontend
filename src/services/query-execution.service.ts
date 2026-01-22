/**
 * Query Execution Service
 * Serviço para executar consultas e buscar histórico
 */

import { serverHttpClient } from '@/lib/api/serverHttpClient';
import type {
  ExecuteQueryRequest,
  ExecuteQueryResponse,
  QueryHistoryResponse,
  QueryHistoryEntry,
} from '@/types/query';

export class QueryExecutionService {
  /**
   * Executar uma consulta
   */
  static async executeQuery(data: ExecuteQueryRequest): Promise<ExecuteQueryResponse> {
    const response = await serverHttpClient.post<ExecuteQueryResponse>('/queries/execute', data);
    return response.data;
  }

  /**
   * Buscar histórico de consultas
   */
  static async getQueryHistory(page = 1, limit = 20): Promise<QueryHistoryResponse> {
    const response = await serverHttpClient.get<QueryHistoryResponse>('/queries', {
      params: { page, limit },
    });
    return response.data;
  }

  /**
   * Buscar consulta por ID
   */
  static async getQueryById(id: string): Promise<QueryHistoryEntry> {
    const response = await serverHttpClient.get<QueryHistoryEntry>(`/queries/${id}`);
    return response.data;
  }
}
