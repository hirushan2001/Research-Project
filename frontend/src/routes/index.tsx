import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import MangoGrading from '../modules/mango/pages/MangoGrading';
import GuavaGrading from '../modules/guava/pages/GuavaGrading';
import BananaGrading from '../modules/banana/pages/BananaGrading';
import PapayaGrading from '../modules/papaya/pages/PapayaGrading';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Wrap everything in the MainLayout */}
      <Route path="/" element={<MainLayout />}>
        {/* Dashboard page */}
        <Route index element={<Dashboard />} />
        
        {/* Grading module pages */}
        <Route path="mango" element={<MangoGrading />} />
        <Route path="guava" element={<GuavaGrading />} />
        <Route path="banana" element={<BananaGrading />} />
        <Route path="papaya" element={<PapayaGrading />} />
        
        {/* Fallback redirect for other routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
