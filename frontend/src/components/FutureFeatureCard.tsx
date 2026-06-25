import React from 'react';
import { Lock, Cpu, Sparkles, Ruler, Scale, Eye } from 'lucide-react';
import type { FutureFeature } from '../types';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  cpu: Cpu,
  sparkles: Sparkles,
  ruler: Ruler,
  scale: Scale,
  eye: Eye,
};

interface FutureFeatureCardProps {
  feature: FutureFeature;
}

export const FutureFeatureCard: React.FC<FutureFeatureCardProps> = ({ feature }) => {
  const FeatureIcon = ICON_MAP[feature.icon] || Cpu;

  return (
    <div className="relative glass-card rounded-2xl p-5 border border-slate-200/30 dark:border-slate-800/20 bg-white/40 dark:bg-slate-900/10 flex flex-col justify-between group overflow-hidden opacity-85 select-none">
      
      {/* Background soft glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-lime-500/0 group-hover:from-emerald-500/2 group-hover:to-lime-500/2 transition-all duration-300 pointer-events-none" />

      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950/80 text-slate-500 dark:text-slate-600 border border-slate-200/40 dark:border-slate-800/40 group-hover:text-emerald-500 dark:group-hover:text-emerald-600 transition-colors duration-300">
            <FeatureIcon className="w-5 h-5" />
          </div>
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 border border-slate-200/30 dark:border-slate-800/30 text-slate-400 dark:text-slate-500">
            <Lock className="w-2.5 h-2.5" /> Locked
          </span>
        </div>

        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          {feature.title}
        </h4>
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {feature.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-900/60 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
        <span>Enhancement Type: AI Model</span>
        <span className="font-semibold text-emerald-600/70 dark:text-emerald-500/50">
          Planned Roadmap
        </span>
      </div>
    </div>
  );
};

export default FutureFeatureCard;
