import { useQuery } from '@tanstack/react-query';
import { onboardingApi } from '../api';

export const ONBOARDING_DRAFT_QUERY_KEY = ['onboarding', 'draft'] as const;

/**
 * Rascunho do onboarding do usuário autenticado. `enabled` deve ser
 * controlado por quem chama — só faz sentido buscar quando há sessão e
 * ainda não há conta ativa (ver `useCadastroWizard`).
 */
export function useOnboardingDraft(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ONBOARDING_DRAFT_QUERY_KEY,
    queryFn: () => onboardingApi.getDraft(),
    enabled: options?.enabled ?? true,
    staleTime: 0,
    retry: false,
  });
}
