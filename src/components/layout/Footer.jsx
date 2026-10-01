import React from 'react';
import { GraduationCap, Heart, ShieldCheck } from 'lucide-react';

export const Footer = ({ onOpenAboutModal }) => {
  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs py-4 px-6 text-xs text-slate-500 dark:text-slate-400">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-slate-700 dark:text-slate-200">AI Smart Campus Management System</span>
          <span>© 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Demo System Active
          </span>
          <button 
            onClick={onOpenAboutModal}
            className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold underline transition-colors"
          >
            About Project
          </button>
        </div>
      </div>
    </footer>
  );
};
