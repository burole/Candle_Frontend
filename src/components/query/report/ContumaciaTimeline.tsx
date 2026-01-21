"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ShieldAlert,
  Calendar,
  Building2,
  ChevronDown,
} from "lucide-react";
import { CorporateCreditReportResponse } from "@/types/credit";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";

export default function ContumaciaTimeline({ contumacia }: { contumacia: CorporateCreditReportResponse["contumacia"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <Card className="rounded-2xl border-rose-200 dark:border-rose-800 bg-gradient-to-br from-rose-50/50 to-red-50/50 dark:from-rose-950/20 dark:to-red-950/20 p-6 card-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-rose-600 text-white">
            <ShieldAlert className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100">Contumácia</h2>
            <p className="text-sm text-rose-700 dark:text-rose-300">
              {contumacia.length} indicador{contumacia.length === 1 ? "" : "es"} de mau pagador habitual
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {contumacia.map((item, index) => (
            <ContumaciaItem key={index} item={item} index={index} />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function ContumaciaItem({ item, index }: { item: CorporateCreditReportResponse["contumacia"][0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
      className="relative pl-8 pb-6 border-l-2 border-rose-300 dark:border-rose-700 last:border-transparent last:pb-0"
    >
      {/* Timeline dot with pulse effect for severity */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-rose-600 ring-4 ring-rose-50 dark:ring-rose-950/50 animate-pulse" />

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left group"
      >
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <h4 className="font-bold text-rose-900 dark:text-rose-100 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">
              {item.reason}
            </h4>
            <p className="text-sm text-rose-700 dark:text-rose-400 mt-1 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5" />
              {item.agency}
            </p>
          </div>
          <Badge
            variant="destructive"
            className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-3 py-1"
          >
            ALERTA
          </Badge>
        </div>

        <motion.div
          initial={false}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="inline-flex items-center gap-1 text-sm text-rose-600 dark:text-rose-400 font-medium"
        >
          <ChevronDown className="w-4 h-4" />
          {isExpanded ? "Ocultar" : "Ver"} detalhes
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="mt-4 p-4 rounded-xl bg-white/50 dark:bg-black/20 space-y-3 border border-rose-200/50 dark:border-rose-800/50">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-rose-900 dark:text-rose-100">
              <strong>Data de Registro:</strong> {formatDate(item.date)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-rose-900 dark:text-rose-100">
              <strong>Órgão Registrador:</strong> {item.agency}
            </span>
          </div>
          <div className="mt-3 p-3 rounded-lg bg-rose-100/50 dark:bg-rose-900/20 border-l-4 border-rose-600">
            <p className="text-xs text-rose-800 dark:text-rose-200 font-medium">
              ⚠️ Indicador de comportamento de inadimplência habitual
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
