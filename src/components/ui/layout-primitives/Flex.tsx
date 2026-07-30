import type { HTMLAttributes, Ref } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const flexVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      col: 'flex-col',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    direction: 'row',
    justify: 'start',
    align: 'stretch',
    gap: 'none',
    wrap: false,
  },
});

export interface FlexProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof flexVariants> {
  ref?: Ref<HTMLDivElement>;
}

/** Container flex com controle fino de `direction`/`justify`/`align`/`gap`/`wrap` via props. */
export function Flex({ className, direction, justify, align, gap, wrap, ref, ...props }: FlexProps) {
  return <div ref={ref} className={cn(flexVariants({ direction, justify, align, gap, wrap }), className)} {...props} />;
}
