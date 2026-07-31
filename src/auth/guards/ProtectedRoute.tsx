import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SessionLoadingScreen } from '../components';

export interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Variante de `AuthGuard` para proteger um elemento pontual em vez de uma
 * subárvore de rotas via `Outlet` — útil fora de `router.tsx` (ex.: um
 * componente montado condicionalmente).
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <SessionLoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;

  return <>{children}</>;
}
