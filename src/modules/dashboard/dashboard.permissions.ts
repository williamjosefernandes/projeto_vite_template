/**
 * Permissões que condicionam a visibilidade de cada bloco do Dashboard.
 * Consumidas via `PermissionGate`/`usePermission` (`src/components/ui/PermissionGate`,
 * `src/hooks/usePermission.ts`). Ver docs/03-pagina-dashboard.md, seção "Permissões por widget".
 */
export const DASHBOARD_PERMISSIONS = {
  statCards: 'dashboard.indicadores.visualizar',
  performanceChart: 'dashboard.desempenho.visualizar',
  recentActivities: 'dashboard.atividades.visualizar',
  todayAgenda: 'dashboard.agenda.visualizar',
  notifications: 'dashboard.notificacoes.visualizar',
  topProducts: 'dashboard.top_produtos.visualizar',
  financialSummary: 'dashboard.financeiro.visualizar',
} as const;

/**
 * Permissão granular por StatCard individual — filtrada dentro de
 * `StatCardsGrid`, além (e independente) da permissão de seção `statCards`.
 */
export const STAT_CARD_PERMISSIONS = {
  receitaDoMes: 'dashboard.indicadores.receita',
  novosClientes: 'dashboard.indicadores.novos_clientes',
  aulasAgendadas: 'dashboard.indicadores.aulas_agendadas',
  conversoes: 'dashboard.indicadores.conversoes',
} as const;

/** Todas as permissões de dashboard, usada para montar o perfil "acesso total" nos mocks. */
export const ALL_DASHBOARD_PERMISSIONS = [
  ...Object.values(DASHBOARD_PERMISSIONS),
  ...Object.values(STAT_CARD_PERMISSIONS),
];
