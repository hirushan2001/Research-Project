import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import MangoGrading from '../pages/MangoGrading/MangoGrading';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Wrap everything in the MainLayout */}
      <Route path="/" element={<MainLayout />}>
        {/* Dashboard page */}
        <Route index element={<Dashboard />} />
        
        {/* Mango Grading page */}
        <Route path="mango" element={<MangoGrading />} />
        
        {/* Fallback redirect for other routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
