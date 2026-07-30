import { useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Search } from 'lucide-react';
import { Modal } from '../Modal';
import { cn } from '../../../lib/utils';

export interface CommandItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  section: string;
  onSelect: () => void;
}

export interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
}

/** Paleta de comando (⌘K): Dialog + Input + lista filtrável, sem dependência externa. */
export function CommandMenu({ open, onOpenChange, items }: CommandMenuProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matches = normalized ? items.filter((item) => item.label.toLowerCase().includes(normalized)) : items;
    const bySection = new Map<string, CommandItem[]>();
    matches.forEach((item) => {
      const list = bySection.get(item.section) ?? [];
      list.push(item);
      bySection.set(item.section, list);
    });
    return [...bySection.entries()];
  }, [items, query]);

  function handleSelect(item: CommandItem) {
    item.onSelect();
    onOpenChange(false);
    setQuery('');
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content
        showCloseButton={false}
        className="top-24 max-w-lg -translate-y-0 gap-0 overflow-hidden p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Modal.Title className="sr-only">Buscar comandos</Modal.Title>
        <div className="flex items-center gap-2 border-b border-gray-200 px-4 dark:border-gray-800">
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite um comando ou busque..."
            className="h-12 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
          />
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && <p className="px-2 py-6 text-center text-sm text-gray-400">Nenhum resultado encontrado.</p>}
          {filtered.map(([section, sectionItems]) => (
            <div key={section} className="mb-2 last:mb-0">
              <p className="px-2 py-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">{section}</p>
              {sectionItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/60',
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4 shrink-0 text-gray-400" />}
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </Modal.Content>
    </Modal>
  );
}
