/**
 * Validação de CEP (WILLI-7): aceita 00000-000 ou 8 dígitos e devolve o CEP normalizado.
 * Resultado tipado: nenhum erro é lançado por entrada inválida.
 */
export type CepValidationReason = 'EMPTY' | 'INVALID_LENGTH';

export type CepValidationResult = { valid: true; digits: string; formatted: string } | { valid: false; reason: CepValidationReason };

export function validateCep(input: string): CepValidationResult {
  const digits = input.replace(/\D+/g, '');
  if (digits.length === 0) return { valid: false, reason: 'EMPTY' };
  if (digits.length !== 8) return { valid: false, reason: 'INVALID_LENGTH' };
  return { valid: true, digits, formatted: `${digits.slice(0, 5)}-${digits.slice(5)}` };
}
