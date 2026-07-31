import type { ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { menuConfig } from '../lib/menu-config';
import { dsMenuItems } from '../lib/ds-menu-config';
import { DashboardPage } from '../modules/dashboard/DashboardPage';
import {
  BordasPage,
  CheckboxPage,
  CoresPage,
  DesignSystemComingSoonPage,
  DesignSystemLayout,
  EspacamentoPage,
  IconesPage,
  LayoutPage as DsLayoutPage,
  NavegacaoPage,
  RadiosPage,
  SombrasPage,
  TipografiaPage,
  TokensPage,
  VisaoGeralPage,
} from '../pages/design-system';
import { PlaceholderPage } from '../pages/placeholder';
import { AuthGuard, GuestGuard } from '../auth/guards';
import { LoginPage } from '../modules/auth/LoginPage';
import { ForgotPasswordPage } from '../modules/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../modules/auth/ResetPasswordPage';
import { CadastroPage } from '../modules/cadastro/CadastroPage';
import { UsuariosPage } from '../modules/usuarios/UsuariosPage';

/**
 * Overrides de conteúdo real por item de menu — o restante cai no
 * `PlaceholderPage` genérico (sem API de backend correspondente ainda).
 * Mesmo padrão de `dsContentByPath`, abaixo.
 */
const menuContentByPath: Record<string, ReactNode> = {
  '/configuracoes/usuarios': <UsuariosPage />,
};

const menuRoutes = menuConfig
  .flatMap((group) => group.items)
  .filter((item) => item.path !== '/')
  .map((item) => ({ path: item.path, element: menuContentByPath[item.path] ?? <PlaceholderPage title={item.label} /> }));

const dsContentByPath: Record<string, ReactNode> = {
  '/design-system/visao-geral': <VisaoGeralPage />,
  '/design-system/tokens': <TokensPage />,
  '/design-system/cores': <CoresPage />,
  '/design-system/tipografia': <TipografiaPage />,
  '/design-system/icones': <IconesPage />,
  '/design-system/espacamento': <EspacamentoPage />,
  '/design-system/sombras': <SombrasPage />,
  '/design-system/bordas': <BordasPage />,
  '/design-system/radios': <RadiosPage />,
  '/design-system/checkbox': <CheckboxPage />,
  '/design-system/layout': <DsLayoutPage />,
  '/design-system/navegacao': <NavegacaoPage />,
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
 *
 * Rotas públicas (`GuestGuard`) redirecionam para `/` se já houver sessão.
 * Todo o resto (portal + `/design-system`) fica atrás de `AuthGuard` — sem
 * login, tudo redireciona para `/login` (ver `src/auth/guards`).
 */
export const router = createBrowserRouter([
  {
    element: <GuestGuard />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/cadastro', element: <CadastroPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
    ],
  },
  {
    element: <AuthGuard />,
    children: [
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
    ],
  },
]);
