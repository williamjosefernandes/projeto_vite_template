import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getApiErrorMessage } from '../../auth/utils';
import { usersApi } from '../api';
import type { CreateUserAdminRequest, UpdateUserAdminRequest, UpdateUserStatusRequest } from '../types';

/** Chave usada por `useUsersList` — invalidada (prefixo, não exata) após toda mutation de escrita abaixo. */
const USERS_LIST_KEY = ['users', 'list'] as const;

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserAdminRequest) => usersApi.createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_LIST_KEY });
      toast.success('Usuário convidado com sucesso.');
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Não foi possível criar o usuário.')),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserAdminRequest }) => usersApi.updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_LIST_KEY });
      toast.success('Usuário atualizado com sucesso.');
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Não foi possível atualizar o usuário.')),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_LIST_KEY });
      toast.success('Usuário removido com sucesso.');
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Não foi possível remover o usuário.')),
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserStatusRequest }) =>
      usersApi.updateUserStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_LIST_KEY });
      toast.success('Status do usuário atualizado com sucesso.');
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Não foi possível atualizar o status do usuário.')),
  });
}
