import { useAuthStore } from '../auth/stores';

/**
 * Checa se a conta ativa (`useAuthStore.permissions`) possui a(s)
 * permissão(ões) informada(s). Reativo: reavalia automaticamente quando o
 * usuário troca de conta (ver `AccountSwitcherMenu`) ou faz login.
 */
export function usePermission(required: string | string[]): boolean {
  const permissions = useAuthStore((s) => s.permissions);
  const requiredList = Array.isArray(required) ? required : [required];
  return requiredList.every((perm) => permissions.includes(perm));
}
