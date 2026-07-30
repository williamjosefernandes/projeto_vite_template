import type { HTMLAttributes, Ref } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const stackVariants = cva('flex flex-col', {
  variants: {
    gap: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    gap: 'md',
    align: 'stretch',
  },
});

export interface StackProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {
  ref?: Ref<HTMLDivElement>;
}

/** Lista vertical com espaçamento uniforme entre itens. Use para listas de itens/formulários empilhados. */
export function Stack({ className, gap, align, ref, ...props }: StackProps) {
  return <div ref={ref} className={cn(stackVariants({ gap, align }), className)} {...props} />;
}
