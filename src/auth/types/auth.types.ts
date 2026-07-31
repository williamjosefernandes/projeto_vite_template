import type { Account, CurrentAccount } from './account.types';
import type { AuthProvider, User } from './user.types';

export interface LoginRequest {
  /** Obrigatório apenas quando `authProvider` é `LOCAL`. */
  email?: string;
  /** Obrigatório apenas quando `authProvider` é `LOCAL`. */
  password?: string;
  authProvider: AuthProvider;
  firebaseToken?: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyEmailRequest {
  email: string;
  /** Código de 6 dígitos enviado por e-mail no registro. */
  code: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

/** `AuthTokensDto`. */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  /** Segundos até o access token expirar, a partir do momento do login/refresh. */
  expiresIn: number;
}

/** Alias semântico para `AuthTokens` — usado onde o domínio "Auth" (vs. "User") é o foco. */
export type Auth = AuthTokens;

/**
 * `LoginResponseDto` — payload devolvido por login, refresh e switch-account
 * (os três reemitem a sessão inteira, não só os tokens). `currentAccount`/
 * `accounts` são opcionais: um usuário recém-criado pode não ter conta ainda.
 */
export interface LoginResponse {
  auth: AuthTokens;
  user: User;
  currentAccount?: CurrentAccount;
  accounts?: Account[];
}

export type RefreshTokenResponse = LoginResponse;
export type SwitchAccountResponse = LoginResponse;
