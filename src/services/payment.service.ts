/**
 * Payment Service
 * Serviço de pagamentos e recargas - comunicação com backend
 */

import httpClient from '@/lib/api/httpClient';
import type {
  RechargeRequest,
  RechargeResponse,
  Transaction,
  PaymentStatusResponse,
} from '@/types/payment';

export class PaymentService {
  /**
   * Criar recarga
   */
  static async createRecharge(data: RechargeRequest): Promise<RechargeResponse> {
    const response = await httpClient.post<RechargeResponse>('/payments/recharge', data);
    return response.data;
  }

  /**
   * Buscar extrato de transações
   */
  static async getTransactions(
    page = 1,
    limit = 20
  ): Promise<{ transactions: Transaction[]; total: number; pages: number }> {
    const response = await httpClient.get<{
      transactions: Transaction[];
      total: number;
      pages: number;
    }>('/transactions', {
      params: { page, limit },
    });
    return response.data;
  }

  /**
   * Buscar detalhes de uma transação
   */
  static async getTransactionById(id: string): Promise<Transaction> {
    const response = await httpClient.get<Transaction>(`/transactions/${id}`);
    return response.data;
  }

  /**
   * Verificar status de pagamento
   */
  static async checkPaymentStatus(paymentId: string): Promise<PaymentStatusResponse> {
    const response = await httpClient.get<PaymentStatusResponse>(
      `/payments/${paymentId}/status`
    );
    return response.data;
  }

  /**
   * Cancelar pagamento pendente
   */
  static async cancelPayment(paymentId: string): Promise<void> {
    await httpClient.post(`/payments/${paymentId}/cancel`);
  }

  /**
   * Buscar saldo do usuário
   */
  static async getBalance(): Promise<{ balance: number }> {
    const response = await httpClient.get<{ balance: number }>('/users/me/balance');
    return response.data;
  }
}
