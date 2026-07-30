import type { LucideIcon } from 'lucide-react';
import { Plus } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface BottomNavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface BottomNavigationProps {
  items: BottomNavigationItem[];
  activeId: string;
  onSelect: (id: string) => void;
  onActionClick?: () => void;
  className?: string;
}

/** Barra inferior de navegação (mobile) com botão de ação central flutuante opcional. */
export function BottomNavigation({ items, activeId, onSelect, onActionClick, className }: BottomNavigationProps) {
  const midIndex = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, midIndex);
  const rightItems = items.slice(midIndex);

  function renderItem(item: BottomNavigationItem) {
    const isActive = item.id === activeId;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => onSelect(item.id)}
        className={cn(
          'flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium',
          isActive ? 'text-violet-700 dark:text-violet-400' : 'text-gray-500 dark:text-gray-400',
        )}
      >
        <item.icon className="h-5 w-5" strokeWidth={1.5} />
        {item.label}
      </button>
    );
  }

  return (
    <div className={cn('relative flex items-center border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900', className)}>
      {leftItems.map(renderItem)}
      {onActionClick && (
        <div className="flex w-16 shrink-0 justify-center">
          <button
            type="button"
            onClick={onActionClick}
            aria-label="Ação principal"
            className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg hover:bg-violet-700"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      )}
      {rightItems.map(renderItem)}
    </div>
  );
}
