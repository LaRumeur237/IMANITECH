import React, { useState } from 'react';
import { AdminRole, AdminUser } from '../../types/admin';
import { AdminLoginModal } from './AdminLoginModal';

interface AdminFloatingButtonProps {
  onLoginSuccess?: (user: AdminUser) => void;
}

export const AdminFloatingButton: React.FC<AdminFloatingButtonProps> = ({ onLoginSuccess }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AdminRole | null>(null);

  const handleSuccess = (user: AdminUser) => {
    setSelectedRole(null);
    if (onLoginSuccess) {
      onLoginSuccess(user);
    } else {
      window.location.href = '/admin';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      <div className="relative inline-block text-left">
        {showMenu && (
          <div className="absolute bottom-full mb-3 right-0 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 text-slate-100 overflow-hidden">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              Espace Administration
            </div>
            <button
              onClick={() => { setSelectedRole('SUPER_ADMIN'); setShowMenu(false); }}
              className="w-full text-left px-4 py-2.5 text-xs hover:bg-slate-800 transition font-medium flex items-center justify-between gap-2"
            >
              <span>Admin 1</span>
              <span className="text-[10px] bg-purple-900/80 text-purple-200 border border-purple-700 px-2 py-0.5 rounded-full">Global</span>
            </button>
            <button
              onClick={() => { setSelectedRole('SHOP_ADMIN'); setShowMenu(false); }}
              className="w-full text-left px-4 py-2.5 text-xs hover:bg-slate-800 transition font-medium flex items-center justify-between gap-2 border-t border-slate-800"
            >
              <span>Admin 2</span>
              <span className="text-[10px] bg-blue-900/80 text-blue-200 border border-blue-700 px-2 py-0.5 rounded-full">Boutique</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 rounded-full text-xs font-semibold shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          🔒 Admin
        </button>
      </div>

      <AdminLoginModal
        isOpen={!!selectedRole}
        selectedRole={selectedRole}
        onClose={() => setSelectedRole(null)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};