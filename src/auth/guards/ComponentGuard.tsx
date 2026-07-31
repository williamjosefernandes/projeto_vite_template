import type { ReactNode } from 'react';
import { useComponent } from '../hooks/useComponent';

export interface ComponentGuardProps {
  component: string;
  children: ReactNode;
  /** Renderizado quando o componente não está liberado. Por padrão não renderiza nada. */
  fallback?: ReactNode;
}

/**
 * Guarda declarativa por componente granular (`components[]` da API), ex.:
 * `<ComponentGuard component="dashboard.financeiro.visualizar">`. Mesma
 * forma de uso do `PermissionGate`, mas para o array `components` em vez de
 * `permissions`.
 */
export function ComponentGuard({ component, children, fallback = null }: ComponentGuardProps) {
  const allowed = useComponent(component);
  return <>{allowed ? children : fallback}</>;
}
