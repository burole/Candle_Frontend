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
import { Card, Badge, StatsCard } from '@/design-system/ComponentsTailwind';
import type { QueryStrategyProps, CompletaPlusCnpjResult } from '@/types/query-strategies';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/glass-table";

export function CompletaPlusCnpjStrategy({ data }: QueryStrategyProps<CompletaPlusCnpjResult>) {
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
        <Card className="p-6 border-l-4 border-l-purple-600 bg-white shadow-lg">
           <div className="flex flex-col md:flex-row justify-between gap-4">
             <div className="flex-1">
               <div className="flex items-center gap-2 mb-2">
                 <Badge variant={data.company.status === 'ATIVA' ? 'success' : 'warning'}>
                   {data.company.status || 'N/A'}
                 </Badge>
                 <span className="text-sm text-gray-400 font-mono">Protocolo: {data.protocol}</span>
               </div>
               <h1 className="text-2xl font-bold text-gray-900">{data.company.socialReason}</h1>
               <p className="text-lg text-gray-600">{data.company.fantasyName}</p>
               
               <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                 <span className="flex items-center gap-1">
                   <Building2 className="w-4 h-4 text-purple-500" />
                   {data.company.cnpj}
                 </span>
                 <span className="flex items-center gap-1">
                   <Calendar className="w-4 h-4 text-purple-500" />
                   Fundação: {data.company.foundationDate}
                 </span>
               </div>

               <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                  {data.company.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4 text-purple-500" />
                      {data.company.email}
                    </span>
                  )}
                  {data.company.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4 text-purple-500" />
                      {data.company.phone}
                    </span>
                  )}
               </div>

               {data.company.address && (
                 <div className="mt-3 flex items-start gap-1 text-sm text-gray-600">
                   <MapPin className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                   <span>
                     {data.company.address.street}, {data.company.address.district}, {data.company.address.city}/{data.company.address.state} - CEP: {data.company.address.zip}
                   </span>
                 </div>
               )}
             </div>

             {/* Score Box */}
             <div className="flex-none w-full md:w-auto">
               <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center h-full min-w-[200px]">
                 <span className="text-sm font-semibold text-gray-500 mb-1">Score de Crédito</span>
                 <div className="text-4xl font-black text-gray-900 tracking-tighter">
                   {data.score.value}
                 </div>
                 <span className="mt-2 inline-flex items-center gap-1.5 rounded-full font-semibold border bg-cyan-100 text-cyan-700 border-cyan-200 text-lg px-4 py-1">
                    Classe {data.score.class}
                 </span>
                 <p className="text-xs text-center text-gray-400 mt-2 max-w-[200px]">
                   {data.score.riskText}
                 </p>
               </div>
             </div>
           </div>
        </Card>
      </motion.div>

      {/* Summary Stats */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-3">
             <div className="p-3 bg-red-100 rounded-xl text-red-600">
               <AlertTriangle className="w-6 h-6" />
             </div>
             <p className="text-sm font-medium text-gray-500">Dívidas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{data.totalDebts}</p>
            <p className={`text-xs font-semibold mt-1 ${data.totalDebts > 0 ? 'text-red-500' : 'text-green-500'}`}>
              {data.totalDebts > 0 ? "Constam registros" : "Nada consta"}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-3">
             <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
               <FileWarning className="w-6 h-6" />
             </div>
             <p className="text-sm font-medium text-gray-500">Protestos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{data.totalProtests}</p>
            <p className={`text-xs font-semibold mt-1 ${data.totalProtests > 0 ? 'text-orange-500' : 'text-green-500'}`}>
              {data.totalProtests > 0 ? "Constam registros" : "Nada consta"}
            </p>
          </div>
        </Card>

        <Card className="p-6">
           <div className="flex items-center gap-4 mb-3">
             <div className="p-3 bg-yellow-100 rounded-xl text-yellow-600">
               <CheckCircle2 className="w-6 h-6" />
             </div>
             <p className="text-sm font-medium text-gray-500">Cheques</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{data.totalBadChecks}</p>
            <p className={`text-xs font-semibold mt-1 ${data.totalBadChecks > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
              {data.totalBadChecks > 0 ? "Constam registros" : "Nada consta"}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-3">
             <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
               <Search className="w-6 h-6" />
             </div>
             <p className="text-sm font-medium text-gray-500">Consultas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{data.totalQueries}</p>
             <p className="text-xs font-semibold mt-1 text-blue-500">
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

      {/* Protests Table */}
      <motion.div variants={item}>
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
      </motion.div>
    </motion.div>
  );
}
