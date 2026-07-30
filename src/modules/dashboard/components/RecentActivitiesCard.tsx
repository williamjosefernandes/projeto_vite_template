import { Card } from '../../../components/ui';
import type { ActivityData } from '../mocks/dashboard.mock';

interface RecentActivitiesCardProps {
  activities: ActivityData[];
}

export function RecentActivitiesCard({ activities }: RecentActivitiesCardProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Atividades recentes</Card.Title>
        <button type="button" className="text-sm font-medium text-violet-600 dark:text-violet-400">
          Ver todas
        </button>
      </Card.Header>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start gap-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${activity.iconColorClass}`}>
              <activity.icon className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <span className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{activity.title}</p>
              <p className="truncate text-xs text-gray-400">{activity.description}</p>
            </span>
            <span className="shrink-0 text-xs text-gray-400">{activity.time}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
