import { Bell, Calendar, CreditCard, UserPlus } from 'lucide-react';
import { Popover } from '../ui';

const mockNotifications = [
  {
    id: 1,
    icon: Calendar,
    iconColorClass: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    title: '5 aulas agendadas para hoje',
    description: 'Confira sua agenda',
    time: 'há 10 min',
  },
  {
    id: 2,
    icon: CreditCard,
    iconColorClass: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    title: 'Novo pagamento recebido',
    description: 'R$ 1.250,00 via PIX',
    time: 'há 1 h',
  },
  {
    id: 3,
    icon: Bell,
    iconColorClass: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    title: 'Vencimentos hoje',
    description: '3 parcelas a vencer',
    time: 'há 2 h',
  },
  {
    id: 4,
    icon: UserPlus,
    iconColorClass: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
    title: 'Novo aluno cadastrado',
    description: 'João Victor Silva',
    time: 'há 3 h',
  },
];

export function NotificationsPopover() {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <Bell className="h-5 w-5" strokeWidth={1.5} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            {mockNotifications.length}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Content align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notificações</p>
          <button type="button" className="text-xs font-medium text-violet-600 dark:text-violet-400">
            Ver todas
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/60"
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${notification.iconColorClass}`}>
                <notification.icon className="h-4 w-4" strokeWidth={1.5} />
              </span>
              <span className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                  {notification.title}
                </p>
                <p className="truncate text-xs text-gray-400">{notification.description}</p>
              </span>
              <span className="shrink-0 text-[11px] text-gray-400">{notification.time}</span>
            </div>
          ))}
        </div>
      </Popover.Content>
    </Popover>
  );
}
