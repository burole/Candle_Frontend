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
import { Card, Badge, StatsCard } from '@/design-system/ComponentsTailwind';
import type { QueryStrategyProps, CompletaPlusCpfResult } from '@/types/query-strategies';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/glass-table";

export function CompletaPlusCpfStrategy({ data }: QueryStrategyProps<CompletaPlusCpfResult>) {
  if (!data) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header Info */}
      <motion.div variants={item}>
        <Card className="p-6 border-l-4 border-l-blue-600 bg-white shadow-lg">
           <div className="flex flex-col md:flex-row justify-between gap-4">
             <div>
               <div className="flex items-center gap-2 mb-2">
                 <Badge variant={data.person.revenueStatus === 'REGULAR' ? 'success' : 'warning'}>
                   {data.person.revenueStatus || 'N/A'}
                 </Badge>
                 <span className="text-sm text-gray-400 font-mono">Protocolo: {data.protocol}</span>
               </div>
               <h1 className="text-2xl font-bold text-gray-900">{data.person.name}</h1>
               <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                 <span className="flex items-center gap-1">
                   <User className="w-4 h-4 text-blue-500" />
                   {data.person.document}
                 </span>
                 <span className="flex items-center gap-1">
                   <Calendar className="w-4 h-4 text-blue-500" />
                   {data.person.birthDate} ({data.person.gender})
                 </span>
                 {data.person.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4 text-blue-500" />
                      {data.person.email}
                    </span>
                 )}
               </div>
               {data.person.motherName && (
                 <p className="text-sm text-gray-500 mt-2">
                   <span className="font-semibold">Mãe:</span> {data.person.motherName}
                 </p>
               )}
             </div>
           </div>
        </Card>
      </motion.div>

      {/* Summary Stats */}
      <motion.div variants={item} className="grid grid-cols-2 gap-4">
        <Card className="p-6 flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-xl text-red-600">
             <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Dívidas Negativadas</p>
            <p className="text-2xl font-bold text-gray-900">{data.totalDebts}</p>
            <p className={`text-xs font-semibold ${data.totalDebts > 0 ? 'text-red-500' : 'text-green-500'}`}>
              {data.totalDebts > 0 ? "Constam registros" : "Nada consta"}
            </p>
          </div>
        </Card>
        
        <Card className="p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
             <Search className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Consultas Recentes</p>
            <p className="text-2xl font-bold text-gray-900">{data.totalQueries}</p>
            <p className="text-xs text-blue-500 font-semibold">
              Últimos meses
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Debts Table */}
      <motion.div variants={item}>
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
      </motion.div>

      {/* Queries History */}
      <motion.div variants={item}>
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
      </motion.div>
    </motion.div>
  );
}
