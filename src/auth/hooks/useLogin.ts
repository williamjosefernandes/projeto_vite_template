import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authApi } from '../api';
import { applyLoginResponse } from '../services';
import type { LoginRequest } from '../types';
import { getApiErrorMessage } from '../utils';

/** Mutation de login: aplica a sessão, avisa o usuário e redireciona ao Dashboard. */
export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (response) => {
      applyLoginResponse(response);
      toast.success(`Bem-vindo(a) de volta, ${response.user.firstName}!`);
      navigate('/', { replace: true });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Não foi possível entrar. Tente novamente.'));
    },
  });
}
