import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../../lib/utils';

export const checkboxVariants = cva(
  'flex shrink-0 items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600 data-[state=indeterminate]:border-violet-600 data-[state=indeterminate]:bg-violet-600 dark:bg-gray-900 dark:focus-visible:ring-offset-gray-950',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 rounded border-[1.5px]',
        md: 'h-5 w-5 rounded-[4px] border-2',
        lg: 'h-6 w-6 rounded-md border-2',
      },
      error: {
        true: 'border-red-500 dark:border-red-500',
        false: 'border-gray-300 dark:border-gray-700',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  },
);

const iconSizeClass = {
  sm: 'h-3 w-3',
  md: 'h-3.5 w-3.5',
  lg: 'h-4 w-4',
};

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, VariantProps<typeof checkboxVariants> {
  ref?: Ref<HTMLButtonElement>;
}

/** Wrapper estilizado de `@radix-ui/react-checkbox`. `checked="indeterminate"` mostra o traço. */
export function Checkbox({ className, size = 'md', error, ref, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root ref={ref} className={cn(checkboxVariants({ size, error }), className)} {...props}>
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {props.checked === 'indeterminate' ? (
          <Minus className={iconSizeClass[size ?? 'md']} />
        ) : (
          <Check className={iconSizeClass[size ?? 'md']} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export interface CheckboxFieldProps extends Omit<CheckboxProps, 'ref'> {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

/** Checkbox individual com label + description. */
export function CheckboxField({ id, label, description, className, ref, ...props }: CheckboxFieldProps) {
  return (
    <label htmlFor={id} className={cn('flex items-start gap-2.5', props.disabled ? 'cursor-not-allowed' : 'cursor-pointer')}>
      <Checkbox id={id} className={cn('mt-0.5', className)} ref={ref} {...props} />
      <span className="min-w-0">
        <span className={cn('block text-sm font-medium', props.disabled ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-gray-100')}>
          {label}
        </span>
        {description && (
          <span className={cn('block text-xs', props.disabled ? 'text-gray-300 dark:text-gray-700' : 'text-gray-500 dark:text-gray-400')}>
            {description}
          </span>
        )}
      </span>
    </label>
  );
}
