import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockAccounts, mockMemberships } from '../lib/mock-accounts';
import type { Permission } from '../types/rbac';

interface SessionUser {
  name: string;
  role: string;
}

interface SessionState {
  user: SessionUser;
  accounts: typeof mockAccounts;
  activeAccountId: string;
  permissions: Permission[];
  switchAccount: (accountId: string) => void;
}

function permissionsFor(accountId: string): Permission[] {
  return mockMemberships.find((m) => m.accountId === accountId)?.permissions ?? [];
}

/**
 * Sessão do usuário: conta ativa (multi-tenant) e permissões já resolvidas
 * para essa conta. Trocar de conta atualiza `permissions` na hora — quem
 * consome via `useVisibleMenu` re-renderiza automaticamente, sem reload.
 * Persistido em localStorage para lembrar a última conta escolhida.
 */
export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: { name: 'Vicente Pires', role: 'Administrador' },
      accounts: mockAccounts,
      activeAccountId: mockAccounts[0].id,
      permissions: permissionsFor(mockAccounts[0].id),
      switchAccount: (accountId) =>
        set({ activeAccountId: accountId, permissions: permissionsFor(accountId) }),
    }),
    {
      name: 'session-store',
      partialize: (state) => ({ activeAccountId: state.activeAccountId }),
      onRehydrateStorage: () => (state) => {
        if (state) state.permissions = permissionsFor(state.activeAccountId);
      },
    },
  ),
);
