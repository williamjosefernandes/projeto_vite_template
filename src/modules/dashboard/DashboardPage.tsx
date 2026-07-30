import { LayoutDashboard } from 'lucide-react';
import type { ReactNode } from 'react';
import { EmptyState } from '../../components/ui';
import { usePermission } from '../../hooks/usePermission';
import { useSessionStore } from '../../store/useSessionStore';
import { DashboardHeader } from './components/DashboardHeader';
import { FinancialSummaryCard } from './components/FinancialSummaryCard';
import { NotificationsCard } from './components/NotificationsCard';
import { PerformanceCard } from './components/PerformanceCard';
import { RecentActivitiesCard } from './components/RecentActivitiesCard';
import { StatCardsGrid } from './components/StatCardsGrid';
import { TodayAgendaCard } from './components/TodayAgendaCard';
import { TopProductsTable } from './components/TopProductsTable';
import { DASHBOARD_PERMISSIONS } from './dashboard.permissions';
import { useDashboardData } from './hooks/useDashboardData';

const PERIOD_LABEL = '23 - 29 de jul, 2025';
const PRODUCT_NAME = 'Sua Marca';

/**
 * Duas colunas (`md:grid-cols-2`) que colapsam para uma só quando um dos
 * dois itens está oculto — o item restante ocupa a largura toda em vez de
 * deixar uma coluna vazia ao lado.
 */
function CollapsingTwoColRow({ left, right }: { left: ReactNode; right: ReactNode }) {
  if (!left && !right) return null;
  const fullWidth = !left || !right;
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {left && <div className={fullWidth ? 'md:col-span-2' : undefined}>{left}</div>}
      {right && <div className={fullWidth ? 'md:col-span-2' : undefined}>{right}</div>}
    </div>
  );
}

export function DashboardPage() {
  const user = useSessionStore((s) => s.user);
  const permissions = useSessionStore((s) => s.permissions);
  const data = useDashboardData();

  const canSeeStatCards = usePermission(DASHBOARD_PERMISSIONS.statCards);
  // Filtro granular por StatCard (ver StatCardsGrid): calculado aqui também, só para
  // decidir se a seção inteira deve ocupar espaço no layout ou desaparecer.
  const visibleStats = canSeeStatCards
    ? data.statCards.filter((stat) => permissions.includes(stat.requiredPermission))
    : [];

  const canSeePerformance = usePermission(DASHBOARD_PERMISSIONS.performanceChart);
  const canSeeActivities = usePermission(DASHBOARD_PERMISSIONS.recentActivities);
  const canSeeAgenda = usePermission(DASHBOARD_PERMISSIONS.todayAgenda);
  const canSeeNotifications = usePermission(DASHBOARD_PERMISSIONS.notifications);
  const canSeeTopProducts = usePermission(DASHBOARD_PERMISSIONS.topProducts);
  const canSeeFinancialSummary = usePermission(DASHBOARD_PERMISSIONS.financialSummary);

  const showMainColumn = canSeePerformance || canSeeActivities || canSeeTopProducts || canSeeFinancialSummary;
  const showSidebarColumn = canSeeAgenda || canSeeNotifications;

  const hasAnyWidgetVisible = visibleStats.length > 0 || showMainColumn || showSidebarColumn;

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader userName={user.name} periodLabel={PERIOD_LABEL} quickActions={data.quickActions} />

      {!hasAnyWidgetVisible ? (
        <EmptyState
          icon={<LayoutDashboard className="h-6 w-6" strokeWidth={1.5} />}
          title="Nenhum item disponível"
          description="Você não tem permissão para visualizar nenhum item deste dashboard nesta conta. Fale com o administrador da conta para solicitar acesso."
        />
      ) : (
        <>
          {visibleStats.length > 0 && <StatCardsGrid stats={visibleStats} />}

          {(showMainColumn || showSidebarColumn) && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {showMainColumn && (
                <div
                  className={
                    showSidebarColumn ? 'flex flex-col gap-6 lg:col-span-2' : 'flex flex-col gap-6 lg:col-span-3'
                  }
                >
                  <CollapsingTwoColRow
                    left={canSeePerformance && <PerformanceCard data={data.performanceData} />}
                    right={canSeeActivities && <RecentActivitiesCard activities={data.recentActivities} />}
                  />
                  <CollapsingTwoColRow
                    left={canSeeTopProducts && <TopProductsTable products={data.topProducts} />}
                    right={canSeeFinancialSummary && <FinancialSummaryCard summary={data.financialSummary} />}
                  />
                </div>
              )}

              {showSidebarColumn && (
                <div className="flex flex-col gap-6 lg:col-span-1">
                  {canSeeAgenda && <TodayAgendaCard items={data.todayAgenda} />}
                  {canSeeNotifications && <NotificationsCard notifications={data.notifications} />}
                </div>
              )}
            </div>
          )}
        </>
      )}

      <p className="py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} {PRODUCT_NAME}. Todos os direitos reservados.
      </p>
    </div>
  );
}
