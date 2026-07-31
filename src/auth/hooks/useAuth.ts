import { useAuthStore } from '../stores';

/**
 * Hook fachada da sessão: autenticado?, sessão já restaurada?, usuário e
 * conta ativa. Para permissões/menus/componentes, ver os hooks específicos
 * (`usePermissions`, `useMenus`, `useComponent`).
 */
export function useAuth() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const user = useAuthStore((s) => s.user);
  const currentAccount = useAuthStore((s) => s.currentAccount);
  const accounts = useAuthStore((s) => s.accounts);

  return {
    isAuthenticated,
    /** `true` enquanto a sessão persistida ainda está sendo restaurada do localStorage. */
    isLoading: !hasHydrated,
    user,
    currentAccount,
    accounts,
  };
}
