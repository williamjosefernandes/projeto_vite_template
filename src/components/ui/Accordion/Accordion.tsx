import type { ComponentPropsWithoutRef, Ref } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';

const AccordionRoot = AccordionPrimitive.Root;

interface AccordionItemProps extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  ref?: Ref<HTMLDivElement>;
}

function AccordionItem({ className, ref, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn('border-b border-gray-200 last:border-0 dark:border-gray-800', className)}
      {...props}
    />
  );
}

interface AccordionTriggerProps extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  ref?: Ref<HTMLButtonElement>;
}

function AccordionTrigger({ className, children, ref, ...props }: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex flex-1 items-center justify-between py-4 text-left text-sm font-medium text-gray-900 transition-colors hover:text-violet-600 [&[data-state=open]>svg]:rotate-180 dark:text-gray-100 dark:hover:text-violet-400',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

interface AccordionContentProps extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  ref?: Ref<HTMLDivElement>;
}

function AccordionContent({ className, children, ref, ...props }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm text-gray-600 dark:text-gray-300"
      {...props}
    >
      <div className={cn('pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

/** Wrapper estilizado de `@radix-ui/react-accordion`. Compound: `Accordion` (`Root`), `.Item`, `.Trigger`, `.Content`. */
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
