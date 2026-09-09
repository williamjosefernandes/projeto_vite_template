/**
 * Máscara de CPF reutilizável (WILLI-5): 000.000.000-00.
 *
 * Recebe qualquer entrada, mantém só os dígitos e devolve um resultado tipado. Tamanho
 * diferente de 11 dígitos é erro declarado, e não uma máscara pela metade.
 */
export type CpfFormatReason = 'EMPTY' | 'INVALID_LENGTH';

export type CpfFormatResult = { valid: true; formatted: string; digits: string } | { valid: false; reason: CpfFormatReason };

export const CPF_LENGTH = 11;

export function formatCpf(input: string): CpfFormatResult {
  const digits = input.replace(/\D+/g, '');
  if (digits.length === 0) return { valid: false, reason: 'EMPTY' };
  if (digits.length !== CPF_LENGTH) return { valid: false, reason: 'INVALID_LENGTH' };
  const formatted = `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  return { valid: true, formatted, digits };
}
