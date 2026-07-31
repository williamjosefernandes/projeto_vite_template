/** `ErrorDto.code` — estável e independente de idioma; usar para localizar a mensagem (nunca `error.message`, que é só para debug/log). */
export type ErrorCode =
  | 'INTERNAL_SERVER_ERROR'
  | 'VALIDATION_ERROR'
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'EMAIL_DELIVERY_FAILED'
  | 'INVALID_CREDENTIALS'
  | 'UNVERIFIED_EMAIL'
  | 'ACCOUNT_INACTIVE'
  | 'PASSWORD_NOT_PROVIDED'
  | 'FIREBASE_TOKEN_NOT_PROVIDED'
  | 'INVALID_FIREBASE_TOKEN'
  | 'UNAUTHENTICATED'
  | 'EMAIL_ALREADY_IN_USE'
  | 'INVALID_TOKEN'
  | 'TOKEN_EXPIRED'
  | 'INVALID_REFRESH_TOKEN'
  | 'REFRESH_TOKEN_EXPIRED'
  | 'SESSION_NOT_FOUND'
  | 'SESSION_EXPIRED'
  | 'SESSION_REVOKED'
  | 'PERMISSION_DENIED'
  | 'MEMBERSHIP_INVALID'
  | 'PROFILE_INVALID'
  | 'ACCOUNT_ACCESS_DENIED'
  | 'USER_BLOCKED'
  | 'USER_NOT_FOUND'
  | 'USER_NOT_FOUND_IN_ACCOUNT'
  | 'USER_NOT_MEMBER_OF_ACCOUNT'
  | 'USER_ALREADY_IN_ACCOUNT'
  | 'INVALID_CURRENT_PASSWORD'
  | 'CANNOT_DELETE_OWNER'
  | 'CANNOT_BLOCK_OWNER'
  | 'INVALID_VERIFICATION_CODE'
  | 'VERIFICATION_CODE_EXPIRED'
  | 'INVALID_RESET_TOKEN'
  | 'RESET_TOKEN_EXPIRED'
  | 'FAQ_NOT_FOUND';

export interface ApiError {
  code: ErrorCode;
  /** Mensagem legível no idioma do servidor — só para debug/log, nunca exibir direto ao usuário (usar `code`). */
  message: string;
  details?: unknown;
}

/** Envelope padrão de toda resposta da API (`ApiResponseDto`). */
export interface ApiResponse<T> {
  success: boolean;
  timestamp: string;
  message?: string;
  messageCode?: string;
  data?: T;
  error?: ApiError;
  requestId?: string;
}
