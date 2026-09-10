/** Formatação de moeda em reais (WILLI-8): número → "R$ 1.234,56", com resultado tipado. */
export type CurrencyFormatReason = 'NOT_FINITE';
export type CurrencyFormatResult = { valid: true; formatted: string } | { valid: false; reason: CurrencyFormatReason };

export function formatCurrencyBRL(value: number): CurrencyFormatResult {
  if (!Number.isFinite(value)) return { valid: false, reason: 'NOT_FINITE' };
  const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value).replace(/\u00a0/g, ' ');
  return { valid: true, formatted };
}
