import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ label = "Loading data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-3">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 animate-spin" />
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 animate-pulse">{label}</p>
    </div>
  );
};
