'use client';

import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  Lightbulb
} from 'lucide-react';
import { Card, Badge, StatsCard } from '@/design-system/ComponentsTailwind';
import type { QueryStrategyProps, BvsBasicaPfResult } from '@/types/query-strategies';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/glass-table";

export function BvsBasicaPfStrategy({ data }: QueryStrategyProps<BvsBasicaPfResult>) {
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
      {/* Header with Person Info & Address */}
      <motion.div variants={item}>
        <Card className="p-6 border-l-4 border-l-blue-500 bg-white shadow-lg">
           <div className="flex flex-col md:flex-row gap-6">
             {/* Person Details */}
             <div className="flex-1">
               <div className="flex items-center gap-2 mb-3">
                 <Badge variant={data.person.status === 'REGULAR' ? 'success' : 'warning'}>
                   {data.person.status}
                 </Badge>
                 <span className="text-sm text-gray-400 font-mono">Protocolo: {data.protocol}</span>
               </div>
               
               <h1 className="text-2xl font-bold text-gray-900 mb-1">{data.person.name}</h1>
               
               <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-600">
                 <div className="flex items-center gap-2">
                   <User className="w-4 h-4 text-blue-500" />
                   <div>
                     <p className="text-xs text-gray-400">Documento</p>
                     <p className="font-semibold">{data.person.document}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                   <User className="w-4 h-4 text-blue-500" />
                   <div>
                     <p className="text-xs text-gray-400">Nascimento</p>
                     <p className="font-semibold">{data.person.birthDate}</p>
                   </div>
                 </div>
               </div>

               {data.person.motherName && (
                 <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">Nome da Mãe</p>
                    <p className="text-sm font-medium text-gray-700">{data.person.motherName}</p>
                 </div>
               )}
             </div>

             {/* Address (Right Side) */}
             {data.address && (data.address.street || data.address.city) && (
                <div className="flex-none w-full md:w-1/3 min-w-[280px]">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 h-full">
                    <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wide flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Endereço
                    </h3>
                    <p className="text-gray-800 font-medium leading-relaxed">
                      {data.address.street}
                      <br />
                      {data.address.district}
                      <br />
                      {data.address.city} - {data.address.state}
                      <br />
                      <span className="text-gray-500 text-sm">CEP: {data.address.zip}</span>
                    </p>
                  </div>
                </div>
             )}
           </div>
        </Card>
      </motion.div>

      {/* Behavioral Alerts Grid */}
      {data.alerts && data.alerts.length > 0 && (
        <motion.div variants={item}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Insights e Comportamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.alerts.map((alert, idx) => (
              <Card key={idx} className="p-4 border-l-4 border-l-yellow-400">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  {alert.title}
                </p>
                <p className="font-medium text-gray-900">
                  {alert.description}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Summary Stats */}
      <motion.div variants={item} className="grid grid-cols-2 gap-4">
        <Card className="p-5">
           <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-red-100 rounded-lg text-red-600">
               <AlertTriangle className="w-5 h-5" />
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

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
               <FileWarning className="w-5 h-5" />
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
              Detalhamento de Protestos ({data.protests?.length || 0})
            </h3>
          </div>
          {data.protests && data.protests.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                     <TableHead>Data</TableHead>
                     <TableHead>Cartório/Origem</TableHead>
                     <TableHead>Tipo</TableHead>
                     <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.protests.map((protest, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{protest.date}</TableCell>
                      <TableCell className="font-medium">{protest.origin}</TableCell>
                      <TableCell>{protest.type}</TableCell>
                      <TableCell className="text-right font-bold text-orange-600">R$ {protest.value}</TableCell>
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

    </motion.div>
  );
}
