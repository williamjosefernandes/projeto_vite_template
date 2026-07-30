import type { ComponentPropsWithoutRef, Ref } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../../../lib/utils';

const RadioGroupRoot = RadioGroupPrimitive.Root;

export interface RadioGroupItemProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  ref?: Ref<HTMLButtonElement>;
}

function RadioGroupItem({ className, ref, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-violet-600 dark:border-gray-700 dark:bg-gray-900 dark:focus-visible:ring-offset-gray-950',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="h-2 w-2 rounded-full bg-violet-600" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

/** Wrapper estilizado de `@radix-ui/react-radio-group`. Compound: `RadioGroup` (`Root`), `RadioGroup.Item`. */
export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});
