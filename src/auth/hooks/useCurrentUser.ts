import { useAuthStore } from '../stores';

export function useCurrentUser() {
  return useAuthStore((s) => s.user);
}
