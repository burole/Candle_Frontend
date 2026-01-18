'use client';

import { useState, useEffect } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useUser } from '@/store/authStore';
import { usePayment } from '@/hooks/usePayment';
import { RechargeModal } from '@/components/payment/RechargeModal';
import { Card, Button, Badge } from '@/components/candle';
import type { Transaction, PaymentStatus } from '@/types/payment';

const STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; variant: 'success' | 'warning' | 'error' | 'info' }
> = {
  PENDING: { label: 'Pendente', variant: 'warning' },
  CONFIRMED: { label: 'Confirmado', variant: 'success' },
  RECEIVED: { label: 'Recebido', variant: 'success' },
  OVERDUE: { label: 'Vencido', variant: 'error' },
  REFUNDED: { label: 'Reembolsado', variant: 'info' },
};

const TRANSACTION_TYPE_LABELS = {
  RECHARGE: 'Recarga',
  QUERY: 'Consulta',
  REFUND: 'Reembolso',
};

export default function CarteirPage() {
  const user = useUser();
  const { getTransactions, refreshBalance } = usePayment();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load transactions
  const loadTransactions = async () => {
    setIsLoading(true);
    const result = await getTransactions(1, 20);
    if (result.success && result.data) {
      setTransactions(result.data.transactions);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refreshBalance(), loadTransactions()]);
    setIsRefreshing(false);
  };

  const handleRechargeSuccess = () => {
    loadTransactions();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold gradient-text">
          Minha Carteira
        </h1>
        <Button
          onClick={handleRefresh}
          variant="outline"
          className="gap-2"
          isLoading={isRefreshing}
        >
          <RefreshCw className="h-4 w-4" />
          Atualizar
        </Button>
      </div>

      {/* Balance Card */}
      <Card className="glass p-8 border border-white/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-2">Saldo Disponível</p>
            <h2 className="text-4xl font-display font-bold gradient-text">
              R$ {user?.balance.toFixed(2) || '0,00'}
            </h2>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setIsRechargeModalOpen(true)}
              variant="primary"
              className="gap-2"
            >
              <Plus className="h-5 w-5" />
              Recarregar
            </Button>
          </div>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card className="glass p-6 border border-white/40">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-semibold text-gray-900">
            Extrato
          </h3>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 mt-4">Carregando transações...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Wallet className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">Nenhuma transação encontrada</p>
            <p className="text-sm mt-1">
              Suas transações aparecerão aqui
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Data
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Tipo
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Descrição
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => {
                  const isPositive =
                    transaction.type === 'RECHARGE' ||
                    transaction.type === 'REFUND';
                  const statusConfig = STATUS_CONFIG[transaction.status];

                  return (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(transaction.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {isPositive ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className="text-sm font-medium text-gray-900">
                            {TRANSACTION_TYPE_LABELS[transaction.type]}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {transaction.description}
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          variant={statusConfig.variant}
                          size="sm"
                        >
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span
                          className={`font-semibold ${
                            isPositive ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {isPositive ? '+' : '-'} R${' '}
                          {transaction.amount.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Recharge Modal */}
      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        onSuccess={handleRechargeSuccess}
      />
    </div>
  );
}
