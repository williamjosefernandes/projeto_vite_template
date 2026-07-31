import { useAuthStore } from '../stores';
import type { LoginResponse } from '../types';

/** Aplica a resposta de login à store — único ponto que grava a sessão inicial. */
export function applyLoginResponse(response: LoginResponse): void {
  useAuthStore.getState().setSession(response);
}
