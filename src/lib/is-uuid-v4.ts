/**
 * Validação de UUID v4 (WILLI-9). Resultado tipado com o motivo: vazio, formato ou versão.
 */
export type UuidValidationReason = 'EMPTY' | 'INVALID_FORMAT' | 'WRONG_VERSION';

export type UuidValidationResult = { valid: true; normalized: string } | { valid: false; reason: UuidValidationReason };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuidV4(value: string): UuidValidationResult {
  const v = value.trim();
  if (v.length === 0) return { valid: false, reason: 'EMPTY' };
  if (!UUID.test(v)) return { valid: false, reason: 'INVALID_FORMAT' };
  return { valid: true, normalized: v.toLowerCase() };
}
