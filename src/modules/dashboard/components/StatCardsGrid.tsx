import { PermissionGate, StatCard } from '../../../components/ui';
import type { StatCardData } from '../mocks/dashboard.mock';

interface StatCardsGridProps {
  stats: StatCardData[];
}

/**
 * Cada StatCard é condicionado individualmente pela sua própria permissão
 * granular (`stat.requiredPermission`), além da permissão de seção
 * (`DASHBOARD_PERMISSIONS.statCards`) já checada por quem renderiza este
 * componente. Isso permite, por ex., ver "Novos Clientes" sem ver "Receita".
 */
export function StatCardsGrid({ stats }: StatCardsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <PermissionGate key={stat.id} permission={stat.requiredPermission}>
          <StatCard
            icon={<stat.icon className="h-5 w-5" strokeWidth={1.5} />}
            iconColorClass={stat.iconColorClass}
            label={stat.label}
            value={stat.value}
            deltaPercent={stat.deltaPercent}
            deltaLabel={stat.deltaLabel}
          />
        </PermissionGate>
      ))}
    </div>
  );
}
