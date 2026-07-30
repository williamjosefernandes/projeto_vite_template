import type { HTMLAttributes, Ref } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const gridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    },
    gap: {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    },
  },
  defaultVariants: {
    cols: 12,
    gap: 'md',
  },
});

export interface GridProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {
  ref?: Ref<HTMLDivElement>;
}

/** Grid de N colunas com gap padronizado. Combine com `col-span-*` nos filhos. */
export function Grid({ className, cols, gap, ref, ...props }: GridProps) {
  return <div ref={ref} className={cn(gridVariants({ cols, gap }), className)} {...props} />;
}
