import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export interface ToolbarProps {
  children: ReactNode;
  className?: string;
}

/** Barra horizontal para ações de uma seção/lista (menu, título, busca, filtros, botão de ação). Filhos organizados livremente via flex. */
export function Toolbar({ children, className }: ToolbarProps) {
  return (
    <div className={cn('flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-gray-900', className)}>
      {children}
    </div>
  );
}
