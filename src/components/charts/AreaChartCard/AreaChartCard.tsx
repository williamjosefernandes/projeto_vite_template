import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useChartTheme } from '../../../lib/chart-theme';
import { Card } from '../../ui/Card';
import { ChartTooltip } from '../ChartTooltip';
import type { ChartSeriesConfig } from '../types';

export interface AreaChartCardProps {
  title: string;
  data: Array<Record<string, string | number>>;
  /** Campo do eixo X (ex.: "date", "month"). */
  xKey: string;
  series: ChartSeriesConfig[];
  height?: number;
  className?: string;
}

/**
 * Wrapper de área do Recharts. Série principal (índice 0) usa violet-600 com
 * preenchimento em gradiente; séries adicionais usam cinza neutro sem preenchimento.
 */
export function AreaChartCard({ title, data, xKey, series, height = 280, className }: AreaChartCardProps) {
  const theme = useChartTheme();
  const gradientId = 'area-chart-card-gradient';

  return (
    <Card className={className}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ left: -16, right: 8, top: 4, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.primary} stopOpacity={0.35} />
                <stop offset="95%" stopColor={theme.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={theme.grid} vertical={false} />
            <XAxis dataKey={xKey} stroke={theme.axisText} tickLine={false} axisLine={false} fontSize={12} />
            <YAxis stroke={theme.axisText} tickLine={false} axisLine={false} fontSize={12} width={40} />
            <Tooltip content={<ChartTooltip />} />
            {series.map((s, index) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label ?? s.key}
                stroke={s.color ?? (index === 0 ? theme.primary : theme.secondary)}
                strokeWidth={2}
                fill={index === 0 ? `url(#${gradientId})` : 'transparent'}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
