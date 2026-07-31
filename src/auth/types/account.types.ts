import type { ComponentKey, MenuKey, Permission } from './rbac.types';

/** `CurrentMembershipDto` — vínculo do usuário com a conta ativa. */
export interface Membership {
  id: string;
  isOwner: boolean;
  status: string;
}

/** `CurrentProfileDto` — perfil funcional do usuário dentro da conta ativa. */
export interface Profile {
  id: string;
  code: string;
  name: string;
}

/** `CurrentAccountDto` — conta atualmente selecionada, com RBAC já resolvido para ela. */
export interface CurrentAccount {
  id: string;
  type: string;
  name: string;
  logo?: string;
  membership: Membership;
  profile: Profile;
  permissions: Permission[];
  menus: MenuKey[];
  components: ComponentKey[];
}

/** `AccountListItemDto` — item de `accounts[]`. `id` é o identificador a usar em `switchAccount` (membership). */
export interface Account {
  id: string;
  name: string;
  type: string;
  logo?: string;
  /** Nome/código do perfil do usuário nessa conta — string simples, sem RBAC (só a conta ativa traz `permissions`/`menus`/`components`). */
  profile: string;
}
