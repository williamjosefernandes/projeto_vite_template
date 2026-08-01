import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SessionLoadingScreen } from '../components';

/**
 * Guarda de layout para rotas privadas (ver `src/routes/router.tsx`).
 * Aguarda a sessão persistida terminar de restaurar antes de decidir —
 * evita redirecionar para `/login` no meio de um refresh de página.
 * Um usuário autenticado sem `currentAccount` (onboarding iniciado mas não
 * concluído) é mandado de volta para `/cadastro` em vez de renderizar o
 * `AppShell` sem nenhuma conta.
 */
export function AuthGuard() {
  const { isAuthenticated, isLoading, currentAccount } = useAuth();
  const location = useLocation();

  if (isLoading) return <SessionLoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!currentAccount) return <Navigate to="/cadastro" replace />;

  return <Outlet />;
}
