import React, { useState } from 'react';
import { AdminRole, AdminUser } from '../../types/admin';
import { AdminLoginModal } from './AdminLoginModal';

interface AdminFooterButtonProps {
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminFooterButton: React.FC<AdminFooterButtonProps> = ({ onLoginSuccess }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AdminRole | null>(null);

  const handleSelectRole = (role: AdminRole) => {
    setSelectedRole(role);
    setShowMenu(false);
  };

  return (
    <>
      <div className="relative inline-block text-left">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 rounded-md text-xs font-semibold transition shadow-sm"
        >
          🔒 Admin
        </button>

        {showMenu && (
          <div className="absolute bottom-full mb-2 left-0 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 z-50">
            <button
              onClick={() => handleSelectRole('SUPER_ADMIN')}
              className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 transition font-medium flex items-center justify-between"
            >
              <span>Admin 1</span>
              <span className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-1.5 py-0.5 rounded">Global</span>
            </button>
            <button
              onClick={() => handleSelectRole('SHOP_ADMIN')}
              className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 transition font-medium flex items-center justify-between border-t border-slate-100 dark:border-slate-800"
            >
              <span>Admin 2</span>
              <span className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-1.5 py-0.5 rounded">Boutique</span>
            </button>
          </div>
        )}
      </div>

      <AdminLoginModal
        isOpen={!!selectedRole}
        selectedRole={selectedRole}
        onClose={() => setSelectedRole(null)}
        onSuccess={(user) => {
          setSelectedRole(null);
          onLoginSuccess(user);
        }}
      />
    </>
  );
};