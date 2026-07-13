import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full border border-slate-200/60 dark:border-slate-800/40 bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-850 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative overflow-hidden group"
      aria-label="Toggle Theme"
      title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      <div className="relative w-4.5 h-4.5 flex items-center justify-center">
        {/* Sun Icon */}
        <Sun className={`w-4.5 h-4.5 absolute transition-all duration-500 transform ${
          theme === 'light' 
            ? 'rotate-0 scale-100 opacity-100' 
            : 'rotate-90 scale-0 opacity-0'
        }`} />
        
        {/* Moon Icon */}
        <Moon className={`w-4.5 h-4.5 absolute transition-all duration-500 transform ${
          theme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100' 
            : '-rotate-90 scale-0 opacity-0'
        }`} />
      </div>
    </button>
  );
};

export default ThemeToggle;
