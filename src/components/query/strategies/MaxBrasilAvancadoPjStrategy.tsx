'use client';

import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  Lightbulb,
  Phone,
  Briefcase,
  Users
} from 'lucide-react';
import { Card, Badge, StatsCard } from '@/design-system/ComponentsTailwind';
import type { QueryStrategyProps, MaxBrasilAvancadoPjResult } from '@/types/query-strategies';

import { AlertsGrid } from './components/AlertsGrid';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/glass-table";

export function MaxBrasilAvancadoPjStrategy({ data }: QueryStrategyProps<MaxBrasilAvancadoPjResult>) {
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
      {/* Header with Company Info & Score */}
      <motion.div variants={item}>
        <Card className="p-6 border-l-4 border-l-purple-500 bg-white shadow-lg">
           <div className="flex flex-col md:flex-row gap-6">
             {/* Company Details */}
             <div className="flex-1">
               <div className="flex items-center gap-2 mb-3">
                 <Badge variant={data.company.status === 'ATIVA' ? 'success' : 'warning'}>
                   {data.company.status}
                 </Badge>
                 <span className="text-sm text-gray-400 font-mono">Protocolo: {data.protocol}</span>
               </div>
               
               <h1 className="text-2xl font-bold text-gray-900 mb-1">{data.company.socialReason}</h1>
               <p className="text-sm text-gray-500 font-medium mb-4">{data.company.fantasyName}</p>
               
               <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-600">
                 <div className="flex items-center gap-2">
                   <Building2 className="w-4 h-4 text-purple-500" />
                   <div>
                     <p className="text-xs text-gray-400">CNPJ</p>
                     <p className="font-semibold">{data.company.cnpj}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                   <Briefcase className="w-4 h-4 text-purple-500" />
                   <div>
                     <p className="text-xs text-gray-400">Fundação</p>
                     <p className="font-semibold">{data.company.foundationDate}</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Score Display (Right Side) */}
             {data.score && (
                <div className="flex-none w-full md:w-auto min-w-[240px]">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col items-center justify-center h-full relative overflow-hidden group">
                    <span className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Score</span>
                    <div className="text-5xl font-black text-gray-900 tracking-tighter mb-2">
                      {data.score.value}
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full font-bold border bg-purple-100 text-purple-700 border-purple-200 text-lg px-6 py-1">
                       Classe {data.score.class}
                    </span>
                    <p className="text-xs text-center text-gray-400 mt-4 max-w-[200px] leading-relaxed">
                      {data.score.riskText}
                    </p>
                  </div>
                </div>
             )}
           </div>
        </Card>
      </motion.div>

      {/* Partners (Socios) */}
      {data.partners && data.partners.length > 0 && (
        <motion.div variants={item}>
          <Card className="p-6 border-l-4 border-l-blue-500">
             <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Quadro Societário
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.partners.map((partner, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex items-start gap-4">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <UserIcon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{partner.name}</p>
                    <p className="text-xs text-gray-500 mt-1 font-mono">{partner.document}</p>
                    <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase tracking-wide">
                      {partner.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Behavioral Alerts Grid */}
      <AlertsGrid alerts={data.alerts} />

      {/* Summary Stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-4">
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

        <Card className="p-5">
           <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
               <CheckCircle2 className="w-5 h-5" />
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
      </motion.div>

       {/* Phones */}
       {data.phones && data.phones.length > 0 && (
        <motion.div variants={item}>
          <Card className="p-6">
             <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-purple-500" />
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
        </motion.div>
      )}

      {/* Addresses */}
      {data.addresses && data.addresses.length > 0 && (
        <motion.div variants={item}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-500" />
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
        </motion.div>
      )}

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
      {/* Bad Checks Table */}
      <motion.div variants={item}>
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
                      <TableCell className="font-medium">{check.bankNumber}</TableCell>
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
      </motion.div>

    </motion.div>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
