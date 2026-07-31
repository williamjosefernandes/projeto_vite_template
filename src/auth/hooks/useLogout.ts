import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logoutService } from '../services';

/** Mutation de logout: limpa sessão/cache/storages e redireciona ao Login. */
export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutService,
    onSuccess: () => navigate('/login', { replace: true }),
  });
}
