import React from 'react';
import { App } from './App';
import { AdminPage } from './pages/admin/index';

export const MainEntry: React.FC = () => {
  // Détection si l'utilisateur demande la route /admin
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <AdminPage />;
  }

  return <App />;
};

export default MainEntry;