'use client';

import {
  CheckCircle,
  XCircle,
  User,
  TrendingDown,
  FileText,
  Eye,
  AlertTriangle,
} from 'lucide-react';
import { Card, Badge } from '@/components/candle';
import type {
  CreditReportResponse,
  PremiumCreditReportResponse,
  CorporateCreditReportResponse,
} from '@/types/credit';

interface CreditReportDisplayProps {
  report: CreditReportResponse | PremiumCreditReportResponse | CorporateCreditReportResponse;
}

// Type guards
function isPremiumReport(
  report: CreditReportResponse | PremiumCreditReportResponse | CorporateCreditReportResponse
): report is PremiumCreditReportResponse {
  return 'cadin' in report && 'ccf' in report && !('contumacia' in report);
}

function isCorporateReport(
  report: CreditReportResponse | PremiumCreditReportResponse | CorporateCreditReportResponse
): report is CorporateCreditReportResponse {
  return 'cadin' in report && 'ccf' in report && 'contumacia' in report;
}

export function CreditReportDisplay({ report }: CreditReportDisplayProps) {
  const isRestricted = report.status === 'RESTRICTED';

  return (
    <div className="space-y-6">
      {/* Header - Status */}
      <Card className="glass p-6 border border-white/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-2">Status de Crédito</p>
            <div className="flex items-center gap-3">
              {isRestricted ? (
                <>
                  <XCircle className="h-8 w-8 text-red-500" />
                  <span className="text-2xl font-display font-bold text-red-600">
                    RESTRITO
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <span className="text-2xl font-display font-bold text-green-600">
                    LIMPO
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Protocolo</p>
            <p className="text-lg font-mono font-semibold text-gray-900">
              {report.protocol}
            </p>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      {report.person && (
        <Card className="glass p-6 border border-white/40">
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            Informações Pessoais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nome</p>
              <p className="font-semibold text-gray-900">{report.person.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Documento</p>
              <p className="font-mono font-semibold text-gray-900">
                {report.person.document || 'N/A'}
              </p>
            </div>
            {report.person.birthDate && (
              <div>
                <p className="text-sm text-gray-600">Data de Nascimento</p>
                <p className="font-semibold text-gray-900">
                  {new Date(report.person.birthDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">{report.person.email || 'N/A'}</p>
            </div>
            {report.person.motherName && (
              <div>
                <p className="text-sm text-gray-600">Nome da Mãe</p>
                <p className="font-semibold text-gray-900">{report.person.motherName}</p>
              </div>
            )}
            {report.person.mainEconomicActivity && (
              <div>
                <p className="text-sm text-gray-600">Atividade Econômica</p>
                <p className="font-semibold text-gray-900">
                  {report.person.mainEconomicActivity}
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Financial Summary */}
      {report.financialSummary && (
        <Card className="glass p-6 border border-white/40">
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
            Resumo Financeiro
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">
                {report.financialSummary.totalDebts ?? 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Débitos</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">
                {report.financialSummary.totalProtests ?? 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Protestos</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {report.financialSummary.totalQueries ?? 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Consultas</p>
            </div>
            {isPremiumReport(report) || isCorporateReport(report) ? (
              <>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {report.financialSummary.totalCadin ?? 0}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">CADIN</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {report.financialSummary.totalCcf ?? 0}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">CCF</p>
                </div>
              </>
            ) : null}
            {isCorporateReport(report) && (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-pink-600">
                  {report.financialSummary.totalContumacia ?? 0}
                </p>
                <p className="text-sm text-gray-600 mt-1">Contumácia</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Debts */}
      {report.debts && report.debts.length > 0 && (
        <Card className="glass p-6 border border-white/40">
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            Débitos ({report.debts.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Valor
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Origem
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Contrato
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Vencimento
                  </th>
                </tr>
              </thead>
              <tbody>
                {report.debts.map((debt, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-semibold text-red-600">
                      {debt.value}
                    </td>
                    <td className="py-3 px-4 text-gray-900">{debt.origin}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono text-sm">
                      {debt.contract}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{debt.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Protests */}
      {report.protests && report.protests.length > 0 && (
        <Card className="glass p-6 border border-white/40">
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Protestos ({report.protests.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Valor
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Cartório
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody>
                {report.protests.map((protest, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-semibold text-orange-600">
                      {protest.value}
                    </td>
                    <td className="py-3 px-4 text-gray-900">{protest.notary}</td>
                    <td className="py-3 px-4 text-gray-600">{protest.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* CADIN - Premium/Corporate */}
      {(isPremiumReport(report) || isCorporateReport(report)) &&
        report.cadin && report.cadin.length > 0 && (
          <Card className="glass p-6 border border-white/40">
            <h3 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-500" />
              CADIN - Cadastro de Inadimplentes ({report.cadin.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Entidade
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Valor
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {report.cadin.map((entry, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-900">{entry.literal}</td>
                      <td className="py-3 px-4 font-semibold text-purple-600">
                        {entry.value}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{entry.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

      {/* CCF - Premium/Corporate */}
      {(isPremiumReport(report) || isCorporateReport(report)) &&
        report.ccf && report.ccf.length > 0 && (
          <Card className="glass p-6 border border-white/40">
            <h3 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-yellow-500" />
              CCF - Cheques sem Fundo ({report.ccf.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Quantidade
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Origem
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {report.ccf.map((entry, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-semibold text-yellow-600">
                        {entry.quantity}
                      </td>
                      <td className="py-3 px-4 text-gray-900">{entry.origin}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {entry.date || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

      {/* Contumacia - Corporate only */}
      {isCorporateReport(report) && report.contumacia && report.contumacia.length > 0 && (
        <Card className="glass p-6 border border-white/40">
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-pink-500" />
            Contumácia ({report.contumacia.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Motivo
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Órgão
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody>
                {report.contumacia.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-900">{entry.reason}</td>
                    <td className="py-3 px-4 text-gray-600">{entry.agency}</td>
                    <td className="py-3 px-4 text-gray-600">{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Queries */}
      {report.queries && report.queries.length > 0 && (
        <Card className="glass p-6 border border-white/40">
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-500" />
            Histórico de Consultas ({report.queries.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Data
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Entidade
                  </th>
                </tr>
              </thead>
              <tbody>
                {report.queries.map((query, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-600">{query.date}</td>
                    <td className="py-3 px-4 text-gray-900">{query.entity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
