import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { menuConfig } from '../lib/menu-config';
import { DashboardPage } from '../modules/dashboard/DashboardPage';
import { DesignSystemPage } from '../pages/design-system';
import { PlaceholderPage } from '../pages/placeholder';

const menuRoutes = menuConfig
  .flatMap((group) => group.items)
  .filter((item) => item.path !== '/')
  .map((item) => ({ path: item.path, element: <PlaceholderPage title={item.label} /> }));

/**
 * Rotas da aplicação. `AppShell` (Sidebar + Topbar) envolve todas as rotas
 * do portal; cada item de `menuConfig` vira uma rota — hoje só o Dashboard
 * (`/`) tem conteúdo real, o resto é placeholder até as próximas etapas.
 *
 * `/design-system` é temporária (Etapa 2 — inventário visual) e deve ser
 * removida quando todas as telas reais existirem.
 */
export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [{ path: '/', element: <DashboardPage /> }, ...menuRoutes],
  },
  { path: '/design-system', element: <DesignSystemPage /> },
]);
