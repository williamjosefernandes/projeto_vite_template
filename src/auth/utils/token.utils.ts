import type { AuthTokens } from '../types';

/** Timestamp (ms) em que o access token expira, a partir de `expiresIn` (segundos). */
export function computeExpiresAt(tokens: Pick<AuthTokens, 'expiresIn'>, from = Date.now()): number {
  return from + tokens.expiresIn * 1000;
}

export function isTokenExpired(expiresAt: number, now = Date.now()): boolean {
  return now >= expiresAt;
}
