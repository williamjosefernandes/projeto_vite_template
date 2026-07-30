import type { ComponentPropsWithoutRef, Ref } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  ref?: Ref<HTMLButtonElement>;
}

/** Wrapper estilizado de `@radix-ui/react-checkbox`. `checked="indeterminate"` mostra o traço. */
export function Checkbox({ className, ref, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'flex h-4 w-4 shrink-0 items-center justify-center rounded border border-gray-300 bg-white text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600 data-[state=indeterminate]:border-violet-600 data-[state=indeterminate]:bg-violet-600 dark:border-gray-700 dark:bg-gray-900 dark:focus-visible:ring-offset-gray-950',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {props.checked === 'indeterminate' ? <Minus className="h-3 w-3" /> : <Check className="h-3 w-3" />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
