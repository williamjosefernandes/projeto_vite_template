import { useEffect, useState } from 'react';
import { UserPlus, Users } from 'lucide-react';
import { Button, Card, EmptyState, PermissionGate, Select, Skeleton, Typography } from '../../components/ui';
import { usePermission } from '../../hooks/usePermission';
import { useCreateUser, useDeleteUser, useUpdateUser, useUpdateUserStatus, useUsersList } from '../../users/hooks';
import type { AdminUserListItem, MembershipStatus } from '../../users/types';
import { AlterarStatusModal } from './components/AlterarStatusModal';
import { CriarUsuarioModal } from './components/CriarUsuarioModal';
import { EditarUsuarioModal } from './components/EditarUsuarioModal';
import { ExcluirUsuarioDialog } from './components/ExcluirUsuarioDialog';
import { UsuariosTable } from './components/UsuariosTable';

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 400;

const STATUS_FILTER_OPTIONS: { value: MembershipStatus; label: string }[] = [
  { value: 'ACTIVE', label: 'Ativo' },
  { value: 'INVITED', label: 'Convidado' },
  { value: 'SUSPENDED', label: 'Suspenso' },
  { value: 'REMOVED', label: 'Removido' },
];

/** class-validator `@IsOptional()` só ignora `undefined` — string vazia falharia `@Matches`/`@IsEmail` no backend. */
function toOptional(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function fullName(user: { firstName: string; lastName: string | null }) {
  return [user.firstName, user.lastName].filter(Boolean).join(' ');
}

/**
 * `/configuracoes/usuarios` — administração de usuários da conta ativa.
 * Cobre `GET/POST/PUT/DELETE /v1/users` + `PATCH /v1/users/:id/status`.
 */
export function UsuariosPage() {
  const canRead = usePermission('users.read');

  const [pageIndex, setPageIndex] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<MembershipStatus | undefined>(undefined);

  const [creating, setCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminUserListItem | null>(null);
  const [statusItem, setStatusItem] = useState<AdminUserListItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<AdminUserListItem | null>(null);

  // Busca dispara na API (nunca filtra localmente) — debounced para não disparar uma requisição por tecla.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPageIndex(0);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const query = useUsersList(
    { page: pageIndex + 1, size: PAGE_SIZE, search: toOptional(debouncedSearch), status: statusFilter },
    { enabled: canRead },
  );

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const updateUserStatus = useUpdateUserStatus();

  if (!canRead) {
    return (
      <EmptyState
        icon={<Users className="h-6 w-6" strokeWidth={1.5} />}
        title="Sem permissão"
        description="Você não tem permissão para visualizar os usuários desta conta. Fale com o administrador da conta para solicitar acesso."
      />
    );
  }

  const page = query.data;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Typography variant="h1">Usuários</Typography>
          <Typography variant="body" className="mt-1">
            Gerencie os usuários com acesso a esta conta.
          </Typography>
        </div>
        <PermissionGate permission="users.create">
          <Button onClick={() => setCreating(true)}>
            <UserPlus className="h-4 w-4" />
            Novo usuário
          </Button>
        </PermissionGate>
      </div>

      <Card>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Select
            value={statusFilter ?? 'ALL'}
            onValueChange={(value) => {
              setStatusFilter(value === 'ALL' ? undefined : (value as MembershipStatus));
              setPageIndex(0);
            }}
          >
            <Select.Trigger className="w-48">
              <Select.Value placeholder="Todos os vínculos" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="ALL">Todos os vínculos</Select.Item>
              {STATUS_FILTER_OPTIONS.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>

        {query.isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-14 w-full" />
            ))}
          </div>
        ) : query.isError ? (
          <EmptyState title="Não foi possível carregar os usuários" description="Tente novamente em instantes." />
        ) : (
          <UsuariosTable
            items={page?.content ?? []}
            pagination={{ pageIndex, pageSize: PAGE_SIZE }}
            pageCount={page?.totalPages ?? 1}
            onPaginationChange={(next) => setPageIndex(next.pageIndex)}
            search={searchInput}
            onSearchChange={setSearchInput}
            onEdit={setEditingItem}
            onChangeStatus={setStatusItem}
            onDelete={setDeletingItem}
          />
        )}
      </Card>

      <CriarUsuarioModal
        open={creating}
        onOpenChange={setCreating}
        isSubmitting={createUser.isPending}
        onSubmit={(data) =>
          createUser.mutate(
            {
              firstName: data.firstName,
              lastName: toOptional(data.lastName),
              email: data.email,
              phone: toOptional(data.phone),
              profileId: data.profileId,
            },
            { onSuccess: () => setCreating(false) },
          )
        }
      />

      {editingItem && (
        <EditarUsuarioModal
          key={editingItem.userId}
          open
          onOpenChange={(open) => !open && setEditingItem(null)}
          initialValues={{
            firstName: editingItem.user.firstName,
            lastName: editingItem.user.lastName ?? '',
            phone: editingItem.user.phone ?? '',
          }}
          isSubmitting={updateUser.isPending}
          onSubmit={(data) =>
            updateUser.mutate(
              {
                id: editingItem.userId,
                payload: {
                  firstName: data.firstName,
                  lastName: toOptional(data.lastName),
                  phone: toOptional(data.phone),
                },
              },
              { onSuccess: () => setEditingItem(null) },
            )
          }
        />
      )}

      {statusItem && (
        <AlterarStatusModal
          key={statusItem.userId}
          open
          onOpenChange={(open) => !open && setStatusItem(null)}
          currentStatus={statusItem.user.status}
          isSubmitting={updateUserStatus.isPending}
          onSubmit={(data) =>
            updateUserStatus.mutate({ id: statusItem.userId, payload: data }, { onSuccess: () => setStatusItem(null) })
          }
        />
      )}

      {deletingItem && (
        <ExcluirUsuarioDialog
          open
          onOpenChange={(open) => !open && setDeletingItem(null)}
          userName={fullName(deletingItem.user)}
          isSubmitting={deleteUser.isPending}
          onConfirm={() => deleteUser.mutate(deletingItem.userId, { onSuccess: () => setDeletingItem(null) })}
        />
      )}
    </div>
  );
}
