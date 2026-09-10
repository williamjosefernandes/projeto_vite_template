/**
 * Validação de CEP (WILLI-7): aceita 00000-000 ou 8 dígitos e devolve o CEP normalizado.
 * Resultado tipado: nenhum erro é lançado por entrada inválida.
 *
 * @example validateCep('88015-100') // { valid: true, digits: '88015100', formatted: '88015-100' }
 */
export type CepValidationReason = 'EMPTY' | 'INVALID_LENGTH' | 'RESERVED';

export const CEP_LENGTH = 8;

export type CepValidationResult = { valid: true; digits: string; formatted: string } | { valid: false; reason: CepValidationReason };

export function validateCep(input: string): CepValidationResult {
  const digits = input.replace(/\D+/g, '');
  if (digits.length === 0) return { valid: false, reason: 'EMPTY' };
  if (digits.length !== CEP_LENGTH) return { valid: false, reason: 'INVALID_LENGTH' };
  if (digits === '00000000') return { valid: false, reason: 'RESERVED' };
  return { valid: true, digits, formatted: `${digits.slice(0, 5)}-${digits.slice(5)}` };
}
