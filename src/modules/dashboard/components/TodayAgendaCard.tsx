import { Button, Card } from '../../../components/ui';
import type { AgendaItemData } from '../mocks/dashboard.mock';

interface TodayAgendaCardProps {
  items: AgendaItemData[];
}

export function TodayAgendaCard({ items }: TodayAgendaCardProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Agenda de Hoje</Card.Title>
        <button type="button" className="text-sm font-medium text-violet-600 dark:text-violet-400">
          Ver agenda
        </button>
      </Card.Header>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <span className="w-11 shrink-0 text-xs font-medium text-gray-500 dark:text-gray-400">{item.time}</span>
            <span className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</p>
              <p className="truncate text-xs text-gray-400">{item.description}</p>
            </span>
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${item.status === 'confirmado' ? 'bg-green-500' : 'bg-amber-500'}`}
            />
          </li>
        ))}
      </ul>
      <Button variant="secondary" className="mt-5 w-full">
        Ver agenda completa
      </Button>
    </Card>
  );
}
