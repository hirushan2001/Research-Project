import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import ModuleCard from '../../components/ModuleCard';
import { 
  Sparkles, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  BookOpen, 
  Activity, 
  Award, 
  Percent, 
  Timer, 
  AlertCircle,
  HelpCircle,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { checkHealth } from '../../services/api';

export const Dashboard: React.FC = () => {
  const { modules, history } = useApp();
  const [apiState, setApiState] = useState<'checking' | 'mock' | 'live' | 'offline'>('checking');
  
  // Calculate dynamic stats from local history
  const totalScans = history.length;
  
  const avgConfidence = totalScans > 0
    ? Math.round((history.reduce((sum, item) => sum + item.confidence, 0) / totalScans) * 100)
    : null;
    
  const premiumCount = history.filter(item => item.grade === 'G1' || item.grade === 'G2').length;
  const premiumYield = totalScans > 0
    ? Math.round((premiumCount / totalScans) * 100)
    : null;
    
  const avgSpeed = totalScans > 0
    ? (history.reduce((sum, item) => sum + item.predictionTime, 0) / totalScans).toFixed(2)
    : null;

  // Grade breakdown count
  const gradeCounts = { G1: 0, G2: 0, G3: 0, G4: 0 };
  history.forEach(item => {
    if (gradeCounts[item.grade] !== undefined) {
      gradeCounts[item.grade]++;
    }
  });

  useEffect(() => {
    const fetchApiHealth = async () => {
      try {
        const health = await checkHealth();
        if (health.status === 'healthy') {
          setApiState(health.mock_mode ? 'mock' : 'live');
        } else {
          setApiState('offline');
        }
      } catch (err) {
        setApiState('offline');
      }
    };
    fetchApiHealth();
  }, []);

  return (
    <div className="space-y-10 fade-in pb-12">
      
      {/* Premium Ambient Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl p-8 md:p-10 border border-slate-200/60 dark:border-slate-800/40 bg-gradient-to-br from-emerald-50/50 via-slate-50 to-lime-50/50 dark:from-[#0c1222] dark:via-[#090d16] dark:to-[#070b12] shadow-xl dark:shadow-2xl">
        {/* Glowing backdrop meshes */}
        <div className="absolute right-0 top-0 w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none -mr-40 -mt-4" />
        <div className="absolute left-1/4 bottom-0 w-[300px] h-[300px] rounded-full bg-lime-500/5 blur-[100px] pointer-events-none -mb-32" />
        
        <div className="relative max-w-4xl space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/15">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-600 dark:text-emerald-400" />
            <span>AI-Driven Agriculture Engineering Research</span>
          </span>
          
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-tight font-outfit">
            Fruit Quality Assessment <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-lime-600 dark:from-emerald-400 dark:via-teal-400 dark:to-lime-400 bg-clip-text text-transparent">
              Station & Dashboard
            </span>
          </h2>
          
          <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400 font-sans max-w-3xl">
            An automated computer vision platform designed for real-time fruit sorting and grading. 
            Powered by high-accuracy deep neural network pipelines, this research workstation executes surface anomaly extraction, 
            defect ratio calculations, and ripeness indexing to instantly catalog specimen grades (**G1 (Premium) to G4 (Poor)**).
          </p>
        </div>

        {/* Feature status badges */}
        <div className="relative mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex gap-3">
            <div className="p-2.5 h-10 w-10 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/40 text-emerald-600 dark:text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Inference Speed</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Sub-second assessments</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="p-2.5 h-10 w-10 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/40 text-teal-600 dark:text-teal-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Grading Metric</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">G1 - G4 standard scale</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="p-2.5 h-10 w-10 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/40 text-lime-600 dark:text-lime-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Inference Engine</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Safe fallback workflows</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="p-2.5 h-10 w-10 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/40 text-sky-600 dark:text-sky-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Academic Scope</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Final Year Project</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Key Performance Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Scans Card */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
          <div className="absolute right-3 top-3 opacity-10 group-hover:scale-110 transition-transform duration-300">
            <Activity className="w-12 h-12 text-emerald-500 dark:text-emerald-400" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Scans</span>
          <h3 className="mt-2 text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">{totalScans}</h3>
          <p className="mt-2 text-xs text-slate-400">Specimens cataloged in workspace</p>
        </div>

        {/* Average Confidence Card */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-teal-500/20 transition-all duration-300">
          <div className="absolute right-3 top-3 opacity-10 group-hover:scale-110 transition-transform duration-300">
            <Award className="w-12 h-12 text-teal-550 dark:text-teal-400" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Confidence</span>
          <h3 className="mt-2 text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {avgConfidence !== null ? `${avgConfidence}%` : '—'}
          </h3>
          <p className="mt-2 text-xs text-slate-400">Mean model scoring probability</p>
        </div>

        {/* Premium Grade Yield Card */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-lime-500/20 transition-all duration-300">
          <div className="absolute right-3 top-3 opacity-10 group-hover:scale-110 transition-transform duration-300">
            <Percent className="w-12 h-12 text-lime-500 dark:text-lime-400" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Premium Yield (G1/G2)</span>
          <h3 className="mt-2 text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {premiumYield !== null ? `${premiumYield}%` : '—'}
          </h3>
          <p className="mt-2 text-xs text-slate-400">Ratio of market-ready specimens</p>
        </div>

        {/* Inference Latency Card */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-sky-500/20 transition-all duration-300">
          <div className="absolute right-3 top-3 opacity-10 group-hover:scale-110 transition-transform duration-300">
            <Timer className="w-12 h-12 text-sky-550 dark:text-sky-400" />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Speed</span>
          <h3 className="mt-2 text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {avgSpeed !== null ? `${avgSpeed}s` : '—'}
          </h3>
          <p className="mt-2 text-xs text-slate-400">Average FastAPI parsing latency</p>
        </div>
      </section>

      {/* Main Grid: Modules & Distribution breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Fruit Modules */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Fruit Assessment Modules</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select an active classification model node below to perform real-time specimen scans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((mod) => (
              <ModuleCard key={mod.id} module={mod} />
            ))}
          </div>
        </div>

        {/* Right Side: Quality Distribution breakdown */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl flex flex-col justify-between border border-slate-200/60 dark:border-slate-800/40">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Quality Spread</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Classification counts from current session</p>
            
            {totalScans > 0 ? (
              <div className="mt-8 space-y-4.5">
                
                {/* G1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> G1 (Excellent)
                    </span>
                    <span className="text-slate-700 dark:text-slate-200">{gradeCounts.G1} ({Math.round(gradeCounts.G1 / totalScans * 100)}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(gradeCounts.G1 / totalScans * 100)}%` }} />
                  </div>
                </div>

                {/* G2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> G2 (Good)
                    </span>
                    <span className="text-slate-700 dark:text-slate-200">{gradeCounts.G2} ({Math.round(gradeCounts.G2 / totalScans * 100)}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${(gradeCounts.G2 / totalScans * 100)}%` }} />
                  </div>
                </div>

                {/* G3 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                      <HelpCircle className="w-3.5 h-3.5" /> G3 (Average)
                    </span>
                    <span className="text-slate-700 dark:text-slate-200">{gradeCounts.G3} ({Math.round(gradeCounts.G3 / totalScans * 100)}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(gradeCounts.G3 / totalScans * 100)}%` }} />
                  </div>
                </div>

                {/* G4 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                      <ShieldAlert className="w-3.5 h-3.5" /> G4 (Poor)
                    </span>
                    <span className="text-slate-700 dark:text-slate-200">{gradeCounts.G4} ({Math.round(gradeCounts.G4 / totalScans * 100)}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-rose-400 rounded-full" style={{ width: `${(gradeCounts.G4 / totalScans * 100)}%` }} />
                  </div>
                </div>

              </div>
            ) : (
              <div className="mt-12 flex flex-col items-center justify-center text-center p-4">
                <AlertCircle className="w-8 h-8 text-slate-400 dark:text-slate-650 animate-pulse mb-3" />
                <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400">No Assessment Records</h5>
                <p className="text-[10px] text-slate-400 dark:text-slate-550 mt-1 max-w-[200px]">
                  Specimen data will accumulate and plot charts once you scan fruits in the assessment modules.
                </p>
              </div>
            )}
          </div>

          {/* Connected API Module Detail */}
          <div className="mt-8 pt-4 border-t border-slate-105 dark:border-slate-800/60 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Model Pipeline</span>
            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] border ${
              apiState === 'live' 
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                : apiState === 'mock' 
                ? 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400' 
                : 'border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900 text-slate-500'
            }`}>
              {apiState === 'live' ? 'YOLOv8 Live' : apiState === 'mock' ? 'YOLOv8 Simulated' : 'Offline'}
            </span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
