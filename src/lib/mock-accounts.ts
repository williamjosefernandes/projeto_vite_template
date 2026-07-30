import {
  Code2,
  Dumbbell,
  GraduationCap,
  LandPlot,
  Trophy,
} from 'lucide-react';
import { DASHBOARD_PERMISSIONS, STAT_CARD_PERMISSIONS } from '../modules/dashboard/dashboard.permissions';
import type { Account, AccountMembership } from '../types/rbac';

/**
 * Mock de contas do usuário (multi-tenant) e permissões por conta.
 * Usado para demonstrar o filtro de menu por RBAC (Etapa 3 — AppShell).
 * Em produção, isso viria de uma API de sessão/autenticação.
 */
export const mockAccounts: Account[] = [
  {
    id: 'soulnstrutor',
    name: 'SoulInstrutor',
    description: 'Portal da Autoescola',
    colorClass: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
    icon: GraduationCap,
  },
  {
    id: 'madecoders',
    name: 'MadeCoders',
    description: 'Plataforma de Devs',
    colorClass: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    icon: Code2,
  },
  {
    id: 'esporty-cup',
    name: 'Esporty Cup',
    description: 'Gestão de Campeonatos',
    colorClass: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    icon: Trophy,
  },
  {
    id: 'esporty-arena',
    name: 'Esporty Arena',
    description: 'Locação de Quadras',
    colorClass: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    icon: LandPlot,
  },
  {
    id: 'esporty-academy',
    name: 'Esporty Academy',
    description: 'Escola de Esportes',
    colorClass: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
    icon: Dumbbell,
  },
];

/**
 * Permissões por conta. Cada conta enxerga um recorte diferente do menu
 * (Etapa 3) e, dentro do Dashboard, um recorte diferente de widgets (Etapa 6):
 * - soulnstrutor (Administrador): acesso total — todos os módulos, todos os widgets e StatCards.
 * - madecoders (Atendente): StatCards "Novos Clientes" e "Aulas Agendadas", "Atividades recentes"
 *   e "Agenda de Hoje" — sem "Resumo financeiro" nem "Top Produtos".
 * - esporty-cup (Financeiro): StatCard "Receita do Mês", "Resumo financeiro" e "Top Produtos /
 *   Serviços" — sem "Agenda de Hoje" nem "Notificações".
 * - esporty-arena: Financeiro + Operações no menu, sem nenhuma permissão de widget de dashboard
 *   (demonstra o `EmptyState` de "nenhum widget visível").
 * - esporty-academy: apenas navegação básica, nenhum módulo, nenhum widget de dashboard.
 */
export const mockMemberships: AccountMembership[] = [
  {
    accountId: 'soulnstrutor',
    permissions: [
      'nav.dashboard',
      'nav.visao-geral',
      'nav.relatorios',
      'nav.atividades',
      'nav.calendario',
      'cadastros.alunos',
      'cadastros.instrutores',
      'cadastros.veiculos',
      'financeiro.receitas',
      'financeiro.despesas',
      'financeiro.faturas',
      'comunicacao.mensagens',
      'comunicacao.notificacoes',
      'operacoes.aulas',
      'operacoes.frota',
      'marketing.campanhas',
      'marketing.promocoes',
      'configuracoes.geral',
      'configuracoes.usuarios',
      DASHBOARD_PERMISSIONS.statCards,
      DASHBOARD_PERMISSIONS.performanceChart,
      DASHBOARD_PERMISSIONS.recentActivities,
      DASHBOARD_PERMISSIONS.todayAgenda,
      DASHBOARD_PERMISSIONS.notifications,
      DASHBOARD_PERMISSIONS.topProducts,
      DASHBOARD_PERMISSIONS.financialSummary,
      STAT_CARD_PERMISSIONS.receitaDoMes,
      STAT_CARD_PERMISSIONS.novosClientes,
      STAT_CARD_PERMISSIONS.aulasAgendadas,
      STAT_CARD_PERMISSIONS.conversoes,
    ],
  },
  {
    accountId: 'madecoders',
    permissions: [
      'nav.dashboard',
      'nav.visao-geral',
      'nav.relatorios',
      'nav.atividades',
      'cadastros.alunos',
      'cadastros.instrutores',
      'financeiro.receitas',
      'financeiro.faturas',
      'comunicacao.mensagens',
      'configuracoes.geral',
      'configuracoes.usuarios',
      DASHBOARD_PERMISSIONS.statCards,
      DASHBOARD_PERMISSIONS.recentActivities,
      DASHBOARD_PERMISSIONS.todayAgenda,
      STAT_CARD_PERMISSIONS.novosClientes,
      STAT_CARD_PERMISSIONS.aulasAgendadas,
    ],
  },
  {
    accountId: 'esporty-cup',
    permissions: [
      'nav.dashboard',
      'nav.atividades',
      'nav.calendario',
      'cadastros.alunos',
      'comunicacao.mensagens',
      'comunicacao.notificacoes',
      'configuracoes.geral',
      DASHBOARD_PERMISSIONS.statCards,
      DASHBOARD_PERMISSIONS.topProducts,
      DASHBOARD_PERMISSIONS.financialSummary,
      STAT_CARD_PERMISSIONS.receitaDoMes,
    ],
  },
  {
    accountId: 'esporty-arena',
    permissions: [
      'nav.dashboard',
      'nav.relatorios',
      'nav.calendario',
      'financeiro.receitas',
      'financeiro.despesas',
      'operacoes.aulas',
      'operacoes.frota',
      'configuracoes.geral',
    ],
  },
  {
    accountId: 'esporty-academy',
    permissions: ['nav.dashboard', 'nav.calendario'],
  },
];
