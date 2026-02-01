
import { ScrBacenStrategy } from './ScrBacenStrategy';
import { CreditPremiumStrategy } from './CreditPremiumStrategy';
import { LocalizaStrategy } from './LocalizaStrategy';
import { DefaultStrategy } from './DefaultStrategy';
import { CompletaPlusCpfStrategy } from './CompletaPlusCpfStrategy';
import { CompletaPlusCnpjStrategy } from './CompletaPlusCnpjStrategy';
import { BoaVistaAcertaCpfStrategy } from './BoaVistaAcertaCpfStrategy';
import { BvsBasicaPfStrategy } from './BvsBasicaPfStrategy';
import type { QueryStrategyProps } from '@/types/query-strategies';
import React from 'react';

export const STRATEGIES: Record<string, React.ComponentType<QueryStrategyProps>> = {
  'SCR_BACEN_PREMIUM_SCORE': ScrBacenStrategy,
  'CREDIT_PREMIUM': CreditPremiumStrategy,
  'LOCALIZA_CPF_CNPJ': LocalizaStrategy,
  'COMPLETA_PLUS_BVS_ACOES_CPF': CompletaPlusCpfStrategy,
  'COMPLETA_PLUS_BVS_ACOES_CNPJ': CompletaPlusCnpjStrategy,
  'BOA_VISTA_ACERTA_CPF': BoaVistaAcertaCpfStrategy,
  'BVS_BASICA_PF': BvsBasicaPfStrategy,
};

export const getStrategyComponent = (code: string): React.ComponentType<QueryStrategyProps> => {
  return STRATEGIES[code] || DefaultStrategy;
};

export * from '@/types/query-strategies';
export * from './DefaultStrategy';
export * from './ScrBacenStrategy';
export * from './CreditPremiumStrategy';
export * from './LocalizaStrategy';
export * from './CompletaPlusCpfStrategy';
export * from './CompletaPlusCnpjStrategy';
export * from './BoaVistaAcertaCpfStrategy';
export * from './BvsBasicaPfStrategy';
