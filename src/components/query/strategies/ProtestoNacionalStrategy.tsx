'use client';

import { motion } from 'framer-motion';
import { 
  FileWarning, 
  MapPin, 
  Building2,
  Calendar,
  Phone,
  User,
  CheckCircle2
} from 'lucide-react';
import { Card, Badge } from '@/design-system/ComponentsTailwind';
import type { QueryStrategyProps, ProtestoNacionalResult } from '@/types/query-strategies';
import { SummaryCard } from './components/SummaryCard';

export function ProtestoNacionalStrategy({ data }: QueryStrategyProps<ProtestoNacionalResult>) {
  if (!data) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <Card className="p-6 border-l-4 border-l-red-500 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="warning" className="mb-2">CONSULTA</Badge>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                   <FileWarning className="w-6 h-6 text-red-500" />
                   Protesto Nacional
                </h1>
                <p className="text-sm text-gray-500 font-medium mt-1">{data.product}</p>
                <p className="text-xs text-gray-400 font-mono mt-2">Protocolo: {data.protocol}</p>
              </div>
            </div>
         </Card>

         <div className="grid grid-cols-2 gap-4">
            <SummaryCard 
               title="Valor Total" 
               value={data.totalValue} 
               color="red" 
               icon={<FileWarning className="w-5 h-5" />}
               subtitle="Em protestos"
            />
            <SummaryCard 
               title="Registros" 
               value={data.totalProtests} 
               color="gray" 
               icon={<Building2 className="w-5 h-5" />}
               subtitle="Total encontrados"
            />
         </div>
      </div>

      {/* Protests Detail */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <FileWarning className="w-5 h-5 text-red-500" />
          Detalhamento dos Protestos
        </h3>

        {data.protests && data.protests.length > 0 ? (
          <div className="space-y-4">
            {data.protests.map((protest, idx) => (
              <Card key={idx} className="p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300">
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
                  <div className="space-y-3 md:border-l md:border-gray-100 dark:border-gray-800 md:pl-6">
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
          <Card className="p-12 border-dashed border-2 border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center bg-gray-50/50">
             <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
               <CheckCircle2 className="w-8 h-8 text-green-500" />
             </div>
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Nada Consta</h3>
             <p className="text-gray-500">Nenhum protesto encontrado para este documento.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
