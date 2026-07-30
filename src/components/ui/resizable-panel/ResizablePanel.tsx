import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export interface ResizablePanelProps {
  /** Conteúdo do painel esquerdo/superior (dependendo de `direction`). */
  first: ReactNode;
  /** Conteúdo do painel direito/inferior. */
  second: ReactNode;
  direction?: 'horizontal' | 'vertical';
  /** Percentual inicial (0-100) ocupado pelo primeiro painel. */
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

/**
 * Dois painéis redimensionáveis via arraste do handle central. Implementação
 * simples com `flex-basis` + eventos de mouse — sem dependência externa.
 * Use para layouts do tipo split (ex.: lista + detalhe, editor + preview).
 */
export function ResizablePanel({
  first,
  second,
  direction = 'horizontal',
  defaultSize = 50,
  minSize = 15,
  maxSize = 85,
  className,
}: ResizablePanelProps) {
  const [size, setSize] = useState(defaultSize);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHorizontal = direction === 'horizontal';

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent) => {
      event.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      function handlePointerMove(moveEvent: PointerEvent) {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const ratio = isHorizontal
          ? ((moveEvent.clientX - rect.left) / rect.width) * 100
          : ((moveEvent.clientY - rect.top) / rect.height) * 100;
        setSize(Math.min(maxSize, Math.max(minSize, ratio)));
      }

      function handlePointerUp() {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      }

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    },
    [isHorizontal, maxSize, minSize],
  );

  return (
    <div
      ref={containerRef}
      className={cn('flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800', isHorizontal ? 'flex-row' : 'flex-col', className)}
    >
      <div style={{ flexBasis: `${size}%` }} className="min-h-0 min-w-0 overflow-auto">
        {first}
      </div>
      <div
        role="separator"
        aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
        onPointerDown={handlePointerDown}
        className={cn(
          'shrink-0 bg-gray-200 transition-colors hover:bg-violet-400 dark:bg-gray-800 dark:hover:bg-violet-600',
          isHorizontal ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize',
        )}
      />
      <div style={{ flexBasis: `${100 - size}%` }} className="min-h-0 min-w-0 overflow-auto">
        {second}
      </div>
    </div>
  );
}
