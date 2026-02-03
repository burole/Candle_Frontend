import React from 'react';
import { Download } from 'lucide-react';
import { Button, Badge } from '@/design-system/ComponentsTailwind';
import { cn } from '@/lib/utils';

interface StrategyHeaderProps {
  title: string;
  subtitle?: string;
  protocol?: string;
  status?: string;
  statusVariant?: 'success' | 'warning' | 'error' | 'info' | 'outline' | 'primary';
  pdfUrl?: string;
  children?: React.ReactNode;
  className?: string;
}

export function StrategyHeader({
  title,
  subtitle,
  protocol,
  status,
  statusVariant = 'primary',
  pdfUrl,
  children,
  className
}: StrategyHeaderProps) {
  return (
    <div className={cn("flex justify-between items-start mb-6", className)}>
      <div className="w-full">
        <div className="flex items-center gap-2 mb-2">
           {status && (
             <Badge variant={statusVariant}>
                {status}
             </Badge>
           )}
           {protocol && (
             <span className="text-xs text-gray-400 font-mono">Protocolo: {protocol}</span>
           )}
           {children}
        </div>
        
        <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            
            {pdfUrl && (
                <Button 
                   onClick={() => window.open(pdfUrl, '_blank')}
                   className="flex items-center gap-2 h-8"
                   variant="outline"
                >
                  <Download className="w-4 h-4" />
                  PDF
                </Button>
            )}
        </div>
      </div>
    </div>
  );
}
