import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { MoreVertical, Pencil, ShieldEllipsis, Trash2 } from 'lucide-react';
import { Avatar, Badge, DropdownMenu, PermissionGate, Table } from '../../../components/ui';
import type { BadgeProps } from '../../../components/ui/Badge';
import type { AdminUserListItem, UserStatus } from '../../../users/types';
import { MEMBERSHIP_STATUS_META } from '../../../users/utils';

const USER_STATUS_BADGE: Record<UserStatus, { label: string; variant: BadgeProps['variant'] }> = {
  PENDING_EMAIL: { label: 'Pendente', variant: 'warning' },
  ACTIVE: { label: 'Ativo', variant: 'success' },
  BLOCKED: { label: 'Bloqueado', variant: 'danger' },
  SUSPENDED: { label: 'Suspenso', variant: 'neutral' },
};

interface RowActionsProps {
  item: AdminUserListItem;
  onEdit: (item: AdminUserListItem) => void;
  onChangeStatus: (item: AdminUserListItem) => void;
  onDelete: (item: AdminUserListItem) => void;
}

function RowActions({ item, onEdit, onChangeStatus, onDelete }: RowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label="Ações do usuário"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <PermissionGate permission="users.update">
          <DropdownMenu.Item onSelect={() => onEdit(item)}>
            <Pencil className="h-4 w-4" /> Editar
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => onChangeStatus(item)}>
            <ShieldEllipsis className="h-4 w-4" /> Alterar status
          </DropdownMenu.Item>
        </PermissionGate>
        <PermissionGate permission="users.delete">
          <DropdownMenu.Item
            onSelect={() => onDelete(item)}
            className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4" /> Remover
          </DropdownMenu.Item>
        </PermissionGate>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}

export interface UsuariosTableProps {
  items: AdminUserListItem[];
  pagination: PaginationState;
  pageCount: number;
  onPaginationChange: (pagination: PaginationState) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onEdit: (item: AdminUserListItem) => void;
  onChangeStatus: (item: AdminUserListItem) => void;
  onDelete: (item: AdminUserListItem) => void;
}

/** Tabela server-side de `GET /users` — busca, paginação e dados vêm todos da API (ver `components/ui/Table` em modo servidor). */
export function UsuariosTable({
  items,
  pagination,
  pageCount,
  onPaginationChange,
  search,
  onSearchChange,
  onEdit,
  onChangeStatus,
  onDelete,
}: UsuariosTableProps) {
  const columns: ColumnDef<AdminUserListItem, any>[] = [
    {
      id: 'nome',
      header: 'Nome',
      cell: ({ row }) => {
        const { user } = row.original;
        const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
        return (
          <div className="flex min-w-0 items-center gap-3">
            <Avatar>
              {user.avatar && <Avatar.Image src={user.avatar} alt={fullName} />}
              <Avatar.Fallback>{user.firstName.charAt(0).toUpperCase()}</Avatar.Fallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate font-medium text-gray-900 dark:text-gray-100">{fullName}</p>
              <p className="truncate text-xs text-gray-400">{user.email ?? user.username}</p>
            </div>
          </div>
        );
      },
    },
    {
      id: 'telefone',
      header: 'Telefone',
      cell: ({ row }) => row.original.user.phone ?? '—',
    },
    {
      id: 'perfil',
      header: 'Perfil',
      cell: ({ row }) => row.original.profile.name,
    },
    {
      id: 'statusUsuario',
      header: 'Status do usuário',
      cell: ({ row }) => {
        const meta = USER_STATUS_BADGE[row.original.user.status];
        return <Badge variant={meta.variant}>{meta.label}</Badge>;
      },
    },
    {
      id: 'vinculo',
      header: 'Vínculo',
      cell: ({ row }) => {
        const meta = MEMBERSHIP_STATUS_META[row.original.status];
        return <Badge variant={meta.variant}>{meta.label}</Badge>;
      },
    },
    {
      id: 'ultimoLogin',
      header: 'Último login',
      cell: ({ row }) =>
        row.original.user.lastLoginAt ? new Date(row.original.user.lastLoginAt).toLocaleDateString('pt-BR') : 'Nunca',
    },
    {
      id: 'acoes',
      header: '',
      cell: ({ row }) => (
        <div className="flex justify-end">
          <RowActions item={row.original} onEdit={onEdit} onChangeStatus={onChangeStatus} onDelete={onDelete} />
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={items}
      filterPlaceholder="Buscar por nome ou e-mail…"
      globalFilter={search}
      onGlobalFilterChange={onSearchChange}
      manualPagination
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      emptyTitle="Nenhum usuário encontrado"
      emptyDescription="Ajuste a busca ou os filtros, ou convide um novo usuário para esta conta."
    />
  );
}
