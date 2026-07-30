import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useChartTheme } from '../../../lib/chart-theme';
import { Card } from '../../ui/Card';
import { ChartTooltip } from '../ChartTooltip';
import type { ChartSeriesConfig } from '../types';

export interface LineChartCardProps {
  title: string;
  data: Array<Record<string, string | number>>;
  xKey: string;
  series: ChartSeriesConfig[];
  height?: number;
  className?: string;
}

/** Wrapper de linha do Recharts. Série principal (índice 0) usa violet-600; demais, cinza neutro. */
export function LineChartCard({ title, data, xKey, series, height = 280, className }: LineChartCardProps) {
  const theme = useChartTheme();

  return (
    <Card className={className}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ left: -16, right: 8, top: 4, bottom: 0 }}>
            <CartesianGrid stroke={theme.grid} vertical={false} />
            <XAxis dataKey={xKey} stroke={theme.axisText} tickLine={false} axisLine={false} fontSize={12} />
            <YAxis stroke={theme.axisText} tickLine={false} axisLine={false} fontSize={12} width={40} />
            <Tooltip content={<ChartTooltip />} />
            {series.map((s, index) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label ?? s.key}
                stroke={s.color ?? (index === 0 ? theme.primary : theme.secondary)}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
