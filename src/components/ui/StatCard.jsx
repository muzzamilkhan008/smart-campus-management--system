import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ title, value, change, changeType = 'positive', icon: Icon, color = 'blue', description }) => {
  const colorMap = {
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3.5 rounded-2xl border ${colorMap[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(change || description) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {change && (
            <span className={`inline-flex items-center font-bold px-2 py-0.5 rounded-md ${
              changeType === 'positive' 
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' 
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
            }`}>
              {changeType === 'positive' ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
              {change}
            </span>
          )}
          {description && (
            <span className="text-slate-500 dark:text-slate-400 font-medium truncate">{description}</span>
          )}
        </div>
      )}
    </div>
  );
};
