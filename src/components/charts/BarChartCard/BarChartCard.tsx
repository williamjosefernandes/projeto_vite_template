import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useChartTheme } from '../../../lib/chart-theme';
import { Card } from '../../ui/Card';
import { ChartTooltip } from '../ChartTooltip';
import type { ChartSeriesConfig } from '../types';

export interface BarChartCardProps {
  title: string;
  data: Array<Record<string, string | number>>;
  xKey: string;
  series: ChartSeriesConfig[];
  height?: number;
  className?: string;
}

/** Wrapper de barras do Recharts. Série principal (índice 0) usa violet-600; demais, cinza neutro. */
export function BarChartCard({ title, data, xKey, series, height = 280, className }: BarChartCardProps) {
  const theme = useChartTheme();

  return (
    <Card className={className}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ left: -16, right: 8, top: 4, bottom: 0 }}>
            <CartesianGrid stroke={theme.grid} vertical={false} />
            <XAxis dataKey={xKey} stroke={theme.axisText} tickLine={false} axisLine={false} fontSize={12} />
            <YAxis stroke={theme.axisText} tickLine={false} axisLine={false} fontSize={12} width={40} />
            <Tooltip cursor={{ fill: theme.grid, opacity: 0.4 }} content={<ChartTooltip />} />
            {series.map((s, index) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label ?? s.key}
                fill={s.color ?? (index === 0 ? theme.primary : theme.secondary)}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
