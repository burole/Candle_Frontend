'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, Zap } from 'lucide-react';
import type { QueryType } from '@/types/query';
import { cn } from '@/lib/utils';

interface QueryTypeCardProps {
  queryType: QueryType;
  className?: string;
}

export function QueryTypeCard({ queryType, className }: QueryTypeCardProps) {
  const hasCacheDiscount = queryType.cachedPrice < queryType.price;
  const discountPercent = hasCacheDiscount
    ? Math.round(((queryType.price - queryType.cachedPrice) / queryType.price) * 100)
    : 0;

  return (
    <Link href={`/consulta/${queryType.code}`}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6',
          'shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer',
          'group',
          className
        )}
      >
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          {hasCacheDiscount && (
            <span className="px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Cache -{discountPercent}%
            </span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 pr-20 group-hover:text-blue-600 transition-colors">
            {queryType.name}
          </h3>

          {/* Description - if available */}
          {queryType.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{queryType.description}</p>
          )}

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-2">
            {hasCacheDiscount ? (
              <>
                <span className="text-2xl font-bold text-gray-900">
                  R$ {queryType.cachedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  R$ {queryType.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                R$ {queryType.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Cache info */}
          {hasCacheDiscount && (
            <p className="text-xs text-gray-500">
              Cache válido por {queryType.cacheTtlMinutes} minutos
            </p>
          )}

          {/* Action hint */}
          <div className="pt-2 border-t border-gray-100">
            <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
              Consultar agora →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
