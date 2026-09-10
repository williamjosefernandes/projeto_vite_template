import { describe, expect, it } from 'vitest';
import { CEP_LENGTH, validateCep } from './validate-cep';

describe('validateCep', () => {
  it('aceita 8 dígitos com ou sem hífen e normaliza', () => {
    expect(validateCep('88015-100')).toEqual({ valid: true, digits: '88015100', formatted: '88015-100' });
    expect(validateCep('88015100')).toEqual({ valid: true, digits: '88015100', formatted: '88015-100' });
  });

  it('rejeita vazio e tamanho inválido', () => {
    expect(validateCep('')).toEqual({ valid: false, reason: 'EMPTY' });
    expect(validateCep('8801-100')).toEqual({ valid: false, reason: 'INVALID_LENGTH' });
  });

  it('ignora letras, rejeita o CEP reservado e expõe o tamanho', () => {
    expect(validateCep('88a015-1b00')).toEqual({ valid: true, digits: '88015100', formatted: '88015-100' });
    expect(validateCep('00000-000')).toEqual({ valid: false, reason: 'RESERVED' });
    expect(CEP_LENGTH).toBe(8);
  });
});
