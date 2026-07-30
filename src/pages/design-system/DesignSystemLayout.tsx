import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Button, Typography } from '../../components/ui';
import { DesignSystemSidebar } from '../../components/layout/DesignSystemSidebar';
import { dsMenuItems } from '../../lib/ds-menu-config';

function FigmaIcon() {
  return (
    <span className="grid h-4 w-4 shrink-0 grid-cols-2 grid-rows-2 gap-px overflow-hidden rounded-[3px]">
      <span className="bg-orange-500" />
      <span className="bg-purple-500" />
      <span className="bg-green-500" />
      <span className="bg-blue-500" />
    </span>
  );
}

/**
 * Casca da documentação viva do Design System: `DesignSystemSidebar` +
 * topbar (H1/subtítulo derivados da rota ativa + "Ver no Figma") + `Outlet`.
 * Ver docs/ds-00-estrutura-e-visao-geral.md.
 */
export function DesignSystemLayout() {
  const location = useLocation();
  const activeItem = dsMenuItems.find((item) => item.path === location.pathname);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <DesignSystemSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="sticky top-0 z-10 flex shrink-0 items-start justify-between gap-4 border-b border-gray-200 bg-gray-50/95 px-8 py-6 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
          <div>
            <Typography as="h1" variant="h1" className="text-2xl">
              {activeItem?.label ?? 'Design System'}
            </Typography>
            {activeItem?.description && (
              <Typography className="mt-1 text-sm">{activeItem.description}</Typography>
            )}
          </div>
          <Button variant="secondary" size="sm" className="shrink-0">
            <FigmaIcon />
            Ver no Figma
          </Button>
        </header>
        <main className="flex-1 px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
