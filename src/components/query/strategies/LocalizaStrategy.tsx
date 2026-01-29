
'use client';

import { motion } from 'framer-motion';
import { 
  User, 
  Phone, 
  MapPin, 
  Users, 
  Mail, 
  Smartphone,
  Building2,
  Calendar
} from 'lucide-react';
import { Card, Badge } from '@/design-system/ComponentsTailwind';
import type { QueryStrategyProps, LocalizaResult } from '@/types/query-strategies';
import { cn } from '@/lib/utils';

export function LocalizaStrategy({ data }: QueryStrategyProps<LocalizaResult>) {
  if (!data) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
      {/* Basic Info Card */}
      <motion.div variants={item}>
        <Card className="p-6 border-l-4 border-l-blue-500 bg-white dark:bg-gray-900 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="info">{data.basicInfo.status}</Badge>
                <span className="text-sm text-gray-400">Protocolo: {data.protocol}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.basicInfo.name || "NOME NÃO INFORMADO"}
              </h2>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {data.basicInfo.document}
                </span>
                {data.basicInfo.birthDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {data.basicInfo.birthDate}
                  </span>
                )}
                {data.basicInfo.motherName && (
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Mãe: {data.basicInfo.motherName}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <motion.div variants={item} className="space-y-6">
          <Card className="p-6 h-full">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-500" />
              Contatos
            </h3>
            
            <div className="space-y-4">
              {data.contact.mainPhone && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-xs text-blue-600 dark:text-blue-300 font-medium">Principal</span>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{data.contact.mainPhone}</p>
                </div>
              )}

              {data.contact.mobilePhones.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" /> Celulares
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {data.contact.mobilePhones.map((phone, i) => (
                      <Badge key={i} variant="info">{phone}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {data.contact.emails.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Emails
                  </label>
                  <div className="flex flex-col gap-2">
                    {data.contact.emails.map((email, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {email}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Relations */}
        <motion.div variants={item} className="space-y-6">
          <Card className="p-6 h-full">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              Relacionamentos
            </h3>
            
            <div className="space-y-4">
               {data.relations.relatives.length > 0 ? (
                 <ul className="divide-y divide-gray-100">
                   {data.relations.relatives.map((rel, i) => (
                     <li key={i} className="py-3 flex justify-between items-center first:pt-0">
                       <div>
                         <p className="font-medium text-gray-900 dark:text-white">{rel.name}</p>
                         <p className="text-xs text-gray-500">{rel.type} - {rel.relation}</p>
                       </div>
                     </li>
                   ))}
                 </ul>
               ) : (
                 <p className="text-gray-500 text-sm">Nenhum relacionamento encontrado.</p>
               )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Addresses */}
      <motion.div variants={item}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" />
            Endereços Encontrados ({data.addresses.length})
          </h3>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.addresses.map((addr, i) => (
              <div 
                key={i} 
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-orange-200 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="info">{addr.source}</Badge>
                  <span className="text-xs text-gray-400 font-mono">{addr.zipCode}</span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                  {addr.street}, {addr.number}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {addr.neighborhood} - {addr.city}/{addr.state}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
