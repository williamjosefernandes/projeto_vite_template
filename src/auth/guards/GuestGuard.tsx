import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SessionLoadingScreen } from '../components';

/**
 * Guarda de layout para rotas públicas (Login, Cadastro, Esqueci senha...).
 * Um usuário já autenticado é redirecionado para o Dashboard em vez de ver
 * a tela de login novamente — exceto no meio do onboarding (login já emitido
 * pela confirmação de e-mail, mas `currentAccount` ainda `null` porque nenhuma
 * conta foi concluída): nesse caso ele fica preso em `/cadastro` para retomar
 * o rascunho em vez de cair num Dashboard sem conta nenhuma.
 */
export function GuestGuard() {
  const { isAuthenticated, isLoading, currentAccount } = useAuth();
  const location = useLocation();

  if (isLoading) return <SessionLoadingScreen />;

  if (isAuthenticated && !currentAccount) {
    return location.pathname === '/cadastro' ? <Outlet /> : <Navigate to="/cadastro" replace />;
  }

  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}
