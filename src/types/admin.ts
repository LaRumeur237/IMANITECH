export type AdminRole = 'SUPER_ADMIN' | 'SHOP_ADMIN';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
}

export interface PermissionMap {
  canManageSettings: boolean;
  canManageUsers: boolean;
  canManageShop: boolean;
  canViewGlobalAnalytics: boolean;
}

export const ROLE_PERMISSIONS: Record<AdminRole, PermissionMap> = {
  SUPER_ADMIN: {
    canManageSettings: true,
    canManageUsers: true,
    canManageShop: true,
    canViewGlobalAnalytics: true,
  },
  SHOP_ADMIN: {
    canManageSettings: false,
    canManageUsers: false,
    canManageShop: true,
    canViewGlobalAnalytics: false,
  },
};
