import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/utils';
import { Typography, type TypographyProps } from '../Typography';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

function CardRoot({ className, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:shadow-none',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ref, ...props }: CardProps) {
  return <div ref={ref} className={cn('mb-4 flex items-center justify-between gap-4', className)} {...props} />;
}

function CardTitle({ className, ref, ...props }: Omit<TypographyProps, 'variant' | 'ref'> & { ref?: Ref<HTMLElement> }) {
  return <Typography as="h3" variant="h2" ref={ref} className={className} {...props} />;
}

function CardBody({ className, ref, ...props }: CardProps) {
  return <div ref={ref} className={className} {...props} />;
}

/**
 * Card composto: `<Card>`, `<Card.Header>`, `<Card.Title>`, `<Card.Body>`.
 * Ver docs/01-design-system.md para exemplo de uso.
 */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Body: CardBody,
});
