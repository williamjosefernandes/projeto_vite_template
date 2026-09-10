import { describe, expect, it } from 'vitest';
import { isUuidV4 } from './is-uuid-v4';

describe('isUuidV4', () => {
  it('aceita UUID v4 em minúsculas e maiúsculas', () => {
    expect(isUuidV4('9b2e4c1a-3f5d-4b8e-9a1c-7d6e5f4a3b2c')).toEqual({ valid: true, normalized: '9b2e4c1a-3f5d-4b8e-9a1c-7d6e5f4a3b2c' });
    expect(isUuidV4('9B2E4C1A-3F5D-4B8E-9A1C-7D6E5F4A3B2C').valid).toBe(true);
  });

  it('rejeita vazio e formato inválido', () => {
    expect(isUuidV4('')).toEqual({ valid: false, reason: 'EMPTY' });
    expect(isUuidV4('nao-e-uuid')).toEqual({ valid: false, reason: 'INVALID_FORMAT' });
  });

  it('rejeita UUID de outra versão ou variante', () => {
    expect(isUuidV4('9b2e4c1a-3f5d-1b8e-9a1c-7d6e5f4a3b2c')).toEqual({ valid: false, reason: 'WRONG_VERSION' });
    expect(isUuidV4('9b2e4c1a-3f5d-4b8e-1a1c-7d6e5f4a3b2c')).toEqual({ valid: false, reason: 'WRONG_VERSION' });
  });
});
