import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/** Trilha de navegação hierárquica. O último item é sempre tratado como a página atual (sem link). */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn('flex items-center gap-1.5 text-sm', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-300 dark:text-gray-700" />}
            {isLast ? (
              <span className="flex items-center gap-1 font-medium text-gray-900 dark:text-gray-100">
                {item.icon}
                {item.label}
              </span>
            ) : (
              <a
                href={item.href ?? '#'}
                className="flex items-center gap-1 text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400"
              >
                {item.icon}
                {item.label}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
}
