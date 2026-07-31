import type { AuthProvider } from '../../auth/types';
import type { MembershipStatus, UserStatus } from './enums';

/**
 * Usuário aninhado em cada item de `GET /users`. Shape tirado de
 * `users.service.ts::listUsers` (o endpoint não tem `@ApiStandardResponse` no
 * Swagger — o `select` do Prisma ali é a fonte de verdade real), não passa
 * pelo `toMeResponse`: traz `emailVerifiedAt` cru, não `emailVerified`.
 */
export interface AdminUserAccount {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  username: string;
  phone: string | null;
  avatar: string | null;
  status: UserStatus;
  authProvider: AuthProvider;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
}

export interface AdminUserProfile {
  id: string;
  accountId: string;
  type: 'SYSTEM' | 'CUSTOM';
  name: string;
  description: string | null;
  isDefault: boolean;
  isProtected: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Item de `content[]` de `GET /users` — é um `Membership`, não um `User` (por isso `id` aqui é o id do vínculo, não do usuário). */
export interface AdminUserListItem {
  id: string;
  accountId: string;
  userId: string;
  profileId: string;
  status: MembershipStatus;
  createdAt: string;
  updatedAt: string;
  user: AdminUserAccount;
  profile: AdminUserProfile;
}

/** `UserMeResponseDto` — devolvido por `POST /users` e `PUT /users/:id`. */
export interface UserAdminDetail {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  avatar: string | null;
  status: UserStatus;
  authProvider: AuthProvider;
  emailVerified: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

/** `ListUsersQueryDto`. */
export interface ListUsersQuery {
  page?: number;
  size?: number;
  /** Busca por nome ou e-mail. */
  search?: string;
  status?: MembershipStatus;
}

/** `CreateUserAdminDto`. */
export interface CreateUserAdminRequest {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  profileId: string;
}

/** `UpdateUserAdminDto`. */
export interface UpdateUserAdminRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

/** `UpdateUserStatusDto`. */
export interface UpdateUserStatusRequest {
  status: UserStatus;
}
