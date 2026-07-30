import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/utils';

export interface ColorSwatchProps extends HTMLAttributes<HTMLDivElement> {
  /** Classe Tailwind de fundo (ex.: "bg-violet-600") ou cor CSS válida. */
  color: string;
  label?: string;
  hex?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Formato do swatch — quadrado (escalas) ou circular (chips de apoio/semânticas). */
  shape?: 'square' | 'circle';
  ref?: Ref<HTMLDivElement>;
}

const sizeClass: Record<NonNullable<ColorSwatchProps['size']>, string> = {
  sm: 'h-9 w-9',
  md: 'h-16 w-full',
  lg: 'h-20 w-full',
};

/** Quadrado/círculo de cor + label + hex opcionais embaixo. Usado nas páginas de documentação do Design System. */
export function ColorSwatch({
  className,
  color,
  label,
  hex,
  size = 'md',
  shape = 'square',
  ref,
  ...props
}: ColorSwatchProps) {
  const isClass = color.startsWith('bg-') || !color.includes('#');

  return (
    <div ref={ref} className={cn('text-center', className)} {...props}>
      <div
        className={cn(
          sizeClass[size],
          shape === 'circle' ? 'mx-auto rounded-full' : 'rounded-md',
          isClass ? color : undefined,
          'border border-black/5 dark:border-white/10',
        )}
        style={!isClass ? { backgroundColor: color } : undefined}
      />
      {label && <p className="mt-1.5 text-xs font-medium text-gray-600 dark:text-gray-300">{label}</p>}
      {hex && <p className="text-[10px] text-gray-400">{hex}</p>}
    </div>
  );
}
