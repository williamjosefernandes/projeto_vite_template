import type { ReactNode } from 'react';
import {
  Check,
  CircleHelp,
  Keyboard,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  User,
} from 'lucide-react';
import { DropdownMenu } from '../ui';
import { useCurrentAccount, useLogout } from '../../auth/hooks';
import { getAccountAvatarColorClass } from '../../lib/account-avatar';

const VISIBLE_ACCOUNTS_LIMIT = 5;

const accountActions = [
  { icon: User, label: 'Meu perfil' },
  { icon: Settings, label: 'Configurações da conta' },
  { icon: SlidersHorizontal, label: 'Preferências' },
  { icon: ShieldCheck, label: 'Segurança' },
];

const productActions = [
  { icon: Keyboard, label: 'Atalhos de teclado' },
  { icon: Sparkles, label: 'Novidades' },
  { icon: CircleHelp, label: 'Central de ajuda' },
];

interface AccountSwitcherMenuProps {
  trigger: ReactNode;
  align?: 'start' | 'end' | 'center';
  side?: 'top' | 'bottom';
}

/**
 * Menu "Minhas contas" — aberto tanto pelo avatar da topbar quanto pelo
 * card de usuário no rodapé da sidebar (ver `side`/`align` por trigger).
 */
export function AccountSwitcherMenu({ trigger, align = 'end', side = 'bottom' }: AccountSwitcherMenuProps) {
  const { accounts, currentAccount, switchAccount } = useCurrentAccount();
  const logout = useLogout();

  const visibleAccounts = accounts.slice(0, VISIBLE_ACCOUNTS_LIMIT);

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Content
        align={align}
        side={side}
        sideOffset={8}
        className="w-80 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <p className="px-3 pt-2 pb-1 text-xs font-medium uppercase tracking-wide text-gray-400">Minhas contas</p>
        <div className="space-y-0.5">
          {visibleAccounts.map((account) => {
            // `account.id` é o id do Membership (mesmo valor esperado por `switchAccount`) —
            // por isso compara contra `currentAccount.membership.id`, não contra `currentAccount.id`
            // (que é o id da Account, um UUID diferente).
            const isCurrent = account.id === currentAccount?.membership.id;
            return (
              <DropdownMenu.Item
                key={account.id}
                onSelect={() => switchAccount(account.id)}
                aria-current={isCurrent}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isCurrent ? 'bg-violet-50 dark:bg-violet-900/20' : ''
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold ${getAccountAvatarColorClass(account.id)}`}
                >
                  {account.name.charAt(0).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{account.name}</p>
                  <p className="truncate text-xs text-gray-400">
                    {account.profile}
                    {isCurrent && ' · Conta atual'}
                  </p>
                </span>
                {isCurrent && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </DropdownMenu.Item>
            );
          })}
        </div>
        {accounts.length > visibleAccounts.length && (
          <button
            type="button"
            className="w-full py-2 text-center text-sm font-medium text-violet-600 dark:text-violet-400"
          >
            Ver todas as contas ({accounts.length})
          </button>
        )}
        <DropdownMenu.Separator />
        {accountActions.map((item) => (
          <DropdownMenu.Item
            key={item.label}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <item.icon className="h-4 w-4" /> {item.label}
          </DropdownMenu.Item>
        ))}
        <DropdownMenu.Separator />
        {productActions.map((item) => (
          <DropdownMenu.Item
            key={item.label}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <item.icon className="h-4 w-4" /> {item.label}
          </DropdownMenu.Item>
        ))}
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          onSelect={() => logout.mutate()}
          disabled={logout.isPending}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4" /> Sair
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
