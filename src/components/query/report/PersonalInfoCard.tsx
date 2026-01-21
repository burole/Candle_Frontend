"use client";

import { motion } from "framer-motion";
import {
  User,
  FileText,
  Calendar,
  Mail,
  Building2,
  TrendingUp,
} from "lucide-react";
import { CreditReportResponse } from "@/types/credit";
import { Card } from "@/components/ui/card";
import { formatCpf, formatCnpj, formatDate } from "@/lib/formatters";

interface PersonalInfoCardProps {
  person: CreditReportResponse["person"];
}

function InfoItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  // Display "Não informado" for empty or whitespace-only values
  const displayValue = value && value.trim() !== "" ? value : "Não informado";
  const isNotInformed = displayValue === "Não informado";

  return (
    <div className="flex items-start gap-3 group">
      <Icon className="w-5 h-5 text-muted-foreground mt-0.5 group-hover:text-primary transition-colors" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
        <p className={`text-sm font-medium break-words ${isNotInformed ? "text-muted-foreground italic" : "text-foreground"}`}>
          {displayValue}
        </p>
      </div>
    </div>
  );
}

export default function PersonalInfoCard({ person }: PersonalInfoCardProps) {
  // Determine if document is CNPJ (14 digits) or CPF (11 digits)
  const cleanDoc = person.document.replace(/\D/g, "");
  const isCnpj = cleanDoc.length === 14;
  const documentLabel = isCnpj ? "CNPJ" : "CPF";
  const formattedDocument = isCnpj ? formatCnpj(person.document) : formatCpf(person.document);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm p-6 card-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <User className="w-6 h-6 text-primary" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold">Informações Pessoais</h2>
        </div>

        <div className="space-y-4">
          <InfoItem icon={User} label="Nome" value={person.name} />
          <InfoItem icon={FileText} label={documentLabel} value={formattedDocument} />
          <InfoItem icon={Calendar} label="Nascimento" value={formatDate(person.birthDate)} />
          <InfoItem icon={User} label="Nome da Mãe" value={person.motherName} />
          <InfoItem icon={Mail} label="E-mail" value={person.email} />
          <InfoItem icon={Building2} label="Atividade" value={person.mainEconomicActivity} />
          <InfoItem icon={TrendingUp} label="Status" value={person.revenueStatus} />
        </div>
      </Card>
    </motion.div>
  );
}
