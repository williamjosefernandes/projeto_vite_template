import type { ReactNode } from 'react';
import { usePermission } from '../../../hooks/usePermission';

export interface PermissionGateProps {
  permission: string | string[];
  children: ReactNode;
  /** Renderizado quando a permissão falta. Por padrão não renderiza nada. */
  fallback?: ReactNode;
}

/**
 * Guarda declarativa de RBAC: renderiza `children` só se a conta ativa tiver
 * a(s) permissão(ões) informada(s) (ver `usePermission`). Reutilizável por
 * qualquer módulo — não é específico do Dashboard.
 */
export function PermissionGate({ permission, children, fallback = null }: PermissionGateProps) {
  const allowed = usePermission(permission);
  return <>{allowed ? children : fallback}</>;
}
