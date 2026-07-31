import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SessionLoadingScreen } from '../components';

/**
 * Guarda de layout para rotas privadas (ver `src/routes/router.tsx`).
 * Aguarda a sessão persistida terminar de restaurar antes de decidir —
 * evita redirecionar para `/login` no meio de um refresh de página.
 */
export function AuthGuard() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <SessionLoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
}
