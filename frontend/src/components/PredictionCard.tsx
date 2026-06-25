import React from 'react';
import { ArrowLeft, Clock, Award, ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';

interface PredictionCardProps {
  grade: 'G1' | 'G2' | 'G3' | 'G4';
  confidence: number;
  message: string;
  predictionTime: number;
  imageUrl: string;
  onReset: () => void;
}

const GRADE_METADATA = {
  G1: {
    color: 'from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500',
    bgColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/25 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/10',
    title: 'Grade G1 (Excellent)',
    icon: Award,
  },
  G2: {
    color: 'from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500',
    bgColor: 'bg-teal-500/10 text-teal-700 border-teal-500/25 dark:bg-teal-500/15 dark:text-teal-400 dark:border-teal-500/10',
    title: 'Grade G2 (Good)',
    icon: CheckCircle,
  },
  G3: {
    color: 'from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500',
    bgColor: 'bg-amber-500/10 text-amber-700 border-amber-500/25 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/10',
    title: 'Grade G3 (Average)',
    icon: HelpCircle,
  },
  G4: {
    color: 'from-rose-500 to-rose-600 dark:from-rose-400 dark:to-rose-500',
    bgColor: 'bg-rose-500/10 text-rose-700 border-rose-500/25 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/10',
    title: 'Grade G4 (Poor)',
    icon: ShieldAlert,
  },
};

export const PredictionCard: React.FC<PredictionCardProps> = ({
  grade,
  confidence,
  message,
  predictionTime,
  imageUrl,
  onReset,
}) => {
  const meta = GRADE_METADATA[grade] || GRADE_METADATA.G1;
  const GradeIcon = meta.icon;
  const confidencePercent = Math.round(confidence * 100);

  return (
    <div className="w-full glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/40 shadow-xl shadow-slate-200/10 dark:shadow-none fade-in">
      
      {/* Back Button */}
      <button
        onClick={onReset}
        className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all text-xs font-semibold cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Analyze another image</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Uploaded Image Preview */}
        <div className="flex flex-col space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Uploaded Specimen
          </span>
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/35 aspect-video flex items-center justify-center">
            <img
              src={imageUrl}
              alt="Assessed Specimen"
              className="max-h-full max-w-full object-contain"
            />
            {/* Overlay badge with grade */}
            <div className="absolute top-3 left-3">
              <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border shadow-md ${meta.bgColor}`}>
                <GradeIcon className="w-3.5 h-3.5" />
                <span>{grade}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Prediction Details */}
        <div className="flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Model Classification Results
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                <span>{meta.title}</span>
              </h2>
            </div>

            {/* Confidence Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Confidence Score</span>
                <span className="text-slate-800 dark:text-white">{confidencePercent}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${meta.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${confidencePercent}%` }}
                />
              </div>
            </div>

            {/* Quality Statement / Message Card */}
            <div className="p-4 rounded-2xl border border-slate-200/40 dark:border-slate-800/35 bg-slate-50/50 dark:bg-slate-900/10">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                Quality Statement
              </h4>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {message}
              </p>
            </div>
          </div>

          {/* Model Statistics Footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Inference speed:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {predictionTime}s
              </span>
            </div>
            <div className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950/80 border border-slate-200/40 dark:border-slate-800/40 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              Workflow Model v1
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PredictionCard;
