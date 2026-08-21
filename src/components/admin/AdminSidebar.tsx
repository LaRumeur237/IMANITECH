import React from 'react';
import { AdminUser, ROLE_PERMISSIONS } from '../../types/admin';

interface AdminSidebarProps {
  user: AdminUser;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onLogout,
}) => {
  const permissions = ROLE_PERMISSIONS[user.role];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col justify-between border-r border-slate-800">
      <div>
        <div className="mb-8 px-2">
          <h2 className="text-xl font-bold tracking-tight text-blue-400">IMANI ADMIN</h2>
          <span className={`inline-block mt-2 px-2 py-0.5 text-xs font-semibold rounded ${
            user.role === 'SUPER_ADMIN' ? 'bg-purple-900 text-purple-200' : 'bg-blue-900 text-blue-200'
          }`}>
            {user.role === 'SUPER_ADMIN' ? 'Admin 1 (Global)' : 'Admin 2 (Boutique)'}
          </span>
        </div>

        <nav className="space-y-1">
          {permissions.canManageShop && (
            <>
              <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                E-Commerce
              </div>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition font-medium ${
                  activeTab === 'products' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                📦 Produits & Stocks
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition font-medium ${
                  activeTab === 'orders' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                🛒 Commandes
              </button>
            </>
          )}

          {permissions.canManageSettings && (
            <>
              <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6">
                Système & Plateforme
              </div>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition font-medium ${
                  activeTab === 'users' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                👥 Gestion Utilisateurs
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition font-medium ${
                  activeTab === 'settings' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                ⚙️ Configuration du Site
              </button>
            </>
          )}
        </nav>
      </div>

      <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
        <div className="text-sm truncate">
          <p className="font-semibold text-white truncate">{user.name}</p>
          <p className="text-xs text-slate-400 truncate">{user.email}</p>
        </div>
      </div>
    </aside>
  );
};