import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useCurrentAccount } from '../../auth/hooks';
import { usersApi } from '../api';
import type { ListUsersQuery } from '../types';

export const usersListQueryKey = (accountId: string | undefined, query: ListUsersQuery) =>
  ['users', 'list', accountId, query] as const;

/**
 * Listagem paginada/filtrada de usuários da conta ativa. Só dispara quando há
 * conta ativa (endpoint exige `x-account-id`) e quando `options.enabled` não é
 * `false` (ex.: o chamador pode desligar a busca se faltar `users.read`, para
 * não garantir um 403 desnecessário). `placeholderData` mantém a página
 * anterior visível ao trocar de página/filtro.
 */
export function useUsersList(query: ListUsersQuery, options?: { enabled?: boolean }) {
  const { currentAccount } = useCurrentAccount();

  return useQuery({
    queryKey: usersListQueryKey(currentAccount?.id, query),
    queryFn: () => usersApi.listUsers(query),
    enabled: !!currentAccount?.id && (options?.enabled ?? true),
    placeholderData: keepPreviousData,
  });
}
