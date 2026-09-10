import { describe, expect, it } from 'vitest';
import { formatCurrencyBRL } from './format-currency-brl';

describe('formatCurrencyBRL', () => {
  it('formata 1234.5 como R$ 1.234,50', () => {
    expect(formatCurrencyBRL(1234.5)).toEqual({ valid: true, formatted: 'R$ 1.234,50' });
  });

  it('formata zero e negativos', () => {
    expect(formatCurrencyBRL(0)).toEqual({ valid: true, formatted: 'R$ 0,00' });
    expect(formatCurrencyBRL(-9.9)).toEqual({ valid: true, formatted: '-R$ 9,90' });
  });

  it('devolve erro tipado para valores não finitos', () => {
    expect(formatCurrencyBRL(Number.NaN)).toEqual({ valid: false, reason: 'NOT_FINITE' });
    expect(formatCurrencyBRL(Number.POSITIVE_INFINITY)).toEqual({ valid: false, reason: 'NOT_FINITE' });
  });
});
