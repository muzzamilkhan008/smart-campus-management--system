import React from 'react';
import { FolderOpen } from 'lucide-react';

export const EmptyState = ({ title = "No data found", description = "There are no records matching your current filter criteria.", action, icon: Icon = FolderOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700/60 my-4">
      <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-6">{description}</p>
      {action && action}
    </div>
  );
};
