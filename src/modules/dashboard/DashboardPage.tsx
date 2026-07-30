import { useSessionStore } from '../../store/useSessionStore';
import { DashboardHeader } from './components/DashboardHeader';
import { FinancialSummaryCard } from './components/FinancialSummaryCard';
import { NotificationsCard } from './components/NotificationsCard';
import { PerformanceCard } from './components/PerformanceCard';
import { RecentActivitiesCard } from './components/RecentActivitiesCard';
import { StatCardsGrid } from './components/StatCardsGrid';
import { TodayAgendaCard } from './components/TodayAgendaCard';
import { TopProductsTable } from './components/TopProductsTable';
import { useDashboardData } from './hooks/useDashboardData';

const PERIOD_LABEL = '23 - 29 de jul, 2025';
const PRODUCT_NAME = 'Sua Marca';

export function DashboardPage() {
  const user = useSessionStore((s) => s.user);
  const data = useDashboardData();

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader userName={user.name} periodLabel={PERIOD_LABEL} quickActions={data.quickActions} />

      <StatCardsGrid stats={data.statCards} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <PerformanceCard data={data.performanceData} />
          <RecentActivitiesCard activities={data.recentActivities} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TopProductsTable products={data.topProducts} />
            <FinancialSummaryCard summary={data.financialSummary} />
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-1">
          <TodayAgendaCard items={data.todayAgenda} />
          <NotificationsCard notifications={data.notifications} />
        </div>
      </div>

      <p className="py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} {PRODUCT_NAME}. Todos os direitos reservados.
      </p>
    </div>
  );
}
