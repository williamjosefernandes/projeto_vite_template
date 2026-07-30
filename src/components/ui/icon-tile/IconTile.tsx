import type { HTMLAttributes, Ref } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface IconTileProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  strokeWidth?: number;
  ref?: Ref<HTMLDivElement>;
}

const boxSizeClass: Record<NonNullable<IconTileProps['size']>, string> = {
  xs: 'h-8 w-8',
  sm: 'h-9 w-9',
  md: 'h-10 w-10',
  lg: 'h-11 w-11',
  xl: 'h-14 w-14',
  '2xl': 'h-16 w-16',
};

const iconSizeClass: Record<NonNullable<IconTileProps['size']>, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-12 w-12',
};

/** Ícone + label opcional, usado na biblioteca de ícones e nos exemplos de tamanho/estado da documentação. */
export function IconTile({ className, icon: Icon, label, size = 'md', strokeWidth = 1.5, ref, ...props }: IconTileProps) {
  return (
    <div ref={ref} className={cn('flex flex-col items-center gap-1.5 text-center', className)} {...props}>
      <div
        className={cn(
          'flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 dark:border-gray-800 dark:text-gray-300',
          boxSizeClass[size],
        )}
      >
        <Icon className={iconSizeClass[size]} strokeWidth={strokeWidth} />
      </div>
      {label && <p className="max-w-[72px] truncate text-[11px] text-gray-500 dark:text-gray-400">{label}</p>}
    </div>
  );
}
