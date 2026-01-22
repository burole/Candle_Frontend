/**
 * Query Service
 * Serviço de consultas de crédito - comunicação com backend
 */

import { serverHttpClient } from '@/lib/api/serverHttpClient';
import type {
  CreateQueryRequest,
  CreateQueryResponse,
  QueryHistoryEntry,
  CreditReportResponse,
  PremiumCreditReportResponse,
  CorporateCreditReportResponse,
} from '@/types/credit';

export class QueryService {
  /**
   * Executar consulta de crédito CPF (Standard)
   */
  static async assessCreditCpf(cpf: string): Promise<CreateQueryResponse> {
    const response = await serverHttpClient.post<CreateQueryResponse>('/queries/assess-cpf', {
      queryType: 'CPF_CREDIT',
      document: cpf,
    });
    return response.data;
  }

  /**
   * Executar consulta Premium (CPF ou CNPJ)
   */
  static async assessPremium(document: string): Promise<CreateQueryResponse> {
    const response = await serverHttpClient.post<CreateQueryResponse>('/queries/assess-premium', {
      queryType: 'PREMIUM_CREDIT',
      document,
    });
    return response.data;
  }

  /**
   * Executar consulta Corporate (CNPJ)
   */
  static async assessCorporate(cnpj: string): Promise<CreateQueryResponse> {
    const response = await serverHttpClient.post<CreateQueryResponse>('/queries/assess-corporate', {
      queryType: 'CORPORATE_CREDIT',
      document: cnpj,
    });
    return response.data;
  }

  /**
   * Executar consulta genérica
   */
  static async createQuery(data: CreateQueryRequest): Promise<CreateQueryResponse> {
    const response = await serverHttpClient.post<CreateQueryResponse>('/queries', data);
    return response.data;
  }

  /**
   * Buscar histórico de consultas
   */
  static async getQueryHistory(
    page = 1,
    limit = 20
  ): Promise<{ queries: QueryHistoryEntry[]; total: number; pages: number }> {
    const response = await serverHttpClient.get<{
      queries: QueryHistoryEntry[];
      total: number;
      pages: number;
    }>('/queries/history', {
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

  /**
   * Buscar consulta por protocolo
   */
  static async getQueryByProtocol(protocol: string): Promise<QueryHistoryEntry> {
    const response = await serverHttpClient.get<QueryHistoryEntry>(`/queries/protocol/${protocol}`);
    return response.data;
  }

  /**
   * Download de relatório em PDF
   */
  static async downloadReportPdf(queryId: string): Promise<Blob> {
    const response = await serverHttpClient.get(`/queries/${queryId}/pdf`, {
      responseType: 'blob',
    });
    return response.data;
  }
}
