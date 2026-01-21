"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  Building2,
} from "lucide-react";
import { CreditReportResponse } from "@/types/credit";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/formatters";

export default function ProtestsTimeline({ protests }: { protests: CreditReportResponse["protests"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
    >
      <Card className="rounded-2xl border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20 p-6 card-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-orange-600 text-white">
            <FileText className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100">Protestos</h2>
            <p className="text-sm text-orange-700 dark:text-orange-300">{protests.length} protesto{protests.length === 1 ? "" : "s"} registrado{protests.length === 1 ? "" : "s"}</p>
          </div>
        </div>

        <div className="space-y-4">
          {protests.map((protest, index) => (
            <ProtestItem key={index} protest={protest} index={index} />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function ProtestItem({ protest, index }: { protest: CreditReportResponse["protests"][0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
      className="relative pl-8 pb-6 border-l-2 border-orange-300 dark:border-orange-700 last:border-transparent last:pb-0"
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-orange-600 ring-4 ring-orange-50 dark:ring-orange-950/50" />

      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex-1">
          <h4 className="font-bold text-orange-900 dark:text-orange-100 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            {protest.notary}
          </h4>
        </div>
        <Badge variant="destructive" className="text-lg font-bold px-3 py-1 bg-orange-600">
          {formatCurrency(protest.value)}
        </Badge>
      </div>

      <div className="flex items-center gap-2 text-sm text-orange-700 dark:text-orange-400 mt-2">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(protest.date)}</span>
      </div>
    </motion.div>
  );
}
