import { useAuthStore } from '../stores';

/** Códigos de menu autorizados para a conta ativa (`CurrentAccountDto.menus`). */
export function useMenus() {
  return useAuthStore((s) => s.menus);
}
