import { CircleHelp, Moon, PanelLeft, Search, Sun } from 'lucide-react';
import { Avatar } from '../ui';
import { useTheme } from '../../hooks/useTheme';
import { useCurrentAccount, useCurrentUser } from '../../auth/hooks';
import { getUserFullName } from '../../auth/utils';
import { useSidebarStore } from '../../store/useSidebarStore';
import { AccountSwitcherMenu } from './AccountSwitcherMenu';
import { NotificationsPopover } from './NotificationsPopover';

export function Topbar() {
  const toggleCollapsed = useSidebarStore((s) => s.toggleCollapsed);
  const { theme, toggleTheme } = useTheme();
  const user = useCurrentUser();
  const { currentAccount } = useCurrentAccount();

  if (!user) return null;

  return (
    <header className="col-start-2 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
      <button
        type="button"
        onClick={toggleCollapsed}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        <PanelLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <div className="max-w-2xl flex-1">
        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 dark:bg-gray-800">
          <Search className="h-4 w-4 shrink-0 text-gray-400" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Buscar pessoas, registros, relatórios e mais..."
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-200"
          />
          <kbd className="hidden shrink-0 rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[11px] text-gray-400 sm:block dark:border-gray-700 dark:bg-gray-900">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-1">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Moon className="h-5 w-5" strokeWidth={1.5} />
          )}
        </button>

        <NotificationsPopover />

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <CircleHelp className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <AccountSwitcherMenu
          trigger={
            <button type="button" className="flex items-center gap-2 rounded-full py-1 pl-2 pr-1 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{getUserFullName(user)}</p>
                <p className="text-xs text-gray-400">{currentAccount?.profile.name}</p>
              </span>
              <Avatar>
                <Avatar.Fallback>{user.firstName.charAt(0)}</Avatar.Fallback>
              </Avatar>
            </button>
          }
        />
      </div>
    </header>
  );
}
