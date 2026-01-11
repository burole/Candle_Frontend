"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import {
  CreditReportResponse,
  PremiumCreditReportResponse,
  CorporateCreditReportResponse,
} from "@/types/credit";
import DebtsTimeline from "./DebtsTimeline";
import ProtestsTimeline from "./ProtestsTimeline";
import CadinTimeline from "./CadinTimeline";
import CcfTimeline from "./CcfTimeline";
import ContumaciaTimeline from "./ContumaciaTimeline";
import StatusHero from "./StatusHero";
import QuickStats from "./QuickStats";
import PersonalInfoCard from "./PersonalInfoCard";
import QueriesHistory from "./QueriesHistory";

interface CreditReportProps {
  report: CreditReportResponse | PremiumCreditReportResponse | CorporateCreditReportResponse;
}

// Type guard to check if report is premium
function isPremiumReport(
  report: CreditReportResponse | PremiumCreditReportResponse | CorporateCreditReportResponse
): report is PremiumCreditReportResponse {
  return "cadin" in report && "ccf" in report && !("contumacia" in report);
}

// Type guard to check if report is corporate
function isCorporateReport(
  report: CreditReportResponse | PremiumCreditReportResponse | CorporateCreditReportResponse
): report is CorporateCreditReportResponse {
  return "contumacia" in report;
}

export default function CreditReport({ report }: CreditReportProps) {
  const isRestricted = report.status === "RESTRICTED";
  const isPremium = isPremiumReport(report);
  const isCorporate = isCorporateReport(report);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Status Section - Editorial Style */}
      <StatusHero status={report.status} protocol={report.protocol} />

      {/* Quick Stats Bar */}
      <QuickStats summary={report.financialSummary} isPremium={isPremium} isCorporate={isCorporate} />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <div className="lg:col-span-1">
          <PersonalInfoCard person={report.person} />
        </div>

        {/* Right Column - Financial Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contumacia Section - Corporate Only (Most Severe) */}
          {isCorporate && report.contumacia.length > 0 && (
            <ContumaciaTimeline contumacia={report.contumacia} />
          )}

          {/* CADIN Section - Premium & Corporate */}
          {(isPremium || isCorporate) && report.cadin.length > 0 && (
            <CadinTimeline cadin={report.cadin} />
          )}

          {/* CCF Section - Premium & Corporate */}
          {(isPremium || isCorporate) && report.ccf.length > 0 && (
            <CcfTimeline ccf={report.ccf} />
          )}

          {/* Debts Section */}
          {report.debts.length > 0 && (
            <DebtsTimeline debts={report.debts} />
          )}

          {/* Protests Section */}
          {report.protests.length > 0 && (
            <ProtestsTimeline protests={report.protests} />
          )}

          {/* Queries History */}
          {report.queries.length > 0 && (
            <QueriesHistory queries={report.queries} />
          )}

          {/* Empty State for CLEAR status */}
          {!isRestricted && report.debts.length === 0 && report.protests.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="relative overflow-hidden rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-12 text-center"
            >
              <Shield className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">
                Situação Regular
              </h3>
              <p className="text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                Não foram encontradas pendências financeiras ou protestos registrados{isPremium ? " em nome deste documento" : " em nome deste CPF"}.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
