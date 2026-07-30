import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const RadioGroupRoot = RadioGroupPrimitive.Root;

export const radioItemVariants = cva(
  'flex shrink-0 items-center justify-center rounded-full border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-violet-600 dark:bg-gray-900 dark:focus-visible:ring-offset-gray-950',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 border-[1.5px]',
        md: 'h-5 w-5 border-2',
        lg: 'h-6 w-6 border-2',
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

const dotSizeClass = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
};

export interface RadioGroupItemProps
  extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioItemVariants> {
  ref?: Ref<HTMLButtonElement>;
}

function RadioGroupItem({ className, size = 'md', error, ref, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item ref={ref} className={cn(radioItemVariants({ size, error }), className)} {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className={cn('rounded-full bg-violet-600', dotSizeClass[size ?? 'md'])} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export interface RadioFieldProps extends Omit<RadioGroupItemProps, 'ref'> {
  label: ReactNode;
  description?: ReactNode;
  id: string;
  ref?: Ref<HTMLButtonElement>;
}

/** Radio individual com label + description, para uso dentro de um `RadioGroup`. */
function RadioField({ label, description, id, className, ref, ...props }: RadioFieldProps) {
  return (
    <label htmlFor={id} className={cn('flex items-start gap-2.5', props.disabled ? 'cursor-not-allowed' : 'cursor-pointer')}>
      <RadioGroupItem id={id} className={cn('mt-0.5', className)} ref={ref} {...props} />
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

/**
 * Wrapper estilizado de `@radix-ui/react-radio-group`. `name`/seleção
 * exclusiva vêm de graça do Radix (todo `RadioGroup.Item` dentro do mesmo
 * `Root` compartilha o grupo). Compound: `RadioGroup` (`Root`), `.Item`
 * (primitivo, sem label) e `.Field` (label + description prontos).
 */
export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
  Field: RadioField,
});
