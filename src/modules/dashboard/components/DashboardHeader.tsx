import { Calendar, ChevronDown, Plus } from 'lucide-react';
import { Button, DropdownMenu, Typography } from '../../../components/ui';
import type { QuickActionData } from '../mocks/dashboard.mock';

interface DashboardHeaderProps {
  userName: string;
  periodLabel: string;
  quickActions: QuickActionData[];
}

export function DashboardHeader({ userName, periodLabel, quickActions }: DashboardHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Typography variant="h1">Olá, {userName}! 👋</Typography>
        <Typography variant="body" className="mt-1">
          Aqui está o resumo do que está acontecendo hoje.
        </Typography>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="secondary">
          <Calendar className="h-4 w-4" />
          {periodLabel}
          <ChevronDown className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="primary">
              <Plus className="h-4 w-4" />
              Ação rápida
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            {quickActions.map((action) => (
              <DropdownMenu.Item key={action.id}>{action.label}</DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </div>
  );
}
