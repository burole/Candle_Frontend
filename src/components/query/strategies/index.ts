
import { ScrBacenStrategy } from './ScrBacenStrategy';
import { CreditPremiumStrategy } from './CreditPremiumStrategy';
import { LocalizaStrategy } from './LocalizaStrategy';
import { DefaultStrategy } from './DefaultStrategy';
import type { QueryStrategyProps } from '@/types/query-strategies';
import React from 'react';

export const STRATEGIES: Record<string, React.ComponentType<QueryStrategyProps>> = {
  'SCR_BACEN_PREMIUM_SCORE': ScrBacenStrategy,
  'CREDIT_PREMIUM': CreditPremiumStrategy,
  'LOCALIZA_CPF_CNPJ': LocalizaStrategy,
};

export const getStrategyComponent = (code: string): React.ComponentType<QueryStrategyProps> => {
  return STRATEGIES[code] || DefaultStrategy;
};

export * from '@/types/query-strategies';
export * from './DefaultStrategy';
export * from './ScrBacenStrategy';
export * from './CreditPremiumStrategy';
export * from './LocalizaStrategy';
