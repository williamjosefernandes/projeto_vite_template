import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/utils';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

/** Bloco centralizado com largura máxima e padding horizontal — envelope padrão de páginas de conteúdo. */
export function Container({ className, ref, ...props }: ContainerProps) {
  return <div ref={ref} className={cn('mx-auto w-full max-w-6xl px-6', className)} {...props} />;
}
