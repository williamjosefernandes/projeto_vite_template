import type { ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { menuConfig } from '../lib/menu-config';
import { dsMenuItems } from '../lib/ds-menu-config';
import { DashboardPage } from '../modules/dashboard/DashboardPage';
import { DesignSystemComingSoonPage, DesignSystemLayout, TokensPage, VisaoGeralPage } from '../pages/design-system';
import { PlaceholderPage } from '../pages/placeholder';

const menuRoutes = menuConfig
  .flatMap((group) => group.items)
  .filter((item) => item.path !== '/')
  .map((item) => ({ path: item.path, element: <PlaceholderPage title={item.label} /> }));

const dsContentByPath: Record<string, ReactNode> = {
  '/design-system/visao-geral': <VisaoGeralPage />,
  '/design-system/tokens': <TokensPage />,
};

const dsRoutes = dsMenuItems.map((item) => ({
  path: item.path,
  element: dsContentByPath[item.path] ?? <DesignSystemComingSoonPage />,
}));

/**
 * Rotas da aplicação. `AppShell` (Sidebar + Topbar) envolve todas as rotas
 * do portal; cada item de `menuConfig` vira uma rota — hoje só o Dashboard
 * (`/`) tem conteúdo real, o resto é placeholder até as próximas etapas.
 *
 * `/design-system` é a documentação viva do Design System (ver
 * docs/ds-00-estrutura-e-visao-geral.md) — casca própria (`DesignSystemLayout`),
 * independente do `AppShell` do portal. Cada menu da sidebar de documentação
 * é uma sub-rota; a maioria ainda usa `DesignSystemComingSoonPage` até seu
 * respectivo prompt (DS-02 em diante) ser executado.
 */
export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [{ path: '/', element: <DashboardPage /> }, ...menuRoutes],
  },
  {
    path: '/design-system',
    element: <DesignSystemLayout />,
    children: [
      { index: true, element: <Navigate to="/design-system/visao-geral" replace /> },
      ...dsRoutes,
    ],
  },
]);
