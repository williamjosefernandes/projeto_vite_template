import { useSessionStore } from '../store/useSessionStore';

/**
 * Checa se a conta ativa (`useSessionStore.permissions`) possui a(s)
 * permissão(ões) informada(s). Reativo: reavalia automaticamente quando o
 * usuário troca de conta (ver `AccountSwitcherMenu`).
 */
export function usePermission(required: string | string[]): boolean {
  const permissions = useSessionStore((s) => s.permissions);
  const requiredList = Array.isArray(required) ? required : [required];
  return requiredList.every((perm) => permissions.includes(perm));
}
