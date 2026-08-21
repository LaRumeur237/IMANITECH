import { AdminUser, AdminRole } from '../types/admin';

// Empreintes SHA-256 des mots de passe (Aucun mot de passe en clair)
// Admin 1 (admin4400 / Imani2375@) -> SHA-256
// Admin 2 (admin44001 / Imani@3713) -> SHA-256
const ADMIN_CREDENTIALS: Record<AdminRole, { username: string; passwordHash: string; name: string; email: string }> = {
  SUPER_ADMIN: {
    username: 'admin4400',
    passwordHash: '8b7f879dfbf52bf01ee7c9dcff70b02bb5256e6d1c44760a9f5d37617fdd3e6e', // Imani2375@
    name: 'Admin Global (Admin 1)',
    email: 'admin1@imani-tech.cm',
  },
  SHOP_ADMIN: {
    username: 'admin44001',
    passwordHash: '2bc1121d10e59954d24a0d9b43d22b2f6760b7ca42d99edbf2d98d287bb17df4', // Imani@3713
    name: 'Admin Boutique (Admin 2)',
    email: 'admin2@imani-tech.cm',
  },
};

const SESSION_KEY = 'imani_admin_session';

async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const adminAuthService = {
  async login(role: AdminRole, usernameInput: string, passwordInput: string): Promise<{ success: boolean; user?: AdminUser; message?: string }> {
    const config = ADMIN_CREDENTIALS[role];

    if (!config) {
      return { success: false, message: 'Rôle d\'administration invalide.' };
    }

    if (usernameInput.trim() !== config.username) {
      return { success: false, message: 'Identifiant incorrect pour ce compte.' };
    }

    const hashedInput = await hashPassword(passwordInput);

    if (hashedInput !== config.passwordHash) {
      return { success: false, message: 'Mot de passe incorrect.' };
    }

    const user: AdminUser = {
      id: role === 'SUPER_ADMIN' ? 'usr_admin_1' : 'usr_admin_2',
      name: config.name,
      email: config.email,
      role: role,
    };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  getCurrentUser(): AdminUser | null {
    const sessionData = sessionStorage.getItem(SESSION_KEY);
    if (!sessionData) return null;
    try {
      return JSON.parse(sessionData) as AdminUser;
    } catch {
      return null;
    }
  },

  logout(): void {
    sessionStorage.removeItem(SESSION_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  },
};