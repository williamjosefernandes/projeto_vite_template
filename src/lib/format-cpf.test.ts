import { describe, expect, it } from 'vitest';
import { formatCpf } from './format-cpf';

describe('formatCpf', () => {
  it('aplica a máscara a 11 dígitos, com ou sem pontuação na entrada', () => {
    expect(formatCpf('12345678909')).toEqual({ valid: true, formatted: '123.456.789-09', digits: '12345678909' });
    expect(formatCpf('123.456.789-09')).toEqual({ valid: true, formatted: '123.456.789-09', digits: '12345678909' });
  });

  it('rejeita vazio e tamanho inválido com motivo tipado', () => {
    expect(formatCpf('')).toEqual({ valid: false, reason: 'EMPTY' });
    expect(formatCpf('1234567890')).toEqual({ valid: false, reason: 'INVALID_LENGTH' });
    expect(formatCpf('123456789012')).toEqual({ valid: false, reason: 'INVALID_LENGTH' });
  });
});
