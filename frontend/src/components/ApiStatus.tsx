import React, { useEffect, useState } from 'react';
import { Server, Wifi, WifiOff, Cpu } from 'lucide-react';
import { checkHealth } from '../services/api';

export const ApiStatus: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [mockMode, setMockMode] = useState<boolean | null>(null);

  const fetchStatus = async () => {
    try {
      const data = await checkHealth();
      if (data.status === 'healthy') {
        setStatus('online');
        setMockMode(data.mock_mode);
      } else {
        setStatus('offline');
      }
    } catch (error) {
      setStatus('offline');
      setMockMode(null);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Poll connection status every 10 seconds
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  if (status === 'checking') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-400 select-none animate-pulse-slow">
        <Server className="w-3.5 h-3.5" />
        <span className="text-[11px] font-semibold tracking-wider uppercase font-sans">Syncing...</span>
      </div>
    );
  }

  if (status === 'offline') {
    return (
      <div 
        onClick={fetchStatus}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-200 dark:border-rose-950/40 bg-rose-50 dark:bg-rose-950/15 text-rose-600 dark:text-rose-400 cursor-pointer hover:bg-rose-100 dark:hover:bg-rose-950/25 transition-colors select-none"
        title="FastAPI Server is not responding on port 8000. Click to retry."
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </span>
        <WifiOff className="w-3.5 h-3.5" />
        <span className="text-[11px] font-bold tracking-wider uppercase font-sans">API Offline</span>
      </div>
    );
  }

  return (
    <div 
      onClick={fetchStatus}
      className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border cursor-pointer select-none transition-all duration-300 ${
        mockMode 
          ? 'border-amber-500/25 bg-amber-500/5 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10' 
          : 'border-emerald-500/25 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
      }`}
      title={mockMode ? "Running in Simulated Mock Mode. Click to recheck." : "Running in Roboflow Live API Mode. Click to recheck."}
    >
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${mockMode ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${mockMode ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
      </span>
      <div className="flex items-center gap-1.5">
        {mockMode ? <Cpu className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
        <span className="text-[11px] font-bold tracking-wider uppercase font-sans">
          {mockMode ? 'API Online (Mock)' : 'API Online (Live)'}
        </span>
      </div>
    </div>
  );
};

export default ApiStatus;
