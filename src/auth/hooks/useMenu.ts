import { useAuthStore } from '../stores';

/** Checa se um código de menu (`CurrentAccountDto.menus`) está liberado para a conta ativa. */
export function useMenu(menuKey: string): boolean {
  return useAuthStore((s) => s.menus.includes(menuKey));
}
