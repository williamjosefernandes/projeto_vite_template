import { useMemo } from 'react';
import { menuConfig } from '../lib/menu-config';
import { useAuthStore } from '../auth/stores';
import type { MenuGroup } from '../types/rbac';

/**
 * Filtra `menuConfig` pelas permissões da conta ativa. Grupos sem nenhum
 * item visível são removidos por completo (ex.: conta sem acesso a
 * Financeiro não mostra o grupo "Financeiro" na sidebar).
 */
export function useVisibleMenu(): MenuGroup[] {
  const permissions = useAuthStore((s) => s.permissions);

  return useMemo(
    () =>
      menuConfig
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => permissions.includes(item.requiredPermission)),
        }))
        .filter((group) => group.items.length > 0),
    [permissions],
  );
}
