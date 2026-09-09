/**
 * Validação de e-mail do formulário de contato (WILLI-4).
 *
 * Retorna um resultado tipado em vez de lançar: o formulário decide como apresentar o motivo.
 */
export type EmailValidationReason = 'EMPTY' | 'MISSING_AT' | 'INVALID_DOMAIN' | 'TOO_LONG';

export type EmailValidationResult = { valid: true; normalized: string } | { valid: false; reason: EmailValidationReason };

export const EMAIL_MAX_LENGTH = 254;

export function validateEmail(input: string): EmailValidationResult {
  const value = input.trim().toLowerCase();
  if (value.length === 0) return { valid: false, reason: 'EMPTY' };
  if (value.length > EMAIL_MAX_LENGTH) return { valid: false, reason: 'TOO_LONG' };
  const at = value.indexOf('@');
  if (at <= 0 || at !== value.lastIndexOf('@')) return { valid: false, reason: 'MISSING_AT' };
  const domain = value.slice(at + 1);
  if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) return { valid: false, reason: 'INVALID_DOMAIN' };
  return { valid: true, normalized: value };
}
