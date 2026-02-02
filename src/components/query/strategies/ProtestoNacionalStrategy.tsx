'use client';

import { motion } from 'framer-motion';
import { 
  FileWarning, 
  MapPin, 
  Building2,
  Calendar,
  DollarSign,
  Phone,
  User,
  CheckCircle2
} from 'lucide-react';
import { Card, Badge, StatsCard } from '@/design-system/ComponentsTailwind';
import type { QueryStrategyProps, ProtestoNacionalResult } from '@/types/query-strategies';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/glass-table";

export function ProtestoNacionalStrategy({ data }: QueryStrategyProps<ProtestoNacionalResult>) {
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
      {/* Header */}
      <motion.div variants={item}>
        <Card className="p-6 border-l-4 border-l-red-500 bg-white shadow-lg">
           <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
             <div className="flex-1">
               <div className="flex items-center gap-2 mb-3">
                 <Badge variant="warning">
                   CONSULTA
                 </Badge>
                 <span className="text-sm text-gray-400 font-mono">Protocolo: {data.protocol}</span>
               </div>
               
               <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                 <FileWarning className="w-6 h-6 text-red-500" />
                 Protesto Nacional
               </h1>
               <p className="text-sm text-gray-500 font-medium">{data.product}</p>
             </div>

             <div className="flex gap-4">
               <div className="text-right">
                 <p className="text-sm text-gray-500">Valor Total</p>
                 <p className="text-2xl font-bold text-red-600">R$ {data.totalValue}</p>
               </div>
               <div className="text-right pl-4 border-l border-gray-100">
                 <p className="text-sm text-gray-500">Total de Registros</p>
                 <p className="text-2xl font-bold text-gray-900">{data.totalProtests}</p>
               </div>
             </div>
           </div>
        </Card>
      </motion.div>

      {/* Protests Detail */}
      <motion.div variants={item}>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FileWarning className="w-5 h-5 text-red-500" />
          Detalhamento dos Protestos
        </h3>

        {data.protests && data.protests.length > 0 ? (
          <div className="space-y-4">
            {data.protests.map((protest, idx) => (
              <Card key={idx} className="p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Column 1: Value & Date */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold mb-1">Valor do Protesto</p>
                      <p className="text-xl font-bold text-red-600">R$ {protest.value}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">Data do Protesto</p>
                        <p className="font-semibold text-gray-900">{protest.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Notary & Location */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Building2 className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Cartório</p>
                        <p className="font-medium text-gray-900">{protest.notary}º Tabelionato</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Local</p>
                        <p className="font-medium text-gray-900">{protest.city} - {protest.state}</p>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Creditor Info */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Credor</p>
                        <p className="font-medium text-gray-900">{protest.creditor}</p>
                      </div>
                    </div>
                     <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Cedente</p>
                        <p className="font-medium text-gray-900">{protest.assignor}</p>
                      </div>
                    </div>
                  </div>

                  {/* Column 4: Contact Info */}
                  <div className="space-y-3 md:border-l md:border-gray-100 md:pl-6">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Endereço do Cartório</p>
                        <p className="text-sm text-gray-600 leading-snug">{protest.address}</p>
                      </div>
                    </div>
                    {protest.phone && (
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-bold mb-1">Telefone</p>
                          <p className="text-sm font-medium text-gray-900">{protest.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 border-dashed border-2 border-gray-100 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
               <CheckCircle2 className="w-8 h-8 text-green-500" />
             </div>
             <h3 className="text-lg font-bold text-gray-900 mb-1">Nada Consta</h3>
             <p className="text-gray-500">Nenhum protesto encontrado para este documento.</p>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
}
