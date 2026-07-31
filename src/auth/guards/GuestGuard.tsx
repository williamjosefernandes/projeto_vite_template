import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SessionLoadingScreen } from '../components';

/**
 * Guarda de layout para rotas públicas (Login, Cadastro, Esqueci senha...).
 * Um usuário já autenticado é redirecionado para o Dashboard em vez de ver
 * a tela de login novamente.
 */
export function GuestGuard() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <SessionLoadingScreen />;
  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}
