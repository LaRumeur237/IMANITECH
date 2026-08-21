import React from 'react';
import { AdminRole, PermissionMap, ROLE_PERMISSIONS } from '../../types/admin';

interface RoleGuardProps {
  userRole: AdminRole;
  requiredPermission: keyof PermissionMap;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  userRole,
  requiredPermission,
  children,
  fallback,
}) => {
  const hasPermission = ROLE_PERMISSIONS[userRole]?.[requiredPermission];

  if (!hasPermission) {
    return (
      fallback || (
        <div className="p-8 text-center bg-red-50 border border-red-200 rounded-xl my-4">
          <h3 className="text-lg font-bold text-red-700">Accès Restreint</h3>
          <p className="text-sm text-red-600 mt-1">
            Vous n'avez pas les permissions nécessaires pour accéder à cette section.
          </p>
        </div>
      )
    );
  }

  return <>{children}</>;
};