import type { HTMLAttributes, Ref } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const dividerVariants = cva('border-gray-200 dark:border-gray-800', {
  variants: {
    variant: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    },
    orientation: {
      horizontal: 'w-full border-t',
      vertical: 'h-full border-l',
    },
  },
  defaultVariants: {
    variant: 'solid',
    orientation: 'horizontal',
  },
});

export interface DividerProps extends HTMLAttributes<HTMLHRElement>, VariantProps<typeof dividerVariants> {
  ref?: Ref<HTMLHRElement>;
}

/** Linha divisória horizontal (padrão) ou vertical, com estilo `solid`/`dashed`/`dotted`. */
export function Divider({ className, variant, orientation, ref, ...props }: DividerProps) {
  return <hr ref={ref} className={cn(dividerVariants({ variant, orientation }), className)} {...props} />;
}
