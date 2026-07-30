import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../Typography';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

/** Estado vazio genérico: ícone, título, descrição opcional e ação opcional, centralizados. */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 px-6 py-12 text-center', className)}>
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
          {icon}
        </div>
      )}
      <Typography as="p" variant="h2">
        {title}
      </Typography>
      {description && (
        <Typography variant="body" className="max-w-sm">
          {description}
        </Typography>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
