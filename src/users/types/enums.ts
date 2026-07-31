/**
 * `UserStatus` do Prisma — contrato documentado/validado por `UpdateUserStatusDto`
 * (`PATCH /users/:id/status`). Ver docs/09 — o backend grava esse valor em
 * `Membership.status` (`MembershipStatus`), enum diferente e sem `PENDING_EMAIL`/
 * `BLOCKED`; seguimos o contrato documentado, não o comportamento real do service.
 */
export type UserStatus = 'PENDING_EMAIL' | 'ACTIVE' | 'BLOCKED' | 'SUSPENDED';

/**
 * `MembershipStatus` do Prisma — usado apenas para filtrar a listagem
 * (`ListUsersQueryDto.status` e o `status` de cada item de `content[]`).
 * Enum DIFERENTE de `UserStatus` acima — nunca reaproveitar um pelo outro.
 */
export type MembershipStatus = 'ACTIVE' | 'INVITED' | 'SUSPENDED' | 'REMOVED';
