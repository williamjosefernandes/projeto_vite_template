import type { ElementType, ReactNode, Ref } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-2xl font-semibold text-gray-900 dark:text-gray-100',
      h2: 'text-base font-semibold text-gray-900 dark:text-gray-100',
      body: 'text-sm text-gray-600 dark:text-gray-300',
      caption: 'text-xs text-gray-400 uppercase tracking-wide',
      kpi: 'text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>;

const defaultElement: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  body: 'p',
  caption: 'span',
  kpi: 'p',
};

export interface TypographyProps extends VariantProps<typeof typographyVariants> {
  /** Elemento HTML a renderizar. Por padrão é escolhido conforme a variante (h1 -> <h1>, body -> <p>...). */
  as?: ElementType;
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * Consolida a hierarquia tipográfica do Design System (ver docs/01-design-system.md).
 * Sempre prefira este componente a repetir as classes de fonte manualmente.
 */
export function Typography({ variant = 'body', as, className, children, ref, ...rest }: TypographyProps) {
  const Component = as ?? defaultElement[variant ?? 'body'];

  return (
    <Component ref={ref} className={cn(typographyVariants({ variant }), className)} {...rest}>
      {children}
    </Component>
  );
}
