import type { ReactNode } from 'react';
import { Accessibility, AlertCircle, Info, Ruler, Smartphone, Type } from 'lucide-react';
import { Card, Typography } from '../../../components/ui';

const hierarchy = [
  {
    token: 'H1',
    weightLabel: 'Semibold',
    sample: 'Título H1',
    description: 'Usado para títulos de página e saudações principais.',
    className: 'text-2xl font-semibold text-gray-900 dark:text-gray-100',
  },
  {
    token: 'H2',
    weightLabel: 'Semibold',
    sample: 'Título H2',
    description: 'Usado para títulos de card e de seção.',
    className: 'text-base font-semibold text-gray-900 dark:text-gray-100',
  },
  {
    token: 'Body',
    weightLabel: 'Regular',
    sample: 'Este é um exemplo de texto corpo. Utilizado para conteúdo principal, descrições e parágrafos.',
    description: 'Texto padrão usado em parágrafos e descrições.',
    className: 'text-sm text-gray-600 dark:text-gray-300',
  },
  {
    token: 'Caption',
    weightLabel: 'Regular',
    sample: 'TEXTO DE LEGENDA',
    description: 'Legendas, labels de campo e categorias em caixa alta.',
    className: 'text-xs text-gray-400 uppercase tracking-wide',
  },
  {
    token: 'KPI',
    weightLabel: 'Semibold',
    sample: 'R$ 82.430',
    description: 'Valor de destaque em cards de indicador (StatCard).',
    className: 'text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100',
  },
];

const scaleTable = [
  { token: 'h1', family: 'Inter', weight: '600 (Semibold)', size: '24px', lineHeight: '32px (1.33)' },
  { token: 'h2', family: 'Inter', weight: '600 (Semibold)', size: '16px', lineHeight: '24px (1.5)' },
  { token: 'body', family: 'Inter', weight: '400 (Regular)', size: '14px', lineHeight: '20px (1.43)' },
  { token: 'caption', family: 'Inter', weight: '400 (Regular)', size: '12px', lineHeight: '16px (1.33)' },
  { token: 'kpi', family: 'Inter', weight: '600 (Semibold)', size: '24px', lineHeight: '32px (1.33)' },
];

const weights = [
  { label: 'Regular', value: '400', className: 'font-normal' },
  { label: 'Medium', value: '500', className: 'font-medium' },
  { label: 'Semibold', value: '600', className: 'font-semibold' },
  { label: 'Bold', value: '700', className: 'font-bold' },
];

const textStyles = [
  {
    title: 'Texto primário',
    description: 'Utilizado para a maioria dos conteúdos e informações.',
    className: 'text-gray-900 dark:text-gray-100',
  },
  {
    title: 'Texto secundário',
    description: 'Utilizado para informações de apoio com menor ênfase.',
    className: 'text-gray-600 dark:text-gray-300',
  },
  {
    title: 'Texto desabilitado',
    description: 'Utilizado para conteúdos inativos e indisponíveis.',
    className: 'text-gray-400 dark:text-gray-600',
  },
  {
    title: 'Texto em destaque',
    description: 'Utilizado para links, CTAs e elementos interativos.',
    className: 'text-violet-700 dark:text-violet-400',
  },
];

const bestPractices = [
  {
    title: 'Mantenha a hierarquia',
    description: 'Utilize os níveis tipográficos de forma consistente para guiar o usuário.',
    icon: Type,
  },
  {
    title: 'Legibilidade primeiro',
    description: 'Garanta contraste suficiente entre texto e fundo para todos os tamanhos.',
    icon: Ruler,
  },
  {
    title: 'Responsividade',
    description: 'A escala foi pensada para funcionar bem em mobile, tablet e desktop.',
    icon: Smartphone,
  },
  {
    title: 'Evite excessos',
    description: 'Use no máximo 3 níveis de ênfase por tela para não poluir a interface.',
    icon: AlertCircle,
  },
  {
    title: 'Acessibilidade',
    description: 'Respeite tamanhos mínimos e contraste para atender ao padrão WCAG 2.1 AA.',
    icon: Accessibility,
  },
];

function CardTitle({ children }: { children: string }) {
  return (
    <Typography as="h2" variant="h2" className="text-base">
      {children}
    </Typography>
  );
}

function Th({ children }: { children: ReactNode }) {
  return (
    <th className="border-b border-gray-200 px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-gray-400 dark:border-gray-800">
      {children}
    </th>
  );
}

function Td({ children, mono = false }: { children: ReactNode; mono?: boolean }) {
  return (
    <td
      className={`border-b border-gray-100 px-3 py-2 text-sm text-gray-700 dark:border-gray-800/60 dark:text-gray-200 ${mono ? 'font-mono text-xs' : ''}`}
    >
      {children}
    </td>
  );
}

export function TipografiaPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <Card.Header>
            <CardTitle>Hierarquia Tipográfica</CardTitle>
          </Card.Header>
          <Card.Body className="divide-y divide-gray-100 dark:divide-gray-800">
            {hierarchy.map((h) => (
              <div key={h.token} className="grid grid-cols-[100px_1fr_auto] items-center gap-4 py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-semibold text-violet-700 dark:text-violet-400">{h.token}</p>
                  <p className="text-xs text-gray-400">Inter {h.weightLabel}</p>
                </div>
                <p className={h.className}>{h.sample}</p>
                <p className="max-w-[180px] text-right text-xs text-gray-400">{h.description}</p>
              </div>
            ))}
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Escala Tipográfica</CardTitle>
          </Card.Header>
          <Card.Body className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th>Token</Th>
                  <Th>Família</Th>
                  <Th>Peso</Th>
                  <Th>Tamanho</Th>
                  <Th>Altura de linha</Th>
                </tr>
              </thead>
              <tbody>
                {scaleTable.map((t) => (
                  <tr key={t.token}>
                    <Td mono>{t.token}</Td>
                    <Td>{t.family}</Td>
                    <Td>{t.weight}</Td>
                    <Td>{t.size}</Td>
                    <Td>{t.lineHeight}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Inter é uma fonte variável com excelente legibilidade em telas. O projeto usa os pesos 400, 500, 600 e 700 via{' '}
                <code>@fontsource/inter</code> para criar hierarquia e ênfase de forma consistente.
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Card.Header>
            <CardTitle>Pesos Disponíveis</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-4 gap-4">
              {weights.map((w) => (
                <div key={w.value} className="text-center">
                  <p className={`text-3xl text-gray-900 dark:text-gray-100 ${w.className}`}>Aa</p>
                  <p className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-300">{w.value}</p>
                  <p className="text-[11px] text-gray-400">{w.label}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Estilos de Texto</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-3">
            {textStyles.map((s) => (
              <div key={s.title}>
                <p className={`text-sm font-semibold ${s.className}`}>{s.title}</p>
                <p className="text-xs text-gray-400">{s.description}</p>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>

      <div>
        <Typography as="h2" variant="h2" className="mb-3 text-base">
          Boas Práticas
        </Typography>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {bestPractices.map((p) => (
            <Card key={p.title} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                <p.icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{p.title}</p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{p.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
