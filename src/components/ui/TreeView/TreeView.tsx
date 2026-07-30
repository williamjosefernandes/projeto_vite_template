import { useState } from 'react';
import { ChevronRight, Folder, FolderOpen } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export interface TreeViewProps {
  nodes: TreeNode[];
  defaultExpandedIds?: string[];
  className?: string;
}

function TreeNodeItem({ node, depth, expanded, toggle }: { node: TreeNode; depth: number; expanded: Set<string>; toggle: (id: string) => void }) {
  const hasChildren = !!node.children?.length;
  const isOpen = expanded.has(node.id);

  return (
    <div>
      <button
        type="button"
        onClick={() => hasChildren && toggle(node.id)}
        className="flex w-full items-center gap-1.5 rounded-lg py-1.5 pr-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/60"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {hasChildren ? (
          <ChevronRight className={cn('h-3.5 w-3.5 shrink-0 text-gray-400 transition-transform', isOpen && 'rotate-90')} />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        {hasChildren && isOpen ? (
          <FolderOpen className="h-4 w-4 shrink-0 text-violet-500" />
        ) : (
          <Folder className="h-4 w-4 shrink-0 text-gray-400" />
        )}
        <span className="truncate">{node.label}</span>
      </button>
      {hasChildren && isOpen && (
        <div>
          {node.children!.map((child) => (
            <TreeNodeItem key={child.id} node={child} depth={depth + 1} expanded={expanded} toggle={toggle} />
          ))}
        </div>
      )}
    </div>
  );
}

/** Árvore de pastas expansível, recursiva. */
export function TreeView({ nodes, defaultExpandedIds = [], className }: TreeViewProps) {
  const [expanded, setExpanded] = useState(new Set(defaultExpandedIds));

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className={cn('space-y-0.5', className)}>
      {nodes.map((node) => (
        <TreeNodeItem key={node.id} node={node} depth={0} expanded={expanded} toggle={toggle} />
      ))}
    </div>
  );
}
