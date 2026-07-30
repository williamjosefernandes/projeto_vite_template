import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { Card, Select, Typography } from '../../../components/ui';
import { useChartTheme } from '../../../lib/chart-theme';
import type { FinancialSummaryData } from '../mocks/dashboard.mock';

interface FinancialSummaryCardProps {
  summary: FinancialSummaryData;
}

export function FinancialSummaryCard({ summary }: FinancialSummaryCardProps) {
  const theme = useChartTheme();
  const sparklineData = summary.sparkline.map((value, index) => ({ index, value }));

  return (
    <Card>
      <Card.Header>
        <Card.Title>Resumo financeiro</Card.Title>
        <Select defaultValue="este-mes">
          <Select.Trigger className="w-32">
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="este-mes">Este mês</Select.Item>
            <Select.Item value="mes-passado">Mês passado</Select.Item>
          </Select.Content>
        </Select>
      </Card.Header>

      <div className="flex items-center gap-8">
        <div>
          <Typography variant="caption">Receita</Typography>
          <p className="mt-1 text-lg font-semibold text-green-600 dark:text-green-400">{summary.revenue}</p>
        </div>
        <div>
          <Typography variant="caption">Despesas</Typography>
          <p className="mt-1 text-lg font-semibold text-red-600 dark:text-red-400">{summary.expenses}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-800/60">
        <div>
          <Typography variant="caption">Lucro líquido</Typography>
          <Typography variant="kpi" className="mt-1">
            {summary.netProfit}
          </Typography>
          <p className="mt-1 text-sm font-medium text-green-600 dark:text-green-400">
            ↑ {summary.netProfitDeltaPercent}% vs mês anterior
          </p>
        </div>
        <div className="h-14 w-28 shrink-0">
          <ResponsiveContainer>
            <LineChart data={sparklineData}>
              <Line type="monotone" dataKey="value" stroke={theme.primary} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
