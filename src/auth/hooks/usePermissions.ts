import { useAuthStore } from '../stores';

/** Todas as permissões da conta ativa. Para checar uma permissão específica, ver `usePermission` (`src/hooks`). */
export function usePermissions() {
  return useAuthStore((s) => s.permissions);
}
