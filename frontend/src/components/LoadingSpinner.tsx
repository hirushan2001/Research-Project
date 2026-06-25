import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Analyzing fruit parameters...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 fade-in">
      <div className="relative flex items-center justify-center">
        {/* Outer pulsating glow */}
        <div className="absolute w-24 h-24 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 animate-pulse-slow"></div>
        {/* Ring spinner */}
        <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 border-r-lime-400 animate-spin"></div>
        {/* Inside dot */}
        <div className="absolute w-4 h-4 rounded-full bg-emerald-500 animate-pulse"></div>
      </div>
      <p className="mt-6 text-slate-600 dark:text-slate-400 font-medium text-sm animate-pulse">
        {message}
      </p>
      <p className="mt-1 text-slate-400 dark:text-slate-500 text-xs">
        Querying Roboflow workflow pipeline...
      </p>
    </div>
  );
};

export default LoadingSpinner;
