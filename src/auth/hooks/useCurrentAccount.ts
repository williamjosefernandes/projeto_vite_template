import { toast } from 'sonner';
import { useAuthStore } from '../stores';
import { switchAccountService } from '../services';
import { getApiErrorMessage } from '../utils';

/** Conta ativa (multi-tenant), lista completa de contas e ação para trocar de conta. */
export function useCurrentAccount() {
  const currentAccount = useAuthStore((s) => s.currentAccount);
  const accounts = useAuthStore((s) => s.accounts);

  async function switchAccount(membershipId: string) {
    try {
      await switchAccountService(membershipId);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Não foi possível trocar de conta.'));
    }
  }

  return { currentAccount, accounts, switchAccount };
}
