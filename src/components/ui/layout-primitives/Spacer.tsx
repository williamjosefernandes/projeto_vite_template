import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/utils';

export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

/** Espaçador flexível (`flex-1`) — empurra irmãos para as extremidades dentro de um `Flex`/`div flex`. */
export function Spacer({ className, ref, ...props }: SpacerProps) {
  return <div ref={ref} className={cn('flex-1', className)} {...props} />;
}
