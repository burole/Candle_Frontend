'use client';

import { useState, useEffect } from 'react';
import { Search, FileText, CheckCircle, XCircle, Eye, Download, X } from 'lucide-react';
import Link from 'next/link';
import { useCreditQuery } from '@/hooks/useCreditQuery';
import { CreditReportDisplay } from '@/components/credit/CreditReportDisplay';
import { Card, Button, Badge } from '@/components/candle';
import type { QueryHistoryEntry } from '@/types/credit';

export default function HistoricoPage() {
  const { getQueryHistory, isLoading } = useCreditQuery();
  const [queries, setQueries] = useState<QueryHistoryEntry[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<QueryHistoryEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load query history
  const loadQueries = async () => {
    const result = await getQueryHistory(1, 50);
    if (result.success && result.data) {
      setQueries(result.data.queries);
    }
  };

  useEffect(() => {
    loadQueries();
  }, []);

  const handleViewQuery = (query: QueryHistoryEntry) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold gradient-text">
          Histórico de Consultas
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass p-6 border border-white/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Consultas</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {queries.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass p-6 border border-white/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Limpo</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {queries.filter((q) => q.status === 'CLEAR').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass p-6 border border-white/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Restrito</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {queries.filter((q) => q.status === 'RESTRICTED').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Queries Table */}
      <Card className="glass p-6 border border-white/40">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-semibold text-gray-900">
            Consultas Realizadas
          </h3>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 mt-4">Carregando histórico...</p>
          </div>
        ) : queries.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">Nenhuma consulta encontrada</p>
            <p className="text-sm mt-1">
              Suas consultas aparecerão aqui
            </p>
            <Link
              href="/credito"
              className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Fazer uma consulta
            </Link>
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
                    Documento
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Protocolo
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Custo
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {queries.map((query) => (
                  <tr
                    key={query.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {new Date(query.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-gray-900">
                        {query.queryType.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-mono text-gray-900">
                      {query.document}
                    </td>
                    <td className="py-4 px-4 text-sm font-mono text-gray-600">
                      {query.protocol}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={query.status === 'CLEAR' ? 'success' : 'error'}
                        size="sm"
                      >
                        {query.status === 'CLEAR' ? 'Limpo' : 'Restrito'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-gray-900">
                      R$ {query.cost.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {query.reportData && (
                          <button
                            onClick={() => handleViewQuery(query)}
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Ver relatório"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                          title="Download PDF"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* View Report Modal */}
      {isModalOpen && selectedQuery && selectedQuery.reportData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="glass-strong w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/40 rounded-2xl">
            <div className="sticky top-0 bg-white/90 backdrop-blur-sm p-6 border-b border-gray-200 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-display font-bold gradient-text">
                  Relatório de Crédito
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Protocolo: {selectedQuery.protocol}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <CreditReportDisplay report={selectedQuery.reportData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
