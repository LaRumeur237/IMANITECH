import React, { useState, useEffect } from 'react';
import { AdminUser } from '../../types/admin';
import { adminAuthService } from '../../services/adminAuthService';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { RoleGuard } from '../../components/admin/RoleGuard';

export const AdminPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    const user = adminAuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    adminAuthService.logout();
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
        <div className="text-center max-w-md p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Accès Non Autorisé</h2>
          <p className="text-sm text-slate-400 mb-6">
            Veuillez utiliser le bouton <strong>"Admin"</strong> situé en bas de page pour choisir votre rôle (Admin 1 ou Admin 2) et vous authentifier.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <AdminSidebar
        user={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold">Tableau de Bord Administration</h1>
            <p className="text-xs text-slate-400 mt-1">
              Connecté en tant que : <strong className="text-blue-400">{currentUser.name}</strong> ({currentUser.email})
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-xs font-semibold text-red-400 hover:text-white bg-red-950/50 hover:bg-red-900/80 border border-red-800 rounded-lg transition"
          >
            Déconnexion
          </button>
        </header>

        {/* Section Gestion E-Commerce (Accessible Admin 1 et Admin 2 via canManageShop) */}
        {activeTab === 'products' && (
          <RoleGuard userRole={currentUser.role} requiredPermission="canManageShop">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">📦 Gestion des Produits & Stocks</h2>
              <p className="text-sm text-slate-400">
                Interface de suivi des articles, réapprovisionnement et modification des prix de la boutique.
              </p>
            </div>
          </RoleGuard>
        )}

        {activeTab === 'orders' && (
          <RoleGuard userRole={currentUser.role} requiredPermission="canManageShop">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">🛒 Gestion des Commandes</h2>
              <p className="text-sm text-slate-400">
                Consultation et traitement des commandes clients en cours.
              </p>
            </div>
          </RoleGuard>
        )}

        {/* Section Système (Exclusivement Admin 1 via canManageUsers / canManageSettings) */}
        {activeTab === 'users' && (
          <RoleGuard userRole={currentUser.role} requiredPermission="canManageUsers">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">👥 Administration des Utilisateurs</h2>
              <p className="text-sm text-slate-400">
                Gestion des comptes, privilèges et accès système (Accès exclusif Admin 1).
              </p>
            </div>
          </RoleGuard>
        )}

        {activeTab === 'settings' && (
          <RoleGuard userRole={currentUser.role} requiredPermission="canManageSettings">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">⚙️ Configuration de la Plateforme</h2>
              <p className="text-sm text-slate-400">
                Paramètres généraux du site, clés API et journaux d'activité (Accès exclusif Admin 1).
              </p>
            </div>
          </RoleGuard>
        )}
      </main>
    </div>
  );
};