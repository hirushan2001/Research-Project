import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 px-8 border-t border-slate-200/50 dark:border-slate-800/40 bg-white/30 dark:bg-slate-950/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">Fruit Quality Assessment System</span>
          <span className="mx-2">|</span>
          <span>Final Year Research Project © {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">FastAPI</span>
          <span className="px-2 py-0.5 rounded bg-lime-500/10 text-lime-600 dark:text-lime-400 font-medium">React + TS</span>
          <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 font-medium">YOLO Model</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
