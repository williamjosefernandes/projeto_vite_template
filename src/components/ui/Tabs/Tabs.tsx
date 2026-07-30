import type { ComponentPropsWithoutRef, Ref } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../../lib/utils';

const TabsRoot = TabsPrimitive.Root;

interface TabsListProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  ref?: Ref<HTMLDivElement>;
}

function TabsList({ className, ref, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn('inline-flex items-center gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800', className)}
      {...props}
    />
  );
}

interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  ref?: Ref<HTMLButtonElement>;
}

function TabsTrigger({ className, ref, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:text-gray-300 dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-gray-100',
        className,
      )}
      {...props}
    />
  );
}

interface TabsContentProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  ref?: Ref<HTMLDivElement>;
}

function TabsContent({ className, ref, ...props }: TabsContentProps) {
  return <TabsPrimitive.Content ref={ref} className={cn('mt-4', className)} {...props} />;
}

/** Wrapper estilizado de `@radix-ui/react-tabs`. */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
