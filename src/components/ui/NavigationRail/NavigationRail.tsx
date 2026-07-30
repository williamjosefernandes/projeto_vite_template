import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface NavigationRailItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface NavigationRailProps {
  items: NavigationRailItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

/** Coluna estreita só com ícones, para navegação em mobile/tablet. */
export function NavigationRail({ items, activeId, onSelect, className }: NavigationRailProps) {
  return (
    <nav className={cn('flex w-16 flex-col items-center gap-1 border-r border-gray-200 bg-white py-3 dark:border-gray-800 dark:bg-gray-900', className)}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              'flex w-12 flex-col items-center gap-1 rounded-lg py-2 text-[10px] font-medium transition-colors',
              isActive
                ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800',
            )}
          >
            <item.icon className="h-5 w-5" strokeWidth={1.5} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
