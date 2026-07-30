import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Card, Input, Typography } from '../../../components/ui';

const widthScale = [
  { token: 'border-0', px: '0px', className: 'border-0' },
  { token: 'border', px: '1px (padrão)', className: 'border' },
  { token: 'border-2', px: '2px (ênfase)', className: 'border-2' },
  { token: 'border-4', px: '4px (uso raro/destaque)', className: 'border-4' },
];

const styleScale = [
  { token: 'solid', description: 'Padrão para a maioria das superfícies.', className: 'border-solid' },
  { token: 'dashed', description: 'Áreas de upload, placeholders e anotações.', className: 'border-dashed' },
  { token: 'dotted', description: 'Divisórias sutis e decorativas.', className: 'border-dotted' },
  { token: 'none', description: 'Quando a separação vem só de sombra/espaçamento.', className: 'border-none' },
];

const radiusScale = [
  { token: 'radius-none', px: '0px', className: 'rounded-none' },
  { token: 'radius-sm', px: '2px', className: 'rounded-sm' },
  { token: 'radius (padrão)', px: '4px', className: 'rounded' },
  { token: 'radius-md', px: '6px', className: 'rounded-md' },
  { token: 'radius-lg', px: '8px', className: 'rounded-lg' },
  { token: 'radius-xl', px: '12px', className: 'rounded-xl' },
  { token: 'radius-2xl', px: '16px', className: 'rounded-2xl' },
  { token: 'radius-full', px: '9999px', className: 'rounded-full' },
];

const colorExamples = [
  { token: 'border-gray-200 / border-gray-800', usage: 'Padrão (cards, inputs, divisores)', className: 'border-gray-200 dark:border-gray-800' },
  { token: 'border-violet-500', usage: 'Foco / elemento ativo', className: 'border-violet-500 ring-2 ring-violet-500/30' },
  { token: 'border-red-500', usage: 'Erro de validação', className: 'border-red-500' },
  { token: 'border-green-500', usage: 'Sucesso de validação', className: 'border-green-500' },
  { token: 'border-amber-500', usage: 'Aviso', className: 'border-amber-500' },
];

const componentUsage = [
  { component: 'Button', radius: 'rounded-lg', border: 'Nenhuma (primary/danger) ou 1px (secondary)' },
  { component: 'Card', radius: 'rounded-xl', border: '1px, border-gray-200/800' },
  { component: 'Badge', radius: 'rounded-full', border: 'Nenhuma' },
  { component: 'Input', radius: 'rounded-lg', border: '1px, border-gray-300/700' },
  { component: 'Modal', radius: 'rounded-2xl', border: 'Nenhuma (usa shadow-xl)' },
  { component: 'Avatar', radius: 'rounded-full', border: 'Nenhuma' },
];

const guidelines = [
  'Use bordas visíveis apenas quando a superfície precisar de separação clara do fundo.',
  'Prefira sombra a borda pesada para indicar elevação — combine as duas com moderação.',
  'Use a cor de borda de foco (violet-500) apenas em elementos interativos focados.',
  'Mantenha o raio consistente entre elementos do mesmo nível hierárquico (ex.: todos os cards de um grid).',
];

const bestPractices = [
  'Siga a escala de raios — não crie valores intermediários fora da tabela.',
  'Bordas de erro/sucesso/aviso são só para estados de validação, não decoração.',
  'Combine border + shadow-sm em vez de border-2 para indicar destaque sutil.',
  'Teste o contraste da borda em light e dark antes de finalizar uma tela nova.',
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

export function BordasPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Página provisória — aguardando o print de referência (<code>Bordas.png</code>) para ajuste fino. O conteúdo abaixo
          segue o mesmo padrão visual das demais páginas de Fundamentos, com os tokens reais do projeto.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Card.Header>
            <CardTitle>Escala de Espessura de Borda</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {widthScale.map((w) => (
                <div key={w.token} className="text-center">
                  <div className={`h-16 w-full rounded-lg border-gray-400 bg-white dark:border-gray-500 ${w.className}`} />
                  <p className="mt-2 font-mono text-xs font-semibold text-gray-700 dark:text-gray-200">{w.token}</p>
                  <p className="text-[11px] text-gray-400">{w.px}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Estilos de Borda</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-2 gap-4">
              {styleScale.map((s) => (
                <div key={s.token}>
                  <div className={`h-16 w-full rounded-lg border-2 border-gray-400 bg-white dark:border-gray-500 ${s.className}`} />
                  <p className="mt-2 font-mono text-xs font-semibold text-gray-700 dark:text-gray-200">{s.token}</p>
                  <p className="text-[11px] text-gray-400">{s.description}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <CardTitle>Raios de Borda</CardTitle>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
            {radiusScale.map((r) => (
              <div key={r.token} className="text-center">
                <div className={`mx-auto h-14 w-14 border-2 border-violet-500 ${r.className}`} />
                <p className="mt-2 text-[11px] font-medium text-gray-600 dark:text-gray-300">{r.token}</p>
                <p className="text-[10px] text-gray-400">{r.px}</p>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Card.Header>
            <CardTitle>Cores de Borda</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-3">
            {colorExamples.map((c) => (
              <div key={c.token} className="flex items-center gap-3">
                <Input readOnly value="Exemplo" className={`w-40 shrink-0 ${c.className}`} />
                <div>
                  <p className="font-mono text-xs font-semibold text-gray-700 dark:text-gray-200">{c.token}</p>
                  <p className="text-[11px] text-gray-400">{c.usage}</p>
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Aplicação por Componente</CardTitle>
          </Card.Header>
          <Card.Body className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th>Componente</Th>
                  <Th>Raio</Th>
                  <Th>Borda</Th>
                </tr>
              </thead>
              <tbody>
                {componentUsage.map((c) => (
                  <tr key={c.component}>
                    <Td>{c.component}</Td>
                    <Td mono>{c.radius}</Td>
                    <Td>{c.border}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Card.Header>
            <CardTitle>Diretrizes de Uso</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-2">
            {guidelines.map((g) => (
              <div key={g} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                <span>{g}</span>
              </div>
            ))}
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Boas Práticas</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-2">
            {bestPractices.map((p) => (
              <div key={p} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                <span>{p}</span>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
