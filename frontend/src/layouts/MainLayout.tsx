import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#080B11] text-slate-800 dark:text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300 transition-colors duration-300">
      {/* Top Header Navigation */}
      <Navbar onToggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Navigation Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Dynamic Page Outlet */}
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col gap-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Footer Details */}
      <Footer />
    </div>
  );
};

export default MainLayout;
