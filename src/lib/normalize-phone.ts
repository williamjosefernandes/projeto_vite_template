/**
 * Normalização de telefone brasileiro com DDD (WILLI-6).
 *
 * Remove máscara e devolve só os dígitos. O resultado é tipado: quem chama decide como
 * apresentar o motivo, e nenhum erro é lançado por entrada inválida.
 */
export type PhoneValidationReason = 'EMPTY' | 'MISSING_AREA_CODE' | 'INVALID_LENGTH' | 'INVALID_AREA_CODE';

export type PhoneNormalizationResult = { valid: true; digits: string; areaCode: string; number: string } | { valid: false; reason: PhoneValidationReason };

export function normalizePhone(input: string): PhoneNormalizationResult {
  const digits = input.replace(/\D+/g, '');
  if (digits.length === 0) return { valid: false, reason: 'EMPTY' };
  if (digits.length < 10) return { valid: false, reason: digits.length <= 9 && digits.length >= 8 ? 'MISSING_AREA_CODE' : 'INVALID_LENGTH' };
  if (digits.length > 11) return { valid: false, reason: 'INVALID_LENGTH' };
  const areaCode = digits.slice(0, 2);
  if (areaCode.startsWith('0') || areaCode === '00') return { valid: false, reason: 'INVALID_AREA_CODE' };
  return { valid: true, digits, areaCode, number: digits.slice(2) };
}
