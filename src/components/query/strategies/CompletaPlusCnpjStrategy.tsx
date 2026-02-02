'use client';

import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  AlertTriangle,
  Search,
  CheckCircle2,
  FileWarning
} from 'lucide-react';
import { Card, Badge } from '@/design-system/ComponentsTailwind';
import type { QueryStrategyProps, CompletaPlusCnpjResult } from '@/types/query-strategies';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/glass-table";
import { ScoreGauge } from './components/ScoreGauge';
import { InfoBox } from './components/InfoBox';
import { SummaryCard } from './components/SummaryCard';

export function CompletaPlusCnpjStrategy({ data }: QueryStrategyProps<CompletaPlusCnpjResult>) {
  if (!data) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Info & Score */}
      <Card className="h-full relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg p-0">
          <div className="flex flex-col md:flex-row h-full">
            {/* Score Section (Left) */}
            <div className="md:w-1/3 bg-gray-50 dark:bg-gray-800/50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 relative">
               <ScoreGauge 
                 value={Number(data.score.value)} 
                 band={`Classe ${data.score.class}`}
                 riskText={data.score.riskText}
                 label="SCORE"
                 simpleMode
               />
            </div>

            {/* Info Section (Right) */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={data.company.status === 'ATIVA' ? 'success' : 'warning'}>
                        {data.company.status || 'N/A'}
                      </Badge>
                      <span className="text-xs text-gray-400 font-mono">Protocolo: {data.protocol}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                       {data.company.socialReason}
                    </h3>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">{data.company.fantasyName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InfoBox 
                    label="CNPJ" 
                    value={data.company.cnpj} 
                    icon={<Building2 className="w-4 h-4 text-purple-500" />} 
                  />
                  <InfoBox 
                    label="Fundação" 
                    value={data.company.foundationDate} 
                    icon={<Calendar className="w-4 h-4 text-purple-500" />} 
                  />
                  {data.company.email && (
                     <InfoBox 
                        label="Email"
                        value={data.company.email}
                        icon={<Mail className="w-4 h-4 text-blue-500" />}
                     />
                  )}
                   {data.company.phone && (
                     <InfoBox 
                        label="Telefone"
                        value={data.company.phone}
                        icon={<Phone className="w-4 h-4 text-blue-500" />}
                     />
                  )}
                </div>

                {data.company.address && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span>
                        {data.company.address.street}, {data.company.address.district}, {data.company.address.city}/{data.company.address.state} - CEP: {data.company.address.zip}
                      </span>
                    </div>
                  </div>
                )}
            </div>
          </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Dívidas"
          value={data.totalDebts}
          subtitle={data.totalDebts > 0 ? "Constam registros" : "Nada consta"}
          color={data.totalDebts > 0 ? "red" : "green"}
          icon={<AlertTriangle className="w-5 h-5" />}
        />
        <SummaryCard
          title="Protestos"
          value={data.totalProtests}
          subtitle={data.totalProtests > 0 ? "Constam registros" : "Nada consta"}
          color={data.totalProtests > 0 ? "orange" : "green"}
          icon={<FileWarning className="w-5 h-5" />}
        />
        <SummaryCard
          title="Cheques"
          value={data.totalBadChecks || 0}
          subtitle={(data.totalBadChecks || 0) > 0 ? "Constam registros" : "Nada consta"}
          color={(data.totalBadChecks || 0) > 0 ? "yellow" : "green"}
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <SummaryCard
          title="Consultas"
          value={data.totalQueries}
          subtitle="Últimos meses"
          color="blue"
          icon={<Search className="w-5 h-5" />}
        />
      </div>

      {/* Debts Table */}
      <Card className="overflow-hidden border border-gray-100 shadow-lg">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Detalhamento de Dívidas ({data.debts.length})
          </h3>
        </div>
        {data.debts.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                   <TableHead>Data</TableHead>
                   <TableHead>Origem</TableHead>
                   <TableHead>Contrato</TableHead>
                   <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.debts.map((debt, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{debt.date}</TableCell>
                    <TableCell className="font-medium">{debt.origin}</TableCell>
                    <TableCell>{debt.contract}</TableCell>
                    <TableCell className="text-right font-bold text-red-600">R$ {debt.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mb-2" />
            <p>Nenhuma dívida registrada.</p>
          </div>
        )}
      </Card>

      {/* Protests Table */}
      <Card className="overflow-hidden border border-gray-100 shadow-lg">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <FileWarning className="w-5 h-5 text-orange-500" />
            Detalhamento de Protestos ({data.protests.length})
          </h3>
        </div>
        {data.protests.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Data</TableHead>
                     <TableHead>Cartório</TableHead>
                     <TableHead>Origem</TableHead>
                     <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {data.protests.map((p, idx) => (
                    <TableRow key={idx}>
                       <TableCell>{p.date}</TableCell>
                       <TableCell className="font-medium">{p.notary}</TableCell>
                       <TableCell>{p.origin}</TableCell>
                       <TableCell className="text-right font-bold text-orange-600">R$ {p.value}</TableCell>
                    </TableRow>
                  ))}
               </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mb-2" />
            <p>Nenhum protesto registrado.</p>
          </div>
        )}
      </Card>

      {/* Queries History */}
       <Card className="overflow-hidden border border-gray-100 shadow-lg">
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-500" />
              Histórico de Consultas ({data.queries.length})
            </h3>
          </div>
          {data.queries.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                     <TableHead>Data</TableHead>
                     <TableHead>Entidade</TableHead>
                     <TableHead>Local</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.queries.map((q, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{q.date}</TableCell>
                      <TableCell>{q.entity}</TableCell>
                      <TableCell>{q.cityState}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              Nenhuma consulta recente encontrada.
            </div>
          )}
        </Card>

    </div>
  );
}
