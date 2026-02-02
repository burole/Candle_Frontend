'use client';

import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  Phone,
  Target,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Card, Badge } from '@/design-system/ComponentsTailwind';
import type { QueryStrategyProps, RealtimePremiumScorePfResult } from '@/types/query-strategies';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/glass-table";
import { AlertsGrid } from './components/AlertsGrid';

export function RealtimePremiumScorePfStrategy({ data }: QueryStrategyProps<RealtimePremiumScorePfResult>) {
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

  // Helper to determine score color
  const getScoreColor = (scoreValue: string | number) => {
    const score = Number(scoreValue);
    if (score >= 800) return 'text-green-600';
    if (score >= 500) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (scoreValue: string | number) => {
    const score = Number(scoreValue);
    if (score >= 800) return 'success';
    if (score >= 500) return 'warning';
    return 'error';
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header with Person Info & Score */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Person Details */}
        <Card className="lg:col-span-2 p-6 border-l-4 border-l-blue-500 bg-white shadow-lg">
           <div className="flex flex-col md:flex-row gap-6">
             <div className="flex-1">
               <div className="flex items-center gap-2 mb-3">
                 <Badge variant={data.person.status === 'REGULAR' ? 'success' : 'warning'}>
                   {data.person.status}
                 </Badge>
                 <span className="text-sm text-gray-400 font-mono hidden md:inline">Protocolo: {data.protocol}</span>
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
           </div>
        </Card>

        {/* Right: Score Card */}
        {data.score && (
          <Card className="p-6 border border-gray-100 shadow-lg relative overflow-hidden flex flex-col justify-center items-center text-center">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Target className="w-32 h-32" />
            </div>
            
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Score de Crédito
            </h3>

            <div className="relative">
              <div className="text-5xl font-black tracking-tighter mb-1" style={{ fontVariantNumeric: 'tabular-nums' }}>
                <span className={getScoreColor(data.score.value)}>{data.score.value}</span>
                <span className="text-xl text-gray-300 ml-1">/1000</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <Badge variant={getScoreBadgeVariant(data.score.value)} size="md">
                Classe {data.score.class}
              </Badge>
              <span className="font-semibold text-gray-600">{data.score.riskText}</span>
            </div>

            <div className="mt-6 w-full bg-gray-100 rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full ${Number(data.score.value) >= 800 ? 'bg-green-500' : Number(data.score.value) >= 500 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                style={{ width: `${(Number(data.score.value) / 1000) * 100}%` }}
              ></div>
            </div>
             <p className="text-xs text-gray-400 text-right w-full">Probabilidade de Pagamento: {data.score.probability}%</p>
          </Card>
        )}
      </motion.div>

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
        </motion.div>
      )}

      {/* Addresses */}
      {data.addresses && data.addresses.length > 0 && (
        <motion.div variants={item}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
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
                     <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.protests.map((protest, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{protest.date}</TableCell>
                      <TableCell className="font-medium">{protest.origin || protest.notary}</TableCell>
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
      </motion.div>

    </motion.div>
  );
}
