import { http } from '../../api/http';
import type {
  ApiResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
  ResendVerificationRequest,
  ResetPasswordRequest,
  SwitchAccountResponse,
  VerifyEmailRequest,
} from '../types';

/**
 * Chamadas HTTP cruas de autenticação — sem lógica de store/side-effects.
 * Orquestração (aplicar resposta à store, navegar, etc.) vive em `src/auth/services`.
 * Contrato validado contra o Swagger real do backend (`GET /api/docs-json`).
 */
export const authApi = {
  login: (payload: LoginRequest) =>
    http.post<ApiResponse<LoginResponse>>('/auth/login', payload).then((res) => res.data.data!),

  /** Reemite a sessão inteira (tokens + user + currentAccount + accounts), não só os tokens. */
  refreshToken: (refreshToken: string) =>
    http
      .post<ApiResponse<RefreshTokenResponse>>('/auth/refresh-token', { refreshToken })
      .then((res) => res.data.data!),

  logout: () => http.post<void>('/auth/logout'),

  register: (payload: RegisterRequest) => http.post<void>('/auth/register', payload),

  /** Confirma o código de 6 dígitos enviado por e-mail no registro — marca o usuário como `ACTIVE`. */
  verifyEmail: (payload: VerifyEmailRequest) => http.post<void>('/auth/verify-email', payload),

  /** Gera e reenvia um novo código de verificação para o e-mail informado. */
  resendVerification: (payload: ResendVerificationRequest) =>
    http.post<void>('/auth/resend-verification', payload),

  forgotPassword: (payload: ForgotPasswordRequest) => http.post<void>('/auth/forgot-password', payload),

  resetPassword: (payload: ResetPasswordRequest) => http.post<void>('/auth/reset-password', payload),

  /** `membershipId` é o `id` do item de `accounts[]` — a troca reemite a sessão inteira, escopada à nova conta. */
  switchAccount: (membershipId: string) =>
    http
      .post<ApiResponse<SwitchAccountResponse>>('/auth/switch-account', { membershipId })
      .then((res) => res.data.data!),
};
