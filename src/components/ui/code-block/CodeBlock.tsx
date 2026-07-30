import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../../lib/utils';

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** Tag exibida no canto (ex.: "CSS", "JS", "TS", "JSON"). */
  language: string;
  code: string;
  ref?: Ref<HTMLDivElement>;
}

const languageBadgeClass: Record<string, string> = {
  CSS: 'bg-blue-500/20 text-blue-300',
  JS: 'bg-amber-500/20 text-amber-300',
  TS: 'bg-blue-500/20 text-blue-300',
  JSON: 'bg-gray-500/20 text-gray-300',
};

/**
 * Bloco de código com fundo escuro fixo (independe do tema claro/escuro da
 * aplicação, como um editor de código). Sem syntax highlight — apenas
 * fonte monoespaçada + badge de linguagem.
 */
export function CodeBlock({ className, language, code, ref, ...props }: CodeBlockProps) {
  return (
    <div
      ref={ref}
      className={cn('overflow-hidden rounded-xl border border-gray-800 bg-gray-900', className)}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
        <span className="text-xs font-medium text-gray-400">{language}</span>
        <span
          className={cn(
            'rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
            languageBadgeClass[language] ?? 'bg-gray-500/20 text-gray-300',
          )}
        >
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm">
        <code className="font-mono text-gray-100">{code}</code>
      </pre>
    </div>
  );
}
