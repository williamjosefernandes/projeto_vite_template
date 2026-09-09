import { describe, expect, it } from 'vitest';
import { validateEmail } from './validate-email';

describe('validateEmail', () => {
  it('aceita e normaliza um e-mail válido', () => {
    expect(validateEmail('  Contato@Exemplo.com ')).toEqual({ valid: true, normalized: 'contato@exemplo.com' });
  });

  it('rejeita vazio, sem @ e domínio sem ponto', () => {
    expect(validateEmail('')).toEqual({ valid: false, reason: 'EMPTY' });
    expect(validateEmail('contato.exemplo.com')).toEqual({ valid: false, reason: 'MISSING_AT' });
    expect(validateEmail('contato@exemplo')).toEqual({ valid: false, reason: 'INVALID_DOMAIN' });
  });
});
