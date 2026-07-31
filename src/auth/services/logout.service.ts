import { queryClient } from '../../lib/query-client';
import { authApi } from '../api';
import { useAuthStore } from '../stores';

/**
 * Logout centralizado: invalida no backend (best-effort), limpa store,
 * cache do TanStack Query e storages. Não navega — quem chama decide o
 * redirecionamento (ver `useLogout`).
 */
export async function logoutService(): Promise<void> {
  try {
    await authApi.logout();
  } catch {
    // Logout no backend é best-effort — a sessão local é sempre limpa abaixo.
  } finally {
    useAuthStore.getState().clearSession();
    queryClient.clear();
    localStorage.removeItem('auth-store');
    sessionStorage.clear();
  }
}
