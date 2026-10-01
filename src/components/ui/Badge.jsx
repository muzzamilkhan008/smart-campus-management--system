import React from 'react';

export const Badge = ({ children, variant = 'blue', className = '', size = 'md' }) => {
  const variants = {
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60',
    emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60',
    rose: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60',
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-xs border-none',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 rounded-full font-medium',
    md: 'text-xs px-2.5 py-1 rounded-full font-medium',
    lg: 'text-sm px-3 py-1.5 rounded-lg font-semibold',
  };

  return (
    <span className={`inline-flex items-center gap-1 leading-none ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
