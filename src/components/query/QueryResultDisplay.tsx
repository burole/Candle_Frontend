'use client';

import { getStrategyComponent } from './strategies';
import type { QueryHistoryEntry } from '@/types/query';
import { cn } from '@/lib/utils';
import { Card } from '@/design-system/ComponentsTailwind';

interface QueryResultDisplayProps {
  query: QueryHistoryEntry;
  className?: string;
}

export function QueryResultDisplay({ query, className }: QueryResultDisplayProps) {
  // Select the appropriate strategy component
  const code = query.queryType?.code || 'DEFAULT';
  const StrategyComponent = getStrategyComponent(code);

  return (
    <div className={cn('space-y-6', className)}>
      <StrategyComponent data={query.result} queryId={query.id} />
      
      {/* Metadata Footer */}
      <Card className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 border-gray-200">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Protocolo</p>
          <p className="text-sm font-medium text-gray-900 font-mono mt-1">{query.id?.split('-')[0] || 'N/A'}...</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Data</p>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {query.createdAt ? new Date(query.createdAt).toLocaleString('pt-BR') : 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Valor</p>
          <p className="text-sm font-medium text-gray-900 mt-1">R$ {query.price?.toFixed(2) || '0.00'}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Cache</p>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {query.isCached ? (
              <span className="text-green-600 font-bold">SIM</span>
            ) : (
              <span className="text-gray-600">NÃO</span>
            )}
          </p>
        </div>
      </Card>
    </div>
  );
}
