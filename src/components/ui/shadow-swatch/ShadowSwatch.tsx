import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/utils';

export interface ShadowSwatchProps extends HTMLAttributes<HTMLDivElement> {
  /** Classe Tailwind de sombra (ex.: "shadow-md") ou classe customizada (ex.: "shadow-primary"). */
  shadowClassName: string;
  label: string;
  description?: string;
  value?: string;
  ref?: Ref<HTMLDivElement>;
}

/** Card quadrado neutro aplicando uma sombra + label + descrição + valor de box-shadow. */
export function ShadowSwatch({
  className,
  shadowClassName,
  label,
  description,
  value,
  ref,
  ...props
}: ShadowSwatchProps) {
  return (
    <div ref={ref} className={cn('text-left', className)} {...props}>
      <div className={cn('h-24 w-full rounded-lg border border-gray-100 bg-white', shadowClassName)} />
      <p className="mt-3 text-sm font-semibold text-violet-700 dark:text-violet-400">{label}</p>
      {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
      {value && <p className="mt-1 font-mono text-[11px] leading-tight text-gray-400">{value}</p>}
    </div>
  );
}
