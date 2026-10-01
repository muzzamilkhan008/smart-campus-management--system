import React from 'react';

export const Card = ({ children, className = '', hover = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm ${
        hover ? 'hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-5 pb-3 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', icon: Icon }) => (
  <h3 className={`text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 ${className}`}>
    {Icon && <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-4 bg-slate-50/60 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-700/50 rounded-b-2xl flex items-center justify-between ${className}`}>
    {children}
  </div>
);
