import type { HTMLAttributes, Ref } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckCircle2, Info, TriangleAlert, X, XCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../Button';

export const alertVariants = cva('flex items-start gap-3 rounded-xl border p-4', {
  variants: {
    variant: {
      success:
        'border-green-200 bg-green-50 text-green-800 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-300',
      info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-300',
      warning:
        'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-300',
      danger: 'border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

const alertIcon = {
  success: CheckCircle2,
  info: Info,
  warning: TriangleAlert,
  danger: XCircle,
};

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title: string;
  description?: string;
  onClose?: () => void;
  ref?: Ref<HTMLDivElement>;
}

/** Alerta inline (não-toast) para mensagens persistentes de sucesso/info/aviso/erro dentro de uma página. */
export function Alert({ className, variant = 'info', title, description, onClose, ref, ...props }: AlertProps) {
  const Icon = alertIcon[variant ?? 'info'];

  return (
    <div ref={ref} className={cn(alertVariants({ variant }), className)} {...props}>
      <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        {description && <p className="mt-0.5 text-sm opacity-90">{description}</p>}
      </div>
      {onClose && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 shrink-0 p-0 text-current hover:bg-black/5 dark:hover:bg-white/10"
          onClick={onClose}
          aria-label="Fechar alerta"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
