import React from 'react';
import { Trash2, History, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

const GRADE_BADGE_STYLE = {
  G1: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/10',
  G2: 'bg-teal-500/10 text-teal-700 border-teal-500/20 dark:bg-teal-500/15 dark:text-teal-400 dark:border-teal-500/10',
  G3: 'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/10',
  G4: 'bg-rose-500/10 text-rose-700 border-rose-500/20 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/10',
};

interface PredictionHistoryProps {
  onSelectRecord?: (record: any) => void;
}

export const PredictionHistory: React.FC<PredictionHistoryProps> = ({ onSelectRecord }) => {
  const { history, clearHistory } = useApp();

  if (history.length === 0) {
    return (
      <div className="w-full glass-card rounded-2xl p-8 border border-slate-200/40 dark:border-slate-800/35 text-center">
        <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
          <History className="w-8 h-8 mb-3 opacity-60" />
          <p className="text-sm font-semibold">No grading records found</p>
          <p className="text-xs mt-1 max-w-[280px]">
            Predictions you run on this device will save locally to prediction history.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <History className="w-5 h-5 text-emerald-500" />
          <span>Local Prediction History</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 text-slate-500 dark:text-slate-400 font-medium">
            {history.length} records
          </span>
        </h3>
        <button
          onClick={clearHistory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800/70 hover:border-red-200 dark:hover:border-red-900/40 hover:bg-red-50/50 dark:hover:bg-red-950/10 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-slate-200/50 dark:border-slate-800/35 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-slate-500 dark:text-slate-400">
            <thead className="bg-slate-50/50 dark:bg-slate-950/20 text-xs uppercase font-bold text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-900">
              <tr>
                <th scope="col" className="px-6 py-3.5">Specimen</th>
                <th scope="col" className="px-6 py-3.5">Grade</th>
                <th scope="col" className="px-6 py-3.5">Confidence</th>
                <th scope="col" className="px-6 py-3.5">Assessed Date</th>
                {onSelectRecord && <th scope="col" className="px-6 py-3.5 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
              {history.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-slate-100/30 dark:hover:bg-slate-900/10 transition-colors"
                >
                  <td className="px-6 py-3.5 font-medium text-slate-900 dark:text-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200/50 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900 flex items-center justify-center flex-shrink-0">
                        <img
                          src={record.imageUrl}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs truncate max-w-[120px] font-sans">
                        Specimen_{record.id.slice(0, 6)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${
                      GRADE_BADGE_STYLE[record.grade] || GRADE_BADGE_STYLE.G1
                    }`}>
                      {record.grade}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 font-medium text-slate-700 dark:text-slate-300">
                    {Math.round(record.confidence * 100)}%
                  </td>
                  <td className="px-6 py-3.5 text-xs">
                    {record.date}
                  </td>
                  {onSelectRecord && (
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={() => onSelectRecord(record)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all cursor-pointer"
                        title="View Prediction Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PredictionHistory;
