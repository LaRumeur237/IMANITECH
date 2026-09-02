import { AdminUser, AdminRole } from '../types/admin';

// Les identifiants et hash sont chargés depuis .env.local (jamais commité sur Git)
const ADMIN_CREDENTIALS: Record<AdminRole, { username: string; passwordHash: string; name: string; email: string }> = {
  SUPER_ADMIN: {
    username:     import.meta.env.VITE_ADMIN1_USERNAME ?? '',
    passwordHash: import.meta.env.VITE_ADMIN1_HASH     ?? '',
    name:  'Admin Global (Admin 1)',
    email: 'admin1@imani-tech.cm',
  },
  SHOP_ADMIN: {
    username:     import.meta.env.VITE_ADMIN2_USERNAME ?? '',
    passwordHash: import.meta.env.VITE_ADMIN2_HASH     ?? '',
    name:  'Admin Boutique (Admin 2)',
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