'use client';

import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  AlertTriangle,
  FileWarning,
  CheckCircle2,
  Calendar,
  Phone
} from 'lucide-react';
import { Card, Badge } from '@/design-system/ComponentsTailwind';
import type { QueryStrategyProps, RealtimePremiumScorePfResult } from '@/types/query-strategies';
import { AlertsGrid } from './components/AlertsGrid';
import { ScoreGauge } from './components/ScoreGauge';
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

export function RealtimePremiumScorePfStrategy({ data }: QueryStrategyProps<RealtimePremiumScorePfResult>) {
  if (!data) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Score Card (Left) */}
        <div className="md:col-span-4">
          <ScoreGauge 
            value={Number(data.score.value)} 
            band={`Classe ${data.score.class}`}
            riskText={data.score.riskText}
            label="SCORE"
          />
        </div>

        {/* Person Info (Right) */}
        <div className="md:col-span-8">
          <Card className="h-full p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg">
             <div className="flex justify-between items-start mb-6">
               <div className="w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={data.person.status === 'REGULAR' ? 'success' : 'warning'}>
                      {data.person.status}
                    </Badge>
                    <span className="text-xs text-gray-400 font-mono">Protocolo: {data.protocol}</span>
                    {/* Probability Badge */}
                    <Badge variant="info" className="ml-auto">
                       Probabilidade: {data.score.probability}%
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {data.person.name}
                  </h3>
               </div>
             </div>

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
          </Card>
        </div>
      </div>

      {/* Behavioral Alerts Grid */}
      <AlertsGrid alerts={data.alerts || []} />

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
      </div>

      {/* Phones */}
       {data.phones && data.phones.length > 0 && (
         <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
             <Phone className="w-5 h-5 text-blue-500" />
             Telefones de Contato
           </h3>
           <div className="flex flex-wrap gap-3">
             {data.phones.map((phone, idx) => (
               <div key={idx} className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                 <div className="bg-white p-1.5 rounded-full shadow-sm">
                   <Phone className="w-3 h-3 text-gray-500" />
                 </div>
                 <div>
                   <p className="text-sm font-bold text-gray-900">({phone.areaCode}) {phone.number}</p>
                   <p className="text-[10px] text-gray-400 uppercase font-semibold">{phone.type}</p>
                 </div>
               </div>
             ))}
           </div>
         </Card>
      )}

      {/* Addresses */}
      {data.addresses && data.addresses.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              Endereços Encontrados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.addresses.map((address, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-gray-800 font-medium leading-relaxed">
                    {address.street}
                    <br />
                    {address.district}
                    <br />
                    {address.city} - {address.state}
                    <br />
                    <span className="text-gray-500 text-sm">CEP: {address.zip}</span>
                  </p>
                </div>
              ))}
            </div>
          </Card>
      )}

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
                   <TableHead>Notário/Origem</TableHead>
                   <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.protests.map((protest, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{protest.date}</TableCell>
                    <TableCell className="font-medium">{protest.notary || protest.origin}</TableCell>
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

      {/* Bad Checks Table */}
      <Card className="overflow-hidden border border-gray-100 shadow-lg">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-yellow-500" />
            Detalhamento de Cheques Sem Fundo ({data.badChecks?.length || 0})
          </h3>
        </div>
        {data.badChecks && data.badChecks.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                   <TableHead>Última Ocorrência</TableHead>
                   <TableHead>Banco</TableHead>
                   <TableHead className="text-right">Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.badChecks.map((check, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{check.lastOccurrence}</TableCell>
                    <TableCell className="font-medium">Banco {check.bankNumber}</TableCell>
                    <TableCell className="text-right font-bold text-yellow-600">{check.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mb-2" />
            <p>Nenhum cheque sem fundo registrado.</p>
          </div>
        )}
      </Card>
      
    </div>
  );
}
