import React from 'react';
import { Code, Lock } from 'lucide-react';

export const GuavaGrading: React.FC = () => {
  return (
    <div className="space-y-10 fade-in py-6">
      
      {/* Header section */}
      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🍐</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">
            Guava Quality Assessment
          </h2>
        </div>
        <p className="text-sm text-slate-550 dark:text-slate-400 font-sans max-w-2xl leading-relaxed">
          Automated classification model node to assess guava skin blemishes, size discrepancies, and shape anomalies.
        </p>
      </section>

      {/* Implement Soon Workspace Panel */}
      <section className="flex flex-col items-center justify-center text-center p-12 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 bg-white/40 dark:bg-slate-900/10 glass-panel max-w-2xl mx-auto mt-6">
        <div className="p-4 mb-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 animate-pulse border border-emerald-500/15">
          <Code className="w-10 h-10" />
        </div>
        
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/15 mb-4">
          <Lock className="w-3.5 h-3.5" />
          <span>Implement Soon</span>
        </span>

        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          Module Workspace Pending
        </h3>
        
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
          This workspace is pre-configured and isolated for the Guava Grading module. Teammates can customize this page and integrate their specific YOLOv8 inference pipeline inside <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono">GuavaGrading.tsx</code>.
        </p>

        <div className="mt-8 p-4 w-full rounded-2xl border border-slate-200/60 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/40 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400 dark:text-slate-500">Module Owner</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Guava Developer</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 dark:text-slate-500">Backend Endpoint</span>
            <span className="font-mono text-emerald-650 dark:text-emerald-450">POST /api/guava/predict</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 dark:text-slate-500">API Key Config</span>
            <span className="font-mono text-amber-605 dark:text-amber-405">GUAVA_ROBOFLOW_API_KEY</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default GuavaGrading;
