import type { ComponentPropsWithoutRef, Ref } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../../lib/utils';

const PopoverRoot = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverClose = PopoverPrimitive.Close;
const PopoverAnchor = PopoverPrimitive.Anchor;

interface PopoverContentProps extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  ref?: Ref<HTMLDivElement>;
}

function PopoverContent({ className, align = 'center', sideOffset = 6, ref, ...props }: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-md outline-none dark:border-gray-800 dark:bg-gray-900',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

/** Wrapper estilizado de `@radix-ui/react-popover`. */
export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose,
  Anchor: PopoverAnchor,
});
