import { useState } from 'react';
import { ChevronDown, ChevronUp, CircleHelp } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { Avatar, Tooltip } from '../ui';
import { cn } from '../../lib/utils';
import { useCurrentAccount, useCurrentUser } from '../../auth/hooks';
import { getUserFullName } from '../../auth/utils';
import { useSidebarStore } from '../../store/useSidebarStore';
import { useVisibleMenu } from '../../hooks/useVisibleMenu';
import { AccountSwitcherMenu } from './AccountSwitcherMenu';
import type { MenuGroup, MenuItem } from '../../types/rbac';

function NavItemLink({ item, collapsed }: { item: MenuItem; collapsed: boolean }) {
  const link = (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        cn(
          'mx-2 flex items-center gap-3 rounded-lg px-4 py-2.5 text-[15px] font-medium transition-colors',
          collapsed && 'justify-center px-0',
          isActive
            ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/60',
        )
      }
    >
      <item.icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  );

  if (!collapsed) return link;

  return (
    <Tooltip>
      <Tooltip.Trigger asChild>{link}</Tooltip.Trigger>
      <Tooltip.Content side="right">{item.label}</Tooltip.Content>
    </Tooltip>
  );
}

function ModuleGroup({ group, collapsed }: { group: MenuGroup; collapsed: boolean }) {
  const location = useLocation();
  const hasActiveItem = group.items.some((item) => item.path === location.pathname);
  const [open, setOpen] = useState(hasActiveItem);
  const GroupIcon = group.items[0]?.icon;

  if (collapsed) {
    return (
      <div className="space-y-1">
        {group.items.map((item) => (
          <NavItemLink key={item.id} item={item} collapsed />
        ))}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mx-2 flex w-[calc(100%-1rem)] items-center gap-3 rounded-lg px-4 py-2.5 text-[15px] font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/60"
      >
        <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-md', group.colorClass)}>
          {GroupIcon && <GroupIcon className="h-4 w-4" strokeWidth={1.5} />}
        </span>
        <span className="truncate">{group.label}</span>
        <ChevronDown className={cn('ml-auto h-4 w-4 text-gray-400 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="mt-1 space-y-1">
          {group.items.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'mx-2 flex items-center gap-3 rounded-lg py-2 pl-12 pr-4 text-[15px] font-medium transition-colors',
                  isActive
                    ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/60',
                )
              }
            >
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const collapsed = useSidebarStore((s) => s.collapsed);
  const menuGroups = useVisibleMenu();
  const user = useCurrentUser();
  const { currentAccount } = useCurrentAccount();
  const [footerOpen, setFooterOpen] = useState(false);

  if (!user) return null;

  const navigationGroup = menuGroups.find((g) => !g.collapsible);
  const moduleGroups = menuGroups.filter((g) => g.collapsible);

  return (
    <aside className="row-span-2 flex flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className={cn('flex h-16 shrink-0 items-center gap-3 border-b border-gray-200 px-4 dark:border-gray-800', collapsed && 'justify-center px-0')}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-violet-600 text-violet-600">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
        </span>
        {!collapsed && (
          <span className="min-w-0">
            <p className="truncate text-base font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100">
              Sua Marca
            </p>
            <p className="truncate text-[11px] uppercase tracking-wide text-gray-400">Painel de Controle</p>
          </span>
        )}
      </div>

      <nav className="sidebar-scroll flex-1 overflow-y-auto py-2">
        {navigationGroup && (
          <div>
            {!collapsed && (
              <p className="mt-4 mb-2 px-4 text-xs font-medium uppercase tracking-wide text-gray-400">
                {navigationGroup.label}
              </p>
            )}
            <div className="space-y-1">
              {navigationGroup.items.map((item) => (
                <NavItemLink key={item.id} item={item} collapsed={collapsed} />
              ))}
            </div>
          </div>
        )}

        {moduleGroups.length > 0 && (
          <div>
            {!collapsed && (
              <p className="mt-4 mb-2 px-4 text-xs font-medium uppercase tracking-wide text-gray-400">Módulos</p>
            )}
            <div className="space-y-1">
              {moduleGroups.map((group) => (
                <ModuleGroup key={group.id} group={group} collapsed={collapsed} />
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="shrink-0 border-t border-gray-200 p-2 dark:border-gray-800">
        {collapsed ? (
          <Tooltip>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/60"
              >
                <CircleHelp className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">Central de Ajuda</Tooltip.Content>
          </Tooltip>
        ) : (
          <button
            type="button"
            className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/60"
          >
            <CircleHelp className="h-5 w-5" strokeWidth={1.5} />
            Central de Ajuda
          </button>
        )}

        <AccountSwitcherMenu
          side="top"
          align="start"
          trigger={
            <button
              type="button"
              onClick={() => setFooterOpen((v) => !v)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800/60',
                collapsed && 'justify-center px-0',
              )}
            >
              <Avatar>
                <Avatar.Fallback>{user.firstName.charAt(0)}</Avatar.Fallback>
              </Avatar>
              {!collapsed && (
                <>
                  <span className="min-w-0 flex-1 text-left">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{getUserFullName(user)}</p>
                    <p className="truncate text-xs text-gray-400">{currentAccount?.profile.name}</p>
                  </span>
                  {footerOpen ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                  )}
                </>
              )}
            </button>
          }
        />
      </div>
    </aside>
  );
}
