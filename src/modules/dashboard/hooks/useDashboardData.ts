import {
  dashboardNotificationsMock,
  financialSummaryMock,
  performanceDataMock,
  quickActionsMock,
  recentActivitiesMock,
  statCardsMock,
  todayAgendaMock,
  topProductsMock,
} from '../mocks/dashboard.mock';

/**
 * Fonte única dos dados da página de Dashboard. Hoje retorna mocks estáticos;
 * ver docs/03-pagina-dashboard.md para como substituir por dados reais
 * (ex.: um hook baseado em `@tanstack/react-query`) sem alterar os componentes visuais.
 */
export function useDashboardData() {
  return {
    statCards: statCardsMock,
    performanceData: performanceDataMock,
    recentActivities: recentActivitiesMock,
    todayAgenda: todayAgendaMock,
    notifications: dashboardNotificationsMock,
    topProducts: topProductsMock,
    financialSummary: financialSummaryMock,
    quickActions: quickActionsMock,
  };
}
