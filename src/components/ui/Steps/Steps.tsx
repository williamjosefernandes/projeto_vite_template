import { Check } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface StepItem {
  id: string;
  label: string;
}

export interface StepsProps {
  steps: StepItem[];
  /** Índice (0-based) do step atual. Steps com índice menor são tratados como concluídos. */
  currentIndex: number;
  className?: string;
}

/** Stepper horizontal com estado completed/active/upcoming por índice. */
export function Steps({ steps, currentIndex, className }: StepsProps) {
  return (
    <ol className={cn('flex items-start', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;
        const isLast = index === steps.length - 1;

        return (
          <li key={step.id} className={cn('flex items-center', !isLast && 'flex-1')}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                  isCompleted && 'bg-violet-600 text-white',
                  isActive && 'bg-violet-600 text-white ring-4 ring-violet-100 dark:ring-violet-900/40',
                  !isCompleted && !isActive && 'border-2 border-gray-300 text-gray-400 dark:border-gray-700 dark:text-gray-500',
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </span>
              <span
                className={cn(
                  'whitespace-nowrap text-xs',
                  isActive && 'font-semibold text-violet-700 dark:text-violet-400',
                  isCompleted && 'font-medium text-gray-700 dark:text-gray-300',
                  !isCompleted && !isActive && 'text-gray-400 dark:text-gray-600',
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div className={cn('mx-2 mt-4 h-0.5 flex-1', isCompleted ? 'bg-violet-600' : 'bg-gray-200 dark:bg-gray-800')} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
