'use client';

import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  AlertTriangle,
  FileWarning,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Card, Badge } from '@/design-system/ComponentsTailwind';
import type { QueryStrategyProps, BvsBasicaPfResult } from '@/types/query-strategies';
import { AlertsGrid } from './components/AlertsGrid';
import { InfoBox } from './components/InfoBox';
import { SummaryCard } from './components/SummaryCard';
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

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header with Person Info & Address */}
      <Card className="h-full p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg border-l-4 border-l-blue-500">
        <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
               <div className="flex items-center gap-2 mb-2">
                 <Badge variant={data.person.status === 'REGULAR' ? 'success' : 'warning'}>
                   {data.person.status}
                 </Badge>
                 <span className="text-xs text-gray-400 font-mono">Protocolo: {data.protocol}</span>
               </div>
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-6">
                 {data.person.name}
               </h3>

               <div className="grid grid-cols-2 gap-4">
                 <InfoBox 
                   label="Documento" 
                   value={data.person.document}
                   icon={<User className="w-4 h-4 text-blue-500" />}
                 />
                 <InfoBox 
                   label="Nascimento" 
                   value={data.person.birthDate}
                   icon={<Calendar className="w-4 h-4 text-blue-500" />}
                 />
                 {data.person.motherName && (
                   <div className="col-span-2">
                     <InfoBox 
                       label="Nome da Mãe" 
                       value={data.person.motherName}
                       icon={<User className="w-4 h-4 text-gray-400" />}
                     />
                   </div>
                 )}
               </div>
            </div>

            {/* Address (Right Side) */}
            {data.address && (data.address.street || data.address.city) && (
              <div className="flex-none w-full md:w-1/3 min-w-[280px]">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 h-full">
                  <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Endereço
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed text-sm">
                    {data.address.street}
                    <br />
                    {data.address.district}
                    <br />
                    {data.address.city} - {data.address.state}
                    <br />
                    <span className="text-gray-500 text-xs mt-1 block">CEP: {data.address.zip}</span>
                  </p>
                </div>
              </div>
            )}
        </div>
      </Card>

      {/* Behavioral Alerts Grid */}
      <AlertsGrid alerts={data.alerts || []} />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      
    </div>
  );
}
