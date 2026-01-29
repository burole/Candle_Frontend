'use client';

import * as Icons from 'lucide-react';
import { useRouter } from 'next/navigation';
import { QueryType } from '@/types/query';
import { ConsultationCard } from '@/design-system/ComponentsTailwind';
import { getCategoryConfig } from '@/constants/query-categories';

interface QueryTypeCardProps {
  queryType: QueryType;
  className?: string;
}

export function QueryTypeCard({ queryType, className }: QueryTypeCardProps) {
  const router = useRouter();
  // Usa a primeira categoria param definir ícone e cor, ou fallback pra SEARCH
  const mainCategory = queryType.category && queryType.category.length > 0 ? queryType.category[0] : null;
  const categoryConfig = mainCategory ? getCategoryConfig(mainCategory) : null;
  const IconComponent = (categoryConfig?.icon && Icons[categoryConfig.icon as keyof typeof Icons] ? Icons[categoryConfig.icon as keyof typeof Icons] : Icons.Search) as React.ElementType;
  
  const features = [];

  features.push('Resultado imediato');
  features.push('Dados atualizados');

  return (
    <ConsultationCard
      name={queryType.name}
      description={queryType.description || 'Consulta detalhada para análise de crédito e risco.'}
      price={queryType.price}
      features={features}
      icon={<IconComponent className="w-8 h-8" />}
      isPopular={queryType.code === 'CREDIT_PREMIUM' || queryType.code === 'SERASA_CREDNET_PEFIN_PROTESTO_SPC_PF'}
      isPremium={queryType.price >= 4}
      onClick={() => router.push(`/consulta/${queryType.code}`)}
    />
  );
}
