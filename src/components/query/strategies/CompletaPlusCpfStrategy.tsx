'use client';

import { motion } from 'framer-motion';
import { 
  User, 
  Search, 
  Calendar, 
  Mail,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Card, Badge } from '@/design-system/ComponentsTailwind';
import type { QueryStrategyProps, CompletaPlusCpfResult } from '@/types/query-strategies';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/glass-table";
import { InfoBox } from './components/InfoBox';
import { SummaryCard } from './components/SummaryCard';

export function CompletaPlusCpfStrategy({ data }: QueryStrategyProps<CompletaPlusCpfResult>) {
  if (!data) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Info */}
      <Card className="h-full p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg border-l-4 border-l-blue-600">
         <div className="flex flex-col gap-6">
             <div className="flex-1">
               <div className="flex items-center gap-2 mb-2">
                 <Badge variant={data.person.revenueStatus === 'REGULAR' ? 'success' : 'warning'}>
                   {data.person.revenueStatus || 'N/A'}
                 </Badge>
                 <span className="text-xs text-gray-400 font-mono">Protocolo: {data.protocol}</span>
               </div>
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-6">
                 {data.person.name}
               </h3>

               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 <InfoBox 
                   label="Documento" 
                   value={data.person.document}
                   icon={<User className="w-4 h-4 text-blue-500" />}
                 />
                 <InfoBox 
                   label="Nascimento" 
                   value={`${data.person.birthDate} (${data.person.gender})`}
                   icon={<Calendar className="w-4 h-4 text-blue-500" />}
                 />
                 {data.person.email && (
                    <InfoBox 
                      label="Email" 
                      value={data.person.email}
                      icon={<Mail className="w-4 h-4 text-blue-500" />}
                    />
                 )}
                 {data.person.motherName && (
                   <div className="lg:col-span-2">
                     <InfoBox 
                       label="Nome da Mãe" 
                       value={data.person.motherName}
                       icon={<User className="w-4 h-4 text-gray-400" />}
                     />
                   </div>
                 )}
               </div>
             </div>
         </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <SummaryCard 
          title="Dívidas Negativadas"
          value={data.totalDebts}
          subtitle={data.totalDebts > 0 ? "Constam registros" : "Nada consta"}
          color={data.totalDebts > 0 ? "red" : "green"}
          icon={<AlertTriangle className="w-5 h-5" />}
        />
        <SummaryCard 
          title="Consultas Recentes"
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.queries.map((q, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{q.date}</TableCell>
                      <TableCell>{q.entity}</TableCell>
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
