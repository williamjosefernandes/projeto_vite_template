import type { ComponentPropsWithoutRef, Ref } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../../lib/utils';

export interface SwitchProps extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  ref?: Ref<HTMLButtonElement>;
}

/** Wrapper estilizado de `@radix-ui/react-switch`. */
export function Switch({ className, ref, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-5 w-9 shrink-0 rounded-full bg-gray-300 transition-colors data-[state=checked]:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-4" />
    </SwitchPrimitive.Root>
  );
}
