"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  FileText,
  Search,
  Landmark,
  FileX,
  ShieldAlert,
} from "lucide-react";
import { FinancialSummary } from "@/types/credit";
import StatCard from "./StatCard";

interface QuickStatsProps {
  summary: FinancialSummary;
  isPremium?: boolean;
  isCorporate?: boolean;
}

export default function QuickStats({
  summary,
  isPremium = false,
  isCorporate = false
}: QuickStatsProps) {
  // Calculate grid columns based on report type
  // Corporate: 6 cards (Contumacia + CADIN + CCF + Debts + Protests + Queries)
  // Premium: 5 cards (CADIN + CCF + Debts + Protests + Queries)
  // Standard: 3 cards (Debts + Protests + Queries)
  const gridCols = isCorporate ? "md:grid-cols-6" : isPremium ? "md:grid-cols-5" : "md:grid-cols-3";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className={`grid grid-cols-1 ${gridCols} gap-4`}
    >
      {/* Contumacia Card - Corporate Only (Most Severe) */}
      {isCorporate && (
        <StatCard
          icon={ShieldAlert}
          label="Contumácia"
          value={summary.totalContumacia ?? 0}
          color={(summary.totalContumacia ?? 0) > 0 ? "rose" : "emerald"}
          delay={0.32}
        />
      )}

      {/* CADIN Card - Premium & Corporate */}
      {(isPremium || isCorporate) && (
        <StatCard
          icon={Landmark}
          label="CADIN"
          value={summary.totalCadin ?? 0}
          color={(summary.totalCadin ?? 0) > 0 ? "purple" : "emerald"}
          delay={0.35}
        />
      )}

      {/* CCF Card - Premium & Corporate */}
      {(isPremium || isCorporate) && (
        <StatCard
          icon={FileX}
          label="CCF"
          value={summary.totalCcf ?? 0}
          color={(summary.totalCcf ?? 0) > 0 ? "amber" : "emerald"}
          delay={0.375}
        />
      )}

      <StatCard
        icon={AlertTriangle}
        label="Dívidas"
        value={summary.totalDebts}
        color={summary.totalDebts > 0 ? "red" : "emerald"}
        delay={0.4}
      />
      <StatCard
        icon={FileText}
        label="Protestos"
        value={summary.totalProtests}
        color={summary.totalProtests > 0 ? "red" : "emerald"}
        delay={0.5}
      />
      <StatCard
        icon={Search}
        label="Consultas"
        value={summary.totalQueries}
        color="blue"
        delay={0.6}
      />
    </motion.div>
  );
}
