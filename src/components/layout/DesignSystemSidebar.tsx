import { Moon, Search, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { dsMenuGroups } from '../../lib/ds-menu-config';
import { useTheme } from '../../hooks/useTheme';

/**
 * Sidebar própria da documentação viva do Design System — independente da
 * `Sidebar` do portal (sem RBAC). Ver docs/ds-00-estrutura-e-visao-geral.md.
 */
export function DesignSystemSidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="row-span-2 flex w-[280px] shrink-0 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-gray-200 px-4 dark:border-gray-800">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-violet-600 text-violet-600">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
        </span>
        <span className="min-w-0">
          <p className="truncate text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100">
            Sua Marca
          </p>
          <p className="truncate text-xs text-gray-400">Design System</p>
        </span>
      </div>

      <div className="shrink-0 p-4 pb-2">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400 dark:border-gray-800 dark:bg-gray-800/60">
          <Search className="h-4 w-4 shrink-0" />
          <span className="flex-1 truncate">Buscar componentes...</span>
          <kbd className="shrink-0 rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400 dark:border-gray-700 dark:bg-gray-900">
            ⌘K
          </kbd>
        </div>
      </div>

      <nav className="sidebar-scroll flex-1 overflow-y-auto px-2 pb-2">
        {dsMenuGroups.map((group) => (
          <div key={group.id} className="mb-2">
            <p className="mt-4 mb-2 px-2 text-xs font-medium uppercase tracking-wide text-gray-400">{group.label}</p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/60',
                    )
                  }
                >
                  <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-gray-200 p-2 dark:border-gray-800">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800/60"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </span>
          <span className="min-w-0 flex-1">
            <p className="truncate text-xs text-gray-400">Tema atual</p>
            <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
              {theme === 'dark' ? 'Escuro' : 'Claro'}
            </p>
          </span>
        </button>
      </div>
    </aside>
  );
}
