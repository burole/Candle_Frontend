"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { CreditReportResponse } from "@/types/credit";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/formatters";

export default function DebtsTimeline({ debts }: { debts: CreditReportResponse["debts"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <Card className="rounded-2xl border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20 p-6 card-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-red-600 text-white">
            <AlertTriangle className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-red-900 dark:text-red-100">Dívidas Registradas</h2>
            <p className="text-sm text-red-700 dark:text-red-300">{debts.length} {debts.length === 1 ? "pendência" : "pendências"} encontrada{debts.length === 1 ? "" : "s"}</p>
          </div>
        </div>

        <div className="space-y-4">
          {debts.map((debt, index) => (
            <DebtItem key={index} debt={debt} index={index} />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function DebtItem({ debt, index }: { debt: CreditReportResponse["debts"][0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
      className="relative pl-8 pb-6 border-l-2 border-red-300 dark:border-red-700 last:border-transparent last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-red-600 ring-4 ring-red-50 dark:ring-red-950/50" />

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left group"
      >
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <h4 className="font-bold text-red-900 dark:text-red-100 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">
              {debt.origin}
            </h4>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">
              Contrato: {debt.contract}
            </p>
          </div>
          <div className="text-right">
            <Badge variant="destructive" className="text-lg font-bold px-3 py-1">
              {formatCurrency(debt.value)}
            </Badge>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="inline-flex items-center gap-1 text-sm text-red-600 dark:text-red-400"
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
            <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-red-900 dark:text-red-100">
              <strong>Vencimento:</strong> {formatDate(debt.date)}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
