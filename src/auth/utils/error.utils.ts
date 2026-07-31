import { isAxiosError } from 'axios';
import type { ApiResponse, ErrorCode } from '../types';

/**
 * `ErrorDto.message` é só para debug/log (idioma do servidor) — a API pede
 * explicitamente para o cliente localizar a mensagem a partir de `code`.
 * Mapeia só os códigos relevantes para os fluxos de auth já implementados;
 * códigos sem entrada aqui caem no `fallback` passado por quem chamou.
 */
const ERROR_MESSAGES: Partial<Record<ErrorCode, string>> = {
  INVALID_CREDENTIALS: 'E-mail ou senha inválidos.',
  VALIDATION_ERROR: 'Verifique os dados informados e tente novamente.',
  UNVERIFIED_EMAIL: 'Confirme seu e-mail antes de entrar.',
  ACCOUNT_INACTIVE: 'Esta conta está inativa. Fale com o administrador.',
  USER_BLOCKED: 'Este usuário está bloqueado.',
  USER_NOT_FOUND: 'Usuário não encontrado.',
  EMAIL_ALREADY_IN_USE: 'Este e-mail já está em uso.',
  INVALID_TOKEN: 'Sessão inválida. Faça login novamente.',
  TOKEN_EXPIRED: 'Sua sessão expirou. Faça login novamente.',
  INVALID_REFRESH_TOKEN: 'Sua sessão expirou. Faça login novamente.',
  REFRESH_TOKEN_EXPIRED: 'Sua sessão expirou. Faça login novamente.',
  SESSION_EXPIRED: 'Sua sessão expirou. Faça login novamente.',
  SESSION_REVOKED: 'Sua sessão foi encerrada em outro dispositivo.',
  PERMISSION_DENIED: 'Você não tem permissão para realizar esta ação.',
  ACCOUNT_ACCESS_DENIED: 'Você não tem acesso a esta conta.',
  USER_NOT_MEMBER_OF_ACCOUNT: 'Você não faz parte desta conta.',
  INVALID_VERIFICATION_CODE: 'Código de verificação inválido.',
  VERIFICATION_CODE_EXPIRED: 'Código de verificação expirado.',
  INVALID_RESET_TOKEN: 'Link de redefinição inválido.',
  RESET_TOKEN_EXPIRED: 'Link de redefinição expirado.',
  CONFLICT: 'Este registro já existe ou está em conflito com outro.',
  BAD_REQUEST: 'Requisição inválida. Verifique os dados informados.',
  NOT_FOUND: 'Registro não encontrado.',
  EMAIL_DELIVERY_FAILED: 'Não foi possível enviar o e-mail. Tente novamente em instantes.',
  MEMBERSHIP_INVALID: 'Você não tem acesso a esta conta.',
  PROFILE_INVALID: 'Perfil inválido para acessar este recurso.',
  USER_ALREADY_IN_ACCOUNT: 'Este usuário já pertence a esta conta.',
  USER_NOT_FOUND_IN_ACCOUNT: 'Usuário não encontrado nesta conta.',
  CANNOT_DELETE_OWNER: 'O proprietário da conta não pode ser removido.',
  CANNOT_BLOCK_OWNER: 'O proprietário da conta não pode ser bloqueado.',
  RATE_LIMITED: 'Muitas tentativas em pouco tempo. Aguarde um momento e tente novamente.',
};

/** Extrai uma mensagem amigável de um erro do axios, com fallback para erros inesperados/sem código mapeado. */
export function getApiErrorMessage(error: unknown, fallback = 'Algo deu errado. Tente novamente.'): string {
  if (isAxiosError<ApiResponse<unknown>>(error)) {
    if (!error.response) return 'Não foi possível conectar ao servidor. Verifique sua internet.';
    const code = error.response.data?.error?.code;
    return (code && ERROR_MESSAGES[code]) || fallback;
  }
  return fallback;
}
