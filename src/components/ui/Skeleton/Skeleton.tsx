import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/utils';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

/** Bloco de loading. Combine largura/altura via `className` (ex.: "h-4 w-32"). */
export function Skeleton({ className, ref, ...props }: SkeletonProps) {
  return <div ref={ref} className={cn('animate-pulse rounded bg-gray-200 dark:bg-gray-800', className)} {...props} />;
}
