
'use client';

import { motion } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  Building2, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  DollarSign, 
  Clock,
  Briefcase,
  AlertTriangle,
  Download
} from 'lucide-react';
import { Card, Badge, Button } from '@/design-system/ComponentsTailwind';
import type { QueryStrategyProps, ScrBacenResult } from '@/types/query-strategies';
import { cn } from '@/lib/utils';

export function ScrBacenStrategy({ data }: QueryStrategyProps<ScrBacenResult>) {
  if (!data) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="grid md:grid-cols-12 gap-6">
        {/* Score Card */}
        <div className="md:col-span-4">
          <Card className="h-full relative overflow-hidden border-2 border-blue-100 dark:border-blue-900 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col items-center justify-center py-8">
              <div className="relative mb-4">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * data.score.value) / 1000}
                    className={cn(
                      "transition-all duration-1000 ease-out",
                      data.score.value > 700 ? "text-green-500" :
                      data.score.value > 400 ? "text-yellow-500" : "text-red-500"
                    )}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {data.score.value}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">SCORE</span>
                </div>
              </div>
              
              <Badge 
                variant={data.score.value > 700 ? "success" : data.score.value > 400 ? "warning" : "error"}
              >
                {data.score.band}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Info Card */}
        <div className="md:col-span-8">
          <Card className="h-full p-6 bg-white dark:bg-gray-900">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Dados da Consulta
                </h3>
                <p className="text-gray-500 text-sm mt-1">Documento: {data.document}</p>
              </div>
              {data.pdfUrl && (
                <Button 
                   onClick={() => window.open(data.pdfUrl, '_blank')}
                   className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  PDF Original
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <InfoBox 
                label="Tipo" 
                value={data.documentType} 
                icon={<Briefcase className="w-4 h-4 text-purple-500" />} 
              />
              <InfoBox 
                label="Data Base" 
                value={data.databaseDate} 
                icon={<Calendar className="w-4 h-4 text-orange-500" />} 
              />
              <InfoBox 
                label="Início Relac." 
                value={data.relationshipStartDate} 
                icon={<Clock className="w-4 h-4 text-blue-500" />} 
              />
              <InfoBox 
                label="Instituições" 
                value={data.institutionsCount.toString()} 
                icon={<Building2 className="w-4 h-4 text-gray-500" />} 
              />
            </div>

            {data.hasRestrictions && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 rounded-lg flex items-center gap-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-100">Restrições Encontradas</p>
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    Total Restritivo: <strong>{formatCurrency(data.totalRestrictiveValue)}</strong>
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Credit Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard 
          title="A Vencer"
          value={data.creditSummary.creditToExpire.value}
          percentage={data.creditSummary.creditToExpire.percentage}
          color="blue"
          icon={<Clock className="w-5 h-5" />}
        />
        <SummaryCard 
          title="Vencido"
          value={data.creditSummary.expiredCredit.value}
          percentage={data.creditSummary.expiredCredit.percentage}
          color="red"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
        <SummaryCard 
          title="Limite"
          value={data.creditSummary.creditLimit.value}
          percentage={data.creditSummary.creditLimit.percentage}
          color="green"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <SummaryCard 
          title="Prejuízo"
          value={data.creditSummary.loss.value}
          percentage={data.creditSummary.loss.percentage}
          color="gray"
          icon={<TrendingDown className="w-5 h-5" />}
        />
      </div>

      {/* Operations Details */}
      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            Detalhamento de Operações
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {data.operations.map((op, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="info">{op.modalityDescription}</Badge>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-sm font-medium text-gray-700">{op.subModalityDescription}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(op.totalValue)}
                    <span className="text-sm font-normal text-gray-500 ml-2">({op.percentage}%)</span>
                  </div>
                </div>
              </div>

              {/* Maturities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {op.maturities.map((mat, mIdx) => (
                  <div 
                    key={mIdx}
                    className={cn(
                      "p-3 rounded-lg border text-sm",
                      mat.isRestrictive 
                        ? "bg-red-50 border-red-100 text-red-700" 
                        : "bg-gray-50 border-gray-100 text-gray-600"
                    )}
                  >
                    <p className="font-medium text-xs mb-1 opacity-80">{mat.description}</p>
                    <p className="font-bold text-base">
                      {formatCurrency(mat.value)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function InfoBox({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs font-medium text-gray-500 uppercase">{label}</span>
      </div>
      <p className="font-semibold text-gray-900 dark:text-white break-words">{value}</p>
    </div>
  );
}

function SummaryCard({ title, value, percentage, color, icon }: { 
  title: string, value: number, percentage: number, color: 'blue'|'red'|'green'|'gray', icon: React.ReactNode 
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    red: "bg-red-50 text-red-700 border-red-100",
    green: "bg-green-50 text-green-700 border-green-100",
    gray: "bg-gray-50 text-gray-700 border-gray-100",
  };

  const textColors = {
    blue: "text-blue-600",
    red: "text-red-600",
    green: "text-green-600",
    gray: "text-gray-600",
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <Card className={cn("p-4 border", colors[color])}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-sm opacity-80">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold">
        {formatCurrency(value)}
      </div>
      <div className="text-xs mt-1 font-medium opacity-70">
        {percentage}% do total
      </div>
    </Card>
  );
}
