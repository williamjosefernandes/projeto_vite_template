import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/utils';

export interface SpacingBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Largura em px do valor de espaçamento representado. */
  px: number;
  /** Maior valor da escala exibida, usado para normalizar a largura (100% = maxPx). */
  maxPx: number;
  ref?: Ref<HTMLDivElement>;
}

/** Barra horizontal cuja largura representa proporcionalmente um valor de espaçamento. Usada nas tabelas de escala do Design System. */
export function SpacingBar({ className, px, maxPx, ref, ...props }: SpacingBarProps) {
  const widthPercent = Math.max((px / maxPx) * 100, px > 0 ? 2 : 0);

  return (
    <div ref={ref} className={cn('h-4 rounded bg-violet-300 dark:bg-violet-700', className)} style={{ width: `${widthPercent}%` }} {...props} />
  );
}
