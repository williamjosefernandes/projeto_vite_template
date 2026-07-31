import { authApi } from '../api';
import { applyLoginResponse } from './session.service';

/**
 * Troca a conta ativa. `/auth/switch-account` reemite a sessão inteira
 * (tokens + user + currentAccount + accounts) escopada à nova conta — não
 * há como fazer isso localmente, porque `accounts[]` não carrega
 * permissões/menus/componentes por item (só a conta ativa traz isso).
 */
export async function switchAccountService(membershipId: string): Promise<void> {
  const response = await authApi.switchAccount(membershipId);
  applyLoginResponse(response);
}
