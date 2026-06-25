import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import type { FruitModule } from '../types';

interface ModuleCardProps {
  module: FruitModule;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const isActive = module.status === 'active';

  const cardContent = (
    <div className={`h-full flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 ${
      isActive
        ? 'glass-panel hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 hover:border-emerald-500/20 group'
        : 'glass-card opacity-65 saturate-50 cursor-not-allowed border-slate-200/40 dark:border-slate-800/20'
    }`}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-4xl filter group-hover:scale-110 transition-transform duration-300 select-none">
            {module.icon}
          </span>
          {isActive ? (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              Active Module
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-slate-100 text-slate-500 dark:bg-slate-900/80 dark:text-slate-400">
              <Lock className="w-3 h-3" /> Coming Soon
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
          {module.name}
        </h3>
        
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {module.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm font-semibold">
        {isActive ? (
          <>
            <span className="text-emerald-600 dark:text-emerald-400 group-hover:underline">
              Open Assessment Module
            </span>
            <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1.5 transition-transform duration-300" />
          </>
        ) : (
          <span className="text-slate-400 dark:text-slate-500">
            Awaiting Research Model Integration
          </span>
        )}
      </div>
    </div>
  );

  if (isActive) {
    return (
      <Link to={module.route} className="h-full block no-underline">
        {cardContent}
      </Link>
    );
  }

  return <div className="h-full">{cardContent}</div>;
};

export default ModuleCard;
