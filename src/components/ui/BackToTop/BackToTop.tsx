import { useEffect, useState, type RefObject } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface BackToTopProps {
  /** Elemento que rola — se omitido, observa `window`. */
  scrollContainerRef?: RefObject<HTMLElement | null>;
  threshold?: number;
  className?: string;
}

/** Botão circular flutuante que aparece após rolar além de `threshold` e volta ao topo ao clicar. */
export function BackToTop({ scrollContainerRef, threshold = 240, className }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target: HTMLElement | Window = scrollContainerRef?.current ?? window;

    function handleScroll() {
      const top = scrollContainerRef?.current ? scrollContainerRef.current.scrollTop : window.scrollY;
      setVisible(top > threshold);
    }

    target.addEventListener('scroll', handleScroll);
    return () => target.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef, threshold]);

  function handleClick() {
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Voltar ao topo"
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-violet-700',
        className,
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
