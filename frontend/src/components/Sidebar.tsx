import { NavLink } from 'react-router-dom';
import { LayoutDashboard, X, FlaskConical, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { modules } = useApp();

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs transition-opacity md:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-950 transition-transform duration-300 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100 dark:border-slate-900 md:hidden">
          <span className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span>🍋</span> FQAS Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
          {/* Main Navigation Group */}
          <div>
            <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Overview
            </div>
            <nav className="space-y-1.5">
              <NavLink
                to="/"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-900/60'
                  }`
                }
              >
                <LayoutDashboard className="w-4.5 h-4.5" />
                <span>Dashboard</span>
              </NavLink>
            </nav>
          </div>

          {/* Core Modules Group */}
          <div>
            <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Grading Modules
            </div>
            <nav className="space-y-1.5">
              {modules.map((mod) => {
                const isActive = mod.status === 'active';
                
                if (isActive) {
                  return (
                    <NavLink
                      key={mod.id}
                      to={mod.route}
                      onClick={handleLinkClick}
                      className={({ isActive: isLinkActive }) =>
                        `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isLinkActive
                            ? 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 font-semibold shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-900/60'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{mod.icon}</span>
                        <span>{mod.name.split(' ')[0] + ' Grading'}</span>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    </NavLink>
                  );
                } else {
                  return (
                    <div
                      key={mod.id}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 dark:text-slate-600 select-none cursor-not-allowed opacity-75"
                      title={`${mod.name} is coming soon`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base filter grayscale opacity-75">{mod.icon}</span>
                        <span>{mod.name.split(' ')[0] + ' Assessment'}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 font-medium">
                        Soon
                      </span>
                    </div>
                  );
                }
              })}
            </nav>
          </div>

          {/* Research Context Box */}
          <div className="p-4 rounded-2xl glass-card bg-emerald-500/5 dark:bg-emerald-500/2 border border-emerald-500/10 dark:border-emerald-500/5">
            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-500" />
              <span>YOLO Classification</span>
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              Grading classifications are resolved using Roboflow cloud API workflows mapping deep learning model inference.
            </p>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Module Version 1.0</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              <span>v1.0.0</span>
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
