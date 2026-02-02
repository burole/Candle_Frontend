'use client';

import React from 'react';

interface InfoBoxProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export function InfoBox({ label, value, icon, className }: InfoBoxProps) {
  return (
    <div className={`p-4 bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs font-medium text-gray-500 uppercase">{label}</span>
      </div>
      <p className="font-semibold text-gray-900 dark:text-white break-words">
        {value || 'N/A'}
      </p>
    </div>
  );
}
