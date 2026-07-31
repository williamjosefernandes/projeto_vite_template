import { useAuthStore } from '../stores';

/** Checa se um componente granular (`components[]` da API) está liberado para a conta ativa. */
export function useComponent(component: string): boolean {
  return useAuthStore((s) => s.components.includes(component));
}
