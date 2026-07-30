import { StatCard } from '../../../components/ui';
import type { StatCardData } from '../mocks/dashboard.mock';

interface StatCardsGridProps {
  stats: StatCardData[];
}

export function StatCardsGrid({ stats }: StatCardsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          icon={<stat.icon className="h-5 w-5" strokeWidth={1.5} />}
          iconColorClass={stat.iconColorClass}
          label={stat.label}
          value={stat.value}
          deltaPercent={stat.deltaPercent}
          deltaLabel={stat.deltaLabel}
        />
      ))}
    </div>
  );
}
