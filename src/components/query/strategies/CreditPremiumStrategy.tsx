
'use client';

import { CreditReportDisplay } from '@/components/credit/CreditReportDisplay';
import type { QueryStrategyProps } from '@/types/query-strategies';
import type { PremiumCreditReportResponse } from '@/types/credit';

export function CreditPremiumStrategy({ data }: QueryStrategyProps<PremiumCreditReportResponse>) {
  // Leverage the existing robust component
  return <CreditReportDisplay report={data} />;
}
