import type { ComponentPropsWithoutRef, Ref } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '../../../lib/utils';

const DropdownMenuRoot = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuSubTriggerPrimitive = DropdownMenuPrimitive.SubTrigger;

const menuContentClassName =
  'z-50 min-w-40 overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-md dark:border-gray-800 dark:bg-gray-900';
const menuItemClassName =
  'relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-gray-100 dark:text-gray-200 dark:data-[highlighted]:bg-gray-800';

interface DropdownMenuContentProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  ref?: Ref<HTMLDivElement>;
}

function DropdownMenuContent({ className, sideOffset = 4, ref, ...props }: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(menuContentClassName, className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

interface DropdownMenuItemProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  ref?: Ref<HTMLDivElement>;
}

function DropdownMenuItem({ className, ref, ...props }: DropdownMenuItemProps) {
  return <DropdownMenuPrimitive.Item ref={ref} className={cn(menuItemClassName, className)} {...props} />;
}

interface DropdownMenuCheckboxItemProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {
  ref?: Ref<HTMLDivElement>;
}

function DropdownMenuCheckboxItem({ className, children, checked, ref, ...props }: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(menuItemClassName, 'pl-8', className)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-3.5 w-3.5" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

interface DropdownMenuRadioItemProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {
  ref?: Ref<HTMLDivElement>;
}

function DropdownMenuRadioItem({ className, children, ref, ...props }: DropdownMenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem ref={ref} className={cn(menuItemClassName, 'pl-8', className)} {...props}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

interface DropdownMenuLabelProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  ref?: Ref<HTMLDivElement>;
}

function DropdownMenuLabel({ className, ref, ...props }: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn('px-2 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wide', className)}
      {...props}
    />
  );
}

interface DropdownMenuSeparatorProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {
  ref?: Ref<HTMLDivElement>;
}

function DropdownMenuSeparator({ className, ref, ...props }: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-800', className)}
      {...props}
    />
  );
}

interface DropdownMenuSubTriggerProps extends ComponentPropsWithoutRef<typeof DropdownMenuSubTriggerPrimitive> {
  ref?: Ref<HTMLDivElement>;
}

function DropdownMenuSubTrigger({ className, children, ref, ...props }: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuSubTriggerPrimitive ref={ref} className={cn(menuItemClassName, className)} {...props}>
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </DropdownMenuSubTriggerPrimitive>
  );
}

interface DropdownMenuSubContentProps extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> {
  ref?: Ref<HTMLDivElement>;
}

function DropdownMenuSubContent({ className, ref, ...props }: DropdownMenuSubContentProps) {
  return <DropdownMenuPrimitive.SubContent ref={ref} className={cn(menuContentClassName, className)} {...props} />;
}

/**
 * Wrapper estilizado de `@radix-ui/react-dropdown-menu`.
 * Reutilizável tanto para menus simples quanto para o menu de conta (Etapa 3 - AppShell).
 */
export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioItem: DropdownMenuRadioItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Group: DropdownMenuGroup,
  RadioGroup: DropdownMenuRadioGroup,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
});
