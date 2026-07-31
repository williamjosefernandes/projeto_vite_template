export type AuthProvider = 'LOCAL' | 'PHONE' | 'GOOGLE' | 'APPLE' | 'FACEBOOK' | 'GITHUB' | 'ANONYMOUS';

/** `UserResponseDto` — usuário devolvido no login/refresh/switch-account. */
export interface User {
  id: string;
  /** Nulo para contas provisionadas via login por telefone ou anônimo. */
  email: string | null;
  firstName: string;
  lastName?: string;
  avatar?: string;
  emailVerified: boolean;
  status: string;
  authProvider: AuthProvider;
}
