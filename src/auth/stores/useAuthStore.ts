import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Account,
  AuthTokens,
  ComponentKey,
  CurrentAccount,
  LoginResponse,
  MenuKey,
  Permission,
  User,
} from '../types';

interface AuthState {
  isAuthenticated: boolean;
  /** `true` assim que o `persist` termina de reidratar do localStorage — usado pelos guards para não redirecionar antes da sessão ser restaurada. */
  hasHydrated: boolean;
  auth: AuthTokens | null;
  user: User | null;
  currentAccount: CurrentAccount | null;
  accounts: Account[];
  /** Espelho de `currentAccount.permissions` — mantido no topo da store para os hooks/seletores existentes (`usePermission`, `useVisibleMenu`...). */
  permissions: Permission[];
  menus: MenuKey[];
  components: ComponentKey[];
}

interface AuthActions {
  /** Aplica a resposta de `POST /auth/login`, `/auth/refresh-token` ou `/auth/switch-account` — os três reemitem a sessão inteira. */
  setSession: (response: LoginResponse) => void;
  clearSession: () => void;
  setHasHydrated: (value: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  isAuthenticated: false,
  hasHydrated: false,
  auth: null,
  user: null,
  currentAccount: null,
  accounts: [],
  permissions: [],
  menus: [],
  components: [],
};

/**
 * Fonte única de verdade da sessão autenticada. Persistida em localStorage
 * (exceto `hasHydrated`, que é sempre recalculado). Consumida via os hooks
 * de `src/auth/hooks` — nunca leia esta store diretamente fora deles, exceto
 * em `src/api/http.ts` (interceptors do axios, fora de componentes React).
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      setSession: (response) =>
        set({
          isAuthenticated: true,
          auth: response.auth,
          user: response.user,
          currentAccount: response.currentAccount ?? null,
          accounts: response.accounts ?? [],
          permissions: response.currentAccount?.permissions ?? [],
          menus: response.currentAccount?.menus ?? [],
          components: response.currentAccount?.components ?? [],
        }),

      clearSession: () => set({ ...initialState, hasHydrated: true }),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        auth: state.auth,
        user: state.user,
        currentAccount: state.currentAccount,
        accounts: state.accounts,
        permissions: state.permissions,
        menus: state.menus,
        components: state.components,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
