import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { DesignSystemPage } from '../pages/design-system';

/**
 * Rotas da aplicação. `/design-system` é temporária (Etapa 2 — inventário
 * visual do Design System) e deve ser removida quando as telas reais
 * (Sidebar/Topbar/Dashboard) chegarem nas próximas etapas.
 */
export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/design-system', element: <DesignSystemPage /> },
]);
