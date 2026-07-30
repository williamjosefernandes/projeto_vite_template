import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Tooltip } from '../ui';
import { useSidebarStore } from '../../store/useSidebarStore';
import { useVisibleMenu } from '../../hooks/useVisibleMenu';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

/**
 * Casca de três níveis do portal: Sidebar (grid row-span-2) + Topbar +
 * área de conteúdo (Outlet do react-router). Redireciona para a primeira
 * rota visível se a rota atual deixar de ser permitida (ex.: após trocar
 * de conta para uma com menos permissões).
 */
export function AppShell() {
  const collapsed = useSidebarStore((s) => s.collapsed);
  const menuGroups = useVisibleMenu();
  const location = useLocation();

  const visiblePaths = menuGroups.flatMap((group) => group.items.map((item) => item.path));
  const isCurrentRouteVisible = visiblePaths.includes(location.pathname);
  const fallbackPath = visiblePaths[0] ?? '/';

  useEffect(() => {
    document.title = 'Sua Marca — Painel de Controle';
  }, []);

  if (!isCurrentRouteVisible && fallbackPath !== location.pathname) {
    return <Navigate to={fallbackPath} replace />;
  }

  return (
    <Tooltip.Provider>
      <div
        className={cn(
          'grid h-screen grid-rows-[64px_1fr] bg-gray-50 transition-[grid-template-columns] duration-200 dark:bg-gray-950',
          collapsed ? 'grid-cols-[80px_1fr]' : 'grid-cols-[280px_1fr]',
        )}
      >
        <Sidebar />
        <Topbar />
        <main className="col-start-2 row-start-2 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </Tooltip.Provider>
  );
}
