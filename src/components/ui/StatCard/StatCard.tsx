import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';
import { Card } from '../Card';
import { Typography } from '../Typography';

export interface StatCardProps {
  icon: ReactNode;
  /** Classes do círculo do ícone, ex.: tokens de `src/lib/module-colors.ts`. */
  iconColorClass: string;
  label: string;
  value: string | number;
  /** Variação percentual vs. período anterior. Negativo renderiza seta/cor de queda. */
  deltaPercent?: number;
  deltaLabel?: string;
  className?: string;
}

export function StatCard({ icon, iconColorClass, label, value, deltaPercent, deltaLabel, className }: StatCardProps) {
  const isPositive = (deltaPercent ?? 0) >= 0;

  return (
    <Card className={className}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <Typography variant="caption">{label}</Typography>
          <Typography variant="kpi" className="mt-1">
            {value}
          </Typography>
        </div>
        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-full', iconColorClass)}>
          {icon}
        </div>
      </div>
      {deltaPercent !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 text-sm">
          <span
            className={cn(
              'font-medium',
              isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
            )}
          >
            {isPositive ? '↑' : '↓'} {Math.abs(deltaPercent)}%
          </span>
          {deltaLabel && <span className="text-gray-400 dark:text-gray-500">{deltaLabel}</span>}
        </div>
      )}
    </Card>
  );
}
