import { http } from '../../api/http';
import type { ApiResponse } from '../../auth/types';
import type { Paginated } from '../../types/pagination';
import type {
  AdminUserListItem,
  CreateUserAdminRequest,
  ListUsersQuery,
  UpdateUserAdminRequest,
  UpdateUserStatusRequest,
  UserAdminDetail,
} from '../types';

/**
 * Chamadas HTTP cruas de administração de usuários (`/v1/users`, escopo de conta).
 * Todos exigem Membership ativo — `x-account-id` é injetado automaticamente
 * pelo interceptor de `src/api/http.ts` a partir da conta ativa da store.
 */
export const usersApi = {
  listUsers: (query: ListUsersQuery) =>
    http
      .get<ApiResponse<Paginated<AdminUserListItem>>>('/users', { params: query })
      .then((res) => res.data.data!),

  createUser: (payload: CreateUserAdminRequest) =>
    http.post<ApiResponse<UserAdminDetail>>('/users', payload).then((res) => res.data.data!),

  updateUser: (id: string, payload: UpdateUserAdminRequest) =>
    http.put<ApiResponse<UserAdminDetail>>(`/users/${id}`, payload).then((res) => res.data.data!),

  /** Soft delete — `204 No Content`, sem envelope de resposta (`@SkipTransform` no backend). */
  deleteUser: (id: string) => http.delete<void>(`/users/${id}`),

  updateUserStatus: (id: string, payload: UpdateUserStatusRequest) =>
    http.patch<ApiResponse<void>>(`/users/${id}/status`, payload),
};
