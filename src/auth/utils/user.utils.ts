import type { User } from '../types';

/** Nome completo para exibição — a API separa `firstName`/`lastName`, não há campo `name` único. */
export function getUserFullName(user: Pick<User, 'firstName' | 'lastName'>): string {
  return [user.firstName, user.lastName].filter(Boolean).join(' ');
}
