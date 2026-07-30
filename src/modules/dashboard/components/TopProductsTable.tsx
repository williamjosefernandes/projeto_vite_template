import { Card } from '../../../components/ui';
import type { TopProductData } from '../mocks/dashboard.mock';

interface TopProductsTableProps {
  products: TopProductData[];
}

export function TopProductsTable({ products }: TopProductsTableProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Top Produtos / Serviços</Card.Title>
        <button type="button" className="text-sm font-medium text-violet-600 dark:text-violet-400">
          Ver todos
        </button>
      </Card.Header>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-xs font-medium uppercase tracking-wide text-gray-400">
            <th className="pb-3 font-medium">Produto / Serviço</th>
            <th className="pb-3 text-right font-medium">Vendas</th>
            <th className="pb-3 text-right font-medium">Faturamento</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-3 pr-4">
                <p className="text-gray-900 dark:text-gray-100">{product.name}</p>
                <div className="mt-1.5 h-1 w-40 max-w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className="h-full rounded-full bg-violet-600"
                    style={{ width: `${product.sharePercent}%` }}
                  />
                </div>
              </td>
              <td className="py-3 text-right text-gray-700 dark:text-gray-300">{product.sales}</td>
              <td className="py-3 text-right text-gray-700 dark:text-gray-300">{product.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
