import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getApiErrorMessage } from '../../auth/utils';
import { onboardingApi } from '../api';
import { ONBOARDING_DRAFT_QUERY_KEY } from './useOnboardingDraft';
import type { CompleteOnboardingRequest } from '../types';

/** Salva o `data` retornado (o draft já atualizado) direto no cache — evita um refetch extra a cada step. */
function useSaveStep<TPayload>(mutationFn: (payload: TPayload) => ReturnType<typeof onboardingApi.saveAddress>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (draft) => {
      queryClient.setQueryData(ONBOARDING_DRAFT_QUERY_KEY, draft);
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Não foi possível salvar esta etapa.')),
  });
}

export function useSavePersonalData() {
  return useSaveStep(onboardingApi.savePersonalData);
}

export function useSaveCompanyData() {
  return useSaveStep(onboardingApi.saveCompanyData);
}

export function useSaveAddress() {
  return useSaveStep(onboardingApi.saveAddress);
}

export function useSavePersonalization() {
  return useSaveStep(onboardingApi.savePersonalization);
}

/**
 * Conclui o onboarding e limpa o rascunho do cache. **Não** aplica a sessão
 * nova aqui de propósito: se aplicássemos na hora, `currentAccount` deixaria
 * de ser `null` e o `GuestGuard` (que observa a store global) redirecionaria
 * `/cadastro` para `/` imediatamente, sem nunca renderizar o step de Sucesso.
 * Quem chama guarda a resposta e só aplica (`applyLoginResponse`) no clique
 * de "Acessar portal" do step de Sucesso — aí sim o redirect é intencional.
 */
export function useCompleteOnboarding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CompleteOnboardingRequest) => onboardingApi.complete(payload),
    onSuccess: () => {
      queryClient.setQueryData(ONBOARDING_DRAFT_QUERY_KEY, null);
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Não foi possível concluir o cadastro.')),
  });
}
