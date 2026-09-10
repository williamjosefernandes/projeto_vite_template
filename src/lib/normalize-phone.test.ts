import { describe, expect, it } from 'vitest';
import { normalizePhone } from './normalize-phone';

describe('normalizePhone', () => {
  it('remove a máscara e separa DDD e número', () => {
    expect(normalizePhone('(48) 99876-5432')).toEqual({ valid: true, digits: '48998765432', areaCode: '48', number: '998765432' });
    expect(normalizePhone('48 3232-1000')).toEqual({ valid: true, digits: '4832321000', areaCode: '48', number: '32321000' });
  });

  it('rejeita vazio, sem DDD, tamanho inválido e DDD inválido', () => {
    expect(normalizePhone('')).toEqual({ valid: false, reason: 'EMPTY' });
    expect(normalizePhone('99876-5432')).toEqual({ valid: false, reason: 'MISSING_AREA_CODE' });
    expect(normalizePhone('123')).toEqual({ valid: false, reason: 'INVALID_LENGTH' });
    expect(normalizePhone('(01) 99876-5432')).toEqual({ valid: false, reason: 'INVALID_AREA_CODE' });
  });
});
