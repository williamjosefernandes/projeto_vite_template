import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartTooltip } from '../../../components/charts';
import { Card, Select } from '../../../components/ui';
import { useChartTheme } from '../../../lib/chart-theme';

interface PerformanceCardProps {
  data: Array<{ date: string; valor: number }>;
}

/**
 * Mesma lógica visual do `AreaChartCard` (Etapa 2), mas montada diretamente
 * aqui porque o Dashboard precisa de um seletor de período no cabeçalho do
 * card — algo que o wrapper genérico não expõe.
 */
export function PerformanceCard({ data }: PerformanceCardProps) {
  const theme = useChartTheme();
  const gradientId = 'performance-card-gradient';

  return (
    <Card>
      <Card.Header>
        <Card.Title>Desempenho</Card.Title>
        <Select defaultValue="7dias">
          <Select.Trigger className="w-28">
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="7dias">7 dias</Select.Item>
            <Select.Item value="30dias">30 dias</Select.Item>
            <Select.Item value="90dias">90 dias</Select.Item>
          </Select.Content>
        </Select>
      </Card.Header>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ left: -16, right: 8, top: 4, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.primary} stopOpacity={0.35} />
                <stop offset="95%" stopColor={theme.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={theme.grid} vertical={false} />
            <XAxis dataKey="date" stroke={theme.axisText} tickLine={false} axisLine={false} fontSize={12} />
            <YAxis
              stroke={theme.axisText}
              tickLine={false}
              axisLine={false}
              fontSize={12}
              width={40}
              tickFormatter={(value: number) => (value === 0 ? '0' : `${value / 1000}k`)}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="valor"
              name="Valor"
              stroke={theme.primary}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
