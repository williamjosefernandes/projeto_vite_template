import { Navigate, Outlet } from 'react-router-dom';
import { useMenu } from '../hooks/useMenu';

export interface MenuGuardProps {
  menuKey: string;
  redirectTo?: string;
}

/** Guarda de rota por menu autorizado (`CurrentAccountDto.menus`) — ver `useMenu`. */
export function MenuGuard({ menuKey, redirectTo = '/' }: MenuGuardProps) {
  const isVisible = useMenu(menuKey);
  if (!isVisible) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
}
