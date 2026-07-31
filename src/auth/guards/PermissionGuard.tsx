import { Navigate, Outlet } from 'react-router-dom';
import { usePermission } from '../../hooks/usePermission';

export interface PermissionGuardProps {
  permission: string | string[];
  redirectTo?: string;
}

/**
 * Guarda de rota por permissão — para condicionar uma subárvore inteira de
 * rotas (ver `router.tsx`). Para um bloco isolado dentro de uma página, use
 * `PermissionGate` (`src/components/ui/permission-gate`).
 */
export function PermissionGuard({ permission, redirectTo = '/' }: PermissionGuardProps) {
  const allowed = usePermission(permission);
  if (!allowed) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
}
