import { Card } from '../../../components/ui';
import type { DashboardNotificationData } from '../mocks/dashboard.mock';

interface NotificationsCardProps {
  notifications: DashboardNotificationData[];
}

export function NotificationsCard({ notifications }: NotificationsCardProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Notificações</Card.Title>
        <button type="button" className="text-sm font-medium text-violet-600 dark:text-violet-400">
          Ver todas
        </button>
      </Card.Header>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li key={notification.id} className="flex items-start gap-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${notification.iconColorClass}`}>
              <notification.icon className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <span className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{notification.title}</p>
              <p className="truncate text-xs text-gray-400">{notification.description}</p>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-xs text-gray-400">
              {notification.time}
              {notification.unread && <span className="h-2 w-2 rounded-full bg-red-500" />}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
