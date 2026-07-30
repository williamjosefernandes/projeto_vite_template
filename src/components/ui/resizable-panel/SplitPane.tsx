import type { ReactNode } from 'react';
import { ResizablePanel } from './ResizablePanel';

export interface SplitPaneProps {
  sidebar: ReactNode;
  content: ReactNode;
  defaultSidebarSize?: number;
  className?: string;
}

/**
 * Composição de `ResizablePanel` para o caso comum de menu lateral fino +
 * área de conteúdo (ex.: navegação de documentação, explorador de arquivos).
 */
export function SplitPane({ sidebar, content, defaultSidebarSize = 25, className }: SplitPaneProps) {
  return (
    <ResizablePanel
      direction="horizontal"
      first={sidebar}
      second={content}
      defaultSize={defaultSidebarSize}
      minSize={15}
      maxSize={40}
      className={className}
    />
  );
}
