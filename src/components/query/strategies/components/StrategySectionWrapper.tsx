import React from 'react';
import { Card } from '@/design-system/ComponentsTailwind';
import { CheckCircle2 } from 'lucide-react';

interface StrategySectionWrapperProps {
  title: string;
  icon: React.ReactNode;
  count?: number;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}

export function StrategySectionWrapper({ 
  title, 
  icon, 
  count, 
  isEmpty, 
  emptyMessage = "Não constam registros.",
  children 
}: StrategySectionWrapperProps) {
  
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-lg">
      <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          {icon}
          {title} {count !== undefined && `(${count})`}
        </h3>
      </div>
      {isEmpty ? (
         <div className="p-8 text-center text-gray-500 flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mb-2" />
            <p>{emptyMessage}</p>
         </div>
      ) : (
        <div className="overflow-x-auto">
          {children}
        </div>
      )}
    </Card>
  );
}
