"use client";

import { motion } from "framer-motion";
import {
  FileX,
  Calendar,
} from "lucide-react";
import { PremiumCreditReportResponse } from "@/types/credit";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/formatters";

export default function CcfTimeline({ ccf }: { ccf: PremiumCreditReportResponse["ccf"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.6 }}
    >
      <Card className="rounded-2xl border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-950/20 dark:to-yellow-950/20 p-6 card-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-amber-600 text-white">
            <FileX className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">Cheques sem Fundo (CCF)</h2>
            <p className="text-sm text-amber-700 dark:text-amber-300">{ccf.length} registro{ccf.length === 1 ? "" : "s"} encontrado{ccf.length === 1 ? "" : "s"}</p>
          </div>
        </div>

        <div className="space-y-4">
          {ccf.map((item, index) => (
            <CcfItem key={index} item={item} index={index} />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function CcfItem({ item, index }: { item: PremiumCreditReportResponse["ccf"][0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.65 + index * 0.1, duration: 0.4 }}
      className="relative pl-8 pb-6 border-l-2 border-amber-300 dark:border-amber-700 last:border-transparent last:pb-0"
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-amber-600 ring-4 ring-amber-50 dark:ring-amber-950/50" />

      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex-1">
          <h4 className="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
            <FileX className="w-4 h-4" />
            {item.origin}
          </h4>
          <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
            Quantidade: <strong>{item.quantity}</strong> cheque{item.quantity === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 mt-2">
        <Calendar className="w-4 h-4" />
        <span>Último registro: {item.date || "Data não disponível"}</span>
      </div>
    </motion.div>
  );
}
