import React from 'react';
import { Menu, GraduationCap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/50 dark:border-slate-800/40 bg-white/75 dark:bg-slate-950/75 backdrop-blur-md transition-colors duration-300">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Left section: Mobile menu and Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 md:hidden text-slate-500 dark:text-slate-400 cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5.5 h-5.5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl animate-float">🍋</span>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent p-0 m-0 leading-tight">
                FQAS
              </h1>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide leading-none uppercase hidden sm:inline">
                Fruit Quality Assessment
              </span>
            </div>
          </div>
        </div>

        {/* Right section: Info Badge & Theme Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 text-slate-600 dark:text-slate-400">
            <GraduationCap className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-medium font-sans">Research Project Stage</span>
          </div>

          <ThemeToggle />
        </div>

      </div>
    </header>
  );
};

export default Navbar;
