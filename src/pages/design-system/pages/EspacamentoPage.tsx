import type { ReactNode } from 'react';
import { CheckCircle2, Shield, XCircle } from 'lucide-react';
import { Button, Card, SpacingBar, Typography } from '../../../components/ui';

const spacingScale = [
  { token: 'space-0', rem: '0rem', px: 0 },
  { token: 'space-1', rem: '0.25rem', px: 4 },
  { token: 'space-2', rem: '0.5rem', px: 8 },
  { token: 'space-3', rem: '0.75rem', px: 12 },
  { token: 'space-4', rem: '1rem', px: 16 },
  { token: 'space-5', rem: '1.25rem', px: 20 },
  { token: 'space-6', rem: '1.5rem', px: 24 },
  { token: 'space-8', rem: '2rem', px: 32 },
  { token: 'space-10', rem: '2.5rem', px: 40 },
  { token: 'space-12', rem: '3rem', px: 48 },
  { token: 'space-16', rem: '4rem', px: 64 },
  { token: 'space-20', rem: '5rem', px: 80 },
  { token: 'space-24', rem: '6rem', px: 96 },
  { token: 'space-32', rem: '8rem', px: 128 },
];

const maxPx = Math.max(...spacingScale.map((s) => s.px));

const semanticSpacing = [
  { token: 'spacing-xs', value: '4px (space-1)', usage: 'Ajustes mínimos' },
  { token: 'spacing-sm', value: '8px (space-2)', usage: 'Elementos próximos' },
  { token: 'spacing-md', value: '16px (space-4)', usage: 'Padrão da interface' },
  { token: 'spacing-lg', value: '24px (space-6)', usage: 'Seções e cards' },
  { token: 'spacing-xl', value: '32px (space-8)', usage: 'Blocos grandes' },
  { token: 'spacing-2xl', value: '48px (space-12)', usage: 'Separações de página' },
];

const bestPractices = [
  'Use os tokens da escala, evite valores arbitrários.',
  'Mantenha consistência nos espaçamentos.',
  'Prefira espaçamentos semânticos nos componentes.',
  'Siga a base de 8px para melhor ritmo visual.',
  'Garanta respiro suficiente entre seções.',
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

function DashedAnnotation({ label, className }: { label: string; className: string }) {
  return (
    <div className={`absolute flex items-center justify-center border-dashed border-violet-400 text-[10px] font-medium text-violet-600 dark:border-violet-600 dark:text-violet-400 ${className}`}>
      <span className="bg-violet-50 px-1 dark:bg-gray-900">{label}</span>
    </div>
  );
}

export function EspacamentoPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr_0.9fr]">
        <Card>
          <Card.Header>
            <CardTitle>Escala de Espaçamentos</CardTitle>
          </Card.Header>
          <Card.Body>
            <Typography variant="caption" className="normal-case">
              Base de 8px (0.5rem) para consistência em toda a interface.
            </Typography>
            <table className="mt-3 w-full border-collapse">
              <thead>
                <tr>
                  <Th>Token</Th>
                  <Th>Rem</Th>
                  <Th>Pixels</Th>
                  <Th>Visual</Th>
                </tr>
              </thead>
              <tbody>
                {spacingScale.map((s) => (
                  <tr key={s.token}>
                    <Td mono>{s.token}</Td>
                    <Td>{s.rem}</Td>
                    <Td>{s.px}px</Td>
                    <td className="border-b border-gray-100 px-3 py-2 dark:border-gray-800/60">
                      <SpacingBar px={s.px} maxPx={maxPx} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Aplicação Prática</CardTitle>
          </Card.Header>
          <Card.Body>
            <Typography variant="caption" className="normal-case">
              Como os espaçamentos são utilizados nos componentes.
            </Typography>
            <div className="relative mt-4 rounded-lg border border-dashed border-violet-300 p-6 dark:border-violet-700">
              <DashedAnnotation label="space-6" className="left-1/2 top-0 h-3 w-px -translate-x-1/2 -translate-y-full border-l" />
              <DashedAnnotation label="space-6" className="left-0 top-1/2 h-px w-3 -translate-x-full -translate-y-1/2 border-t" />
              <DashedAnnotation label="space-6" className="right-0 top-1/2 h-px w-3 translate-x-full -translate-y-1/2 border-t" />
              <Card className="space-y-3 shadow-md">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-white">
                  <Shield className="h-4 w-4" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Card de Exemplo</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Aplicando os tokens de espaçamento para um layout consistente e harmônico.
                  </p>
                </div>
                <div className="relative pt-1">
                  <DashedAnnotation label="space-4" className="left-0 -top-1 h-px w-full -translate-y-full border-t" />
                  <Button size="sm">Ação Principal</Button>
                </div>
              </Card>
            </div>
          </Card.Body>
        </Card>

        <div className="space-y-6">
          <Card>
            <Card.Header>
              <CardTitle>Espaçamentos Semânticos</CardTitle>
            </Card.Header>
            <Card.Body className="space-y-2">
              <Typography variant="caption" className="normal-case">
                Tokens com propósito específico para uso no dia a dia.
              </Typography>
              {semanticSpacing.map((s) => (
                <div key={s.token} className="flex items-center justify-between gap-2 border-b border-gray-100 py-2 last:border-0 dark:border-gray-800/60">
                  <span className="font-mono text-xs text-gray-700 dark:text-gray-200">{s.token}</span>
                  <span className="text-xs text-gray-400">{s.value}</span>
                  <span className="shrink-0 text-right text-xs text-gray-500 dark:text-gray-400">{s.usage}</span>
                </div>
              ))}
            </Card.Body>
          </Card>

          <Card className="border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/20">
            <Card.Header>
              <CardTitle>Boas Práticas</CardTitle>
            </Card.Header>
            <Card.Body className="space-y-2">
              {bestPractices.map((p) => (
                <div key={p} className="flex items-start gap-2 text-sm text-green-800 dark:text-green-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr_0.9fr]">
        <Card>
          <Card.Header>
            <CardTitle>Espaçamentos no Layout</CardTitle>
          </Card.Header>
          <Card.Body>
            <Typography variant="caption" className="normal-case">
              Aplicação dos tokens na estrutura do sistema.
            </Typography>
            <div className="relative mt-4 flex gap-6 rounded-lg border border-dashed border-violet-300 bg-violet-50/50 p-6 dark:border-violet-700 dark:bg-violet-900/10">
              <DashedAnnotation label="space-6" className="left-1/2 top-0 h-3 w-px -translate-x-1/2 -translate-y-full border-l" />
              <div className="flex h-40 w-24 shrink-0 items-center justify-center rounded-lg border border-violet-300 bg-white text-center text-xs text-gray-500 dark:border-violet-700 dark:bg-gray-900 dark:text-gray-400">
                Sidebar
                <br />
                280px
              </div>
              <div className="flex h-40 flex-1 items-center justify-center rounded-lg border border-violet-300 bg-white text-xs text-gray-500 dark:border-violet-700 dark:bg-gray-900 dark:text-gray-400">
                Área de Conteúdo
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Espaçamentos entre Componentes</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-4">
            <Typography variant="caption" className="normal-case">
              Padrão de distância entre elementos.
            </Typography>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Entre elementos <span className="font-mono">space-2 (8px)</span>
              </p>
              <div className="mt-1.5 flex gap-2">
                <Button size="sm" variant="secondary">Botão</Button>
                <Button size="sm">Botão</Button>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Entre inputs <span className="font-mono">space-4 (16px)</span>
              </p>
              <div className="mt-1.5 space-y-4">
                <div className="h-8 rounded-lg border border-gray-300 dark:border-gray-700" />
                <div className="h-8 rounded-lg border border-gray-300 dark:border-gray-700" />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Entre cards <span className="font-mono">space-6 (24px)</span>
              </p>
              <div className="mt-1.5 flex gap-6">
                <div className="h-10 flex-1 rounded-lg border border-gray-300 text-center text-xs leading-10 text-gray-500 dark:border-gray-700 dark:text-gray-400">Card</div>
                <div className="h-10 flex-1 rounded-lg border border-gray-300 text-center text-xs leading-10 text-gray-500 dark:border-gray-700 dark:text-gray-400">Card</div>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Entre seções <span className="font-mono">space-12 (48px)</span>
              </p>
              <div className="mt-1.5 flex gap-12">
                <div className="h-10 flex-1 rounded-lg border border-gray-300 text-center text-xs leading-10 text-gray-500 dark:border-gray-700 dark:text-gray-400">Seção</div>
                <div className="h-10 flex-1 rounded-lg border border-gray-300 text-center text-xs leading-10 text-gray-500 dark:border-gray-700 dark:text-gray-400">Seção</div>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Comparação Visual</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-3">
            <Typography variant="caption" className="normal-case">
              O impacto do espaçamento na legibilidade.
            </Typography>
            <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-900/20">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> Com espaçamento correto
              </div>
              <p className="mb-3 text-[11px] text-green-800/80 dark:text-green-300/80">
                Conteúdo organizado, legível e agradável.
              </p>
              <div className="rounded-lg bg-white p-4 dark:bg-gray-900">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Título da seção</p>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Um bom espaçamento cria respiro visual e melhora a experiência do usuário.
                </p>
                <Button size="sm" className="mt-3">Saiba mais</Button>
              </div>
            </div>
            <div className="rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-red-700 dark:text-red-400">
                <XCircle className="h-3.5 w-3.5" /> Sem espaçamento adequado
              </div>
              <p className="mb-1 text-[11px] text-red-800/80 dark:text-red-300/80">
                Conteúdo apertado e cansativo para leitura.
              </p>
              <div className="rounded-lg bg-white p-1 dark:bg-gray-900">
                <p className="text-sm font-semibold leading-none text-gray-900 dark:text-gray-100">Título da seção</p>
                <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                  Um bom espaçamento cria respiro visual e melhora a experiência do usuário.<Button size="sm" className="ml-1 align-middle">Saiba mais</Button>
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
