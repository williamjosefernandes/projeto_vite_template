import {
  Calendar,
  CreditCard,
  FileSignature,
  ShoppingCart,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';
import { moduleColors } from '../../../lib/module-colors';
import { STAT_CARD_PERMISSIONS } from '../dashboard.permissions';

export interface StatCardData {
  id: string;
  label: string;
  value: string;
  deltaPercent: number;
  deltaLabel: string;
  icon: LucideIcon;
  iconColorClass: string;
  requiredPermission: string;
}

export const statCardsMock: StatCardData[] = [
  {
    id: 'receita',
    label: 'Receita do Mês',
    value: 'R$ 142.580,00',
    deltaPercent: 18.6,
    deltaLabel: 'vs mês anterior',
    icon: CreditCard,
    iconColorClass: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
    requiredPermission: STAT_CARD_PERMISSIONS.receitaDoMes,
  },
  {
    id: 'novos-clientes',
    label: 'Novos Clientes',
    value: '+56',
    deltaPercent: 12.4,
    deltaLabel: 'vs mês anterior',
    icon: UserPlus,
    iconColorClass: moduleColors.financeiro.iconClassName,
    requiredPermission: STAT_CARD_PERMISSIONS.novosClientes,
  },
  {
    id: 'aulas-agendadas',
    label: 'Aulas Agendadas',
    value: '128',
    deltaPercent: 15.2,
    deltaLabel: 'vs mês anterior',
    icon: Calendar,
    iconColorClass: moduleColors.comunicacao.iconClassName,
    requiredPermission: STAT_CARD_PERMISSIONS.aulasAgendadas,
  },
  {
    id: 'conversoes',
    label: 'Conversões',
    value: '24.5%',
    deltaPercent: 8.1,
    deltaLabel: 'vs mês anterior',
    icon: ShoppingCart,
    iconColorClass: moduleColors.cadastros.iconClassName,
    requiredPermission: STAT_CARD_PERMISSIONS.conversoes,
  },
];

export const performanceDataMock = [
  { date: '23/07', valor: 3200 },
  { date: '24/07', valor: 3000 },
  { date: '25/07', valor: 6240 },
  { date: '26/07', valor: 4300 },
  { date: '27/07', valor: 5600 },
  { date: '28/07', valor: 8000 },
  { date: '29/07', valor: 6800 },
];

export interface ActivityData {
  id: string;
  icon: LucideIcon;
  iconColorClass: string;
  title: string;
  description: string;
  time: string;
}

export const recentActivitiesMock: ActivityData[] = [
  {
    id: 'act-1',
    icon: ShoppingCart,
    iconColorClass: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
    title: 'Nova venda realizada',
    description: 'Venda #12873',
    time: 'há 10 min',
  },
  {
    id: 'act-2',
    icon: Calendar,
    iconColorClass: moduleColors.comunicacao.iconClassName,
    title: 'Aula agendada',
    description: 'João Silva - Aula prática',
    time: 'há 25 min',
  },
  {
    id: 'act-3',
    icon: CreditCard,
    iconColorClass: moduleColors.financeiro.iconClassName,
    title: 'Pagamento recebido',
    description: 'R$ 1.250,00 via PIX',
    time: 'há 1 h',
  },
  {
    id: 'act-4',
    icon: UserPlus,
    iconColorClass: moduleColors.cadastros.iconClassName,
    title: 'Novo aluno cadastrado',
    description: 'Maria Santos',
    time: 'há 2 h',
  },
  {
    id: 'act-5',
    icon: FileSignature,
    iconColorClass: moduleColors.marketing.iconClassName,
    title: 'Contrato assinado',
    description: 'Carlos Eduardo',
    time: 'há 3 h',
  },
];

export type AgendaStatus = 'confirmado' | 'pendente';

export interface AgendaItemData {
  id: string;
  time: string;
  name: string;
  description: string;
  status: AgendaStatus;
}

export const todayAgendaMock: AgendaItemData[] = [
  { id: 'agenda-1', time: '08:00', name: 'Carlos Eduardo', description: 'Aula prática - João Silva', status: 'confirmado' },
  { id: 'agenda-2', time: '09:30', name: 'Ana Beatriz', description: 'Aula prática - Maria Santos', status: 'confirmado' },
  { id: 'agenda-3', time: '10:30', name: 'Paulo Henrique', description: 'Aula prática - João Pedro', status: 'confirmado' },
  { id: 'agenda-4', time: '13:30', name: 'Fernanda Lima', description: 'Aula prática - Ana Clara', status: 'confirmado' },
  { id: 'agenda-5', time: '15:00', name: 'Carlos Eduardo', description: 'Aula prática - Lucas Oliveira', status: 'confirmado' },
];

export interface DashboardNotificationData {
  id: string;
  icon: LucideIcon;
  iconColorClass: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

export const dashboardNotificationsMock: DashboardNotificationData[] = [
  {
    id: 'notif-1',
    icon: Calendar,
    iconColorClass: moduleColors.comunicacao.iconClassName,
    title: '5 aulas agendadas para hoje',
    description: 'Confira sua agenda',
    time: 'há 10 min',
    unread: true,
  },
  {
    id: 'notif-2',
    icon: CreditCard,
    iconColorClass: moduleColors.financeiro.iconClassName,
    title: 'Novo pagamento recebido',
    description: 'R$ 1.250,00 via PIX',
    time: 'há 1 h',
    unread: true,
  },
  {
    id: 'notif-3',
    icon: CreditCard,
    iconColorClass: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    title: 'Vencimentos hoje',
    description: '3 parcelas a vencer',
    time: 'há 2 h',
    unread: true,
  },
  {
    id: 'notif-4',
    icon: UserPlus,
    iconColorClass: moduleColors.cadastros.iconClassName,
    title: 'Novo aluno cadastrado',
    description: 'João Victor Silva',
    time: 'há 3 h',
    unread: true,
  },
];

export interface TopProductData {
  id: string;
  name: string;
  sales: number;
  revenue: string;
  /** Participação relativa (0-100) usada na barra de progresso sob o nome. */
  sharePercent: number;
}

export const topProductsMock: TopProductData[] = [
  { id: 'prod-1', name: 'CNH Categoria B', sales: 42, revenue: 'R$ 24.780,00', sharePercent: 100 },
  { id: 'prod-2', name: 'Aula Particular', sales: 31, revenue: 'R$ 9.610,00', sharePercent: 74 },
  { id: 'prod-3', name: 'Adição Categoria A', sales: 18, revenue: 'R$ 4.320,00', sharePercent: 43 },
  { id: 'prod-4', name: 'Renovação CNH', sales: 15, revenue: 'R$ 2.250,00', sharePercent: 36 },
  { id: 'prod-5', name: 'Curso Teórico', sales: 12, revenue: 'R$ 1.200,00', sharePercent: 29 },
];

export interface FinancialSummaryData {
  revenue: string;
  expenses: string;
  netProfit: string;
  netProfitDeltaPercent: number;
  sparkline: number[];
}

export const financialSummaryMock: FinancialSummaryData = {
  revenue: 'R$ 142.580,00',
  expenses: 'R$ 45.230,00',
  netProfit: 'R$ 97.350,00',
  netProfitDeltaPercent: 18,
  sparkline: [40, 55, 45, 60, 50, 70, 65, 80, 75, 90],
};

export interface QuickActionData {
  id: string;
  label: string;
}

export const quickActionsMock: QuickActionData[] = [
  { id: 'nova-venda', label: 'Nova venda' },
  { id: 'novo-cliente', label: 'Novo cliente' },
  { id: 'novo-agendamento', label: 'Novo agendamento' },
];
