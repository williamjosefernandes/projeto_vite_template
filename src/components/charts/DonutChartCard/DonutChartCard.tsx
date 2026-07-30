import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { chartColors } from '../../../lib/chart-theme';
import { cn } from '../../../lib/utils';
import { Card } from '../../ui/Card';
import { Typography } from '../../ui/Typography';
import { ChartTooltip } from '../ChartTooltip';

export interface DonutChartDatum {
  name: string;
  value: number;
  /** Cor hex explícita. Por padrão usa a paleta categórica de `chart-theme.ts`. */
  color?: string;
}

export interface DonutChartCardProps {
  title: string;
  data: DonutChartDatum[];
  height?: number;
  className?: string;
  /** Rótulo exibido no centro do donut (ex.: "Total"). */
  centerLabel?: string;
  centerValue?: string | number;
}

/** Wrapper de rosca (donut) do Recharts, com legenda lateral e valor central opcionais. */
export function DonutChartCard({ title, data, height = 240, className, centerLabel, centerValue }: DonutChartCardProps) {
  return (
    <Card className={className}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative shrink-0" style={{ width: height, height }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius="65%" outerRadius="100%" paddingAngle={2}>
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color ?? chartColors.categorical[index % chartColors.categorical.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {(centerLabel || centerValue !== undefined) && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              {centerValue !== undefined && <Typography variant="kpi">{centerValue}</Typography>}
              {centerLabel && <Typography variant="caption">{centerLabel}</Typography>}
            </div>
          )}
        </div>
        <ul className="w-full space-y-2">
          {data.map((entry, index) => (
            <li key={entry.name} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span
                  className={cn('h-2.5 w-2.5 shrink-0 rounded-full')}
                  style={{ backgroundColor: entry.color ?? chartColors.categorical[index % chartColors.categorical.length] }}
                />
                {entry.name}
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{entry.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
