"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Landmark,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { PremiumCreditReportResponse } from "@/types/credit";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "./formatters";

export default function CadinTimeline({ cadin }: { cadin: PremiumCreditReportResponse["cadin"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <Card className="rounded-2xl border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/50 to-violet-50/50 dark:from-purple-950/20 dark:to-violet-950/20 p-6 card-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-purple-600 text-white">
            <Landmark className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100">Restrição Federal (CADIN)</h2>
            <p className="text-sm text-purple-700 dark:text-purple-300">{cadin.length} registro{cadin.length === 1 ? "" : "s"} encontrado{cadin.length === 1 ? "" : "s"}</p>
          </div>
        </div>

        <div className="space-y-4">
          {cadin.map((item, index) => (
            <CadinItem key={index} item={item} index={index} />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function CadinItem({ item, index }: { item: PremiumCreditReportResponse["cadin"][0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
      className="relative pl-8 pb-6 border-l-2 border-purple-300 dark:border-purple-700 last:border-transparent last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-purple-600 ring-4 ring-purple-50 dark:ring-purple-950/50" />

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left group"
      >
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <h4 className="font-bold text-purple-900 dark:text-purple-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
              {item.literal}
            </h4>
          </div>
          <div className="text-right">
            <Badge variant="destructive" className="text-lg font-bold px-3 py-1 bg-purple-600">
              {formatCurrency(item.value)}
            </Badge>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="inline-flex items-center gap-1 text-sm text-purple-600 dark:text-purple-400"
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
        <div className="mt-4 p-4 rounded-xl bg-white/50 dark:bg-black/20 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-900 dark:text-purple-100">
              <strong>Data de Registro:</strong> {formatDate(item.date)}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
