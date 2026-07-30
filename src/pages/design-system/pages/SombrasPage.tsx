import { FileText, Info, ListFilter, MessageSquare, SlidersHorizontal } from 'lucide-react';
import { Card, ShadowSwatch, Typography } from '../../../components/ui';

const shadowScale = [
  { token: 'shadow-none', description: 'Nenhuma sombra', value: 'box-shadow: none', className: 'shadow-none' },
  { token: 'shadow-xs', description: 'Sombra extra sutil', value: '0 1px 2px 0 rgba(0,0,0,0.05)', className: 'shadow-xs' },
  { token: 'shadow-sm', description: 'Sombra sutil', value: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)', className: 'shadow-sm' },
  { token: 'shadow-md', description: 'Sombra média', value: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)', className: 'shadow-md' },
  { token: 'shadow-lg', description: 'Sombra grande', value: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)', className: 'shadow-lg' },
  { token: 'shadow-xl', description: 'Sombra extra grande', value: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', className: 'shadow-xl' },
  { token: 'shadow-2xl', description: 'Sombra máxima', value: '0 25px 50px -12px rgba(0,0,0,0.25)', className: 'shadow-2xl' },
];

const appliedSurfaces = [
  { label: 'Elevado 1', token: 'shadow-sm', name: 'Card de conteúdo', description: 'Informações gerais e de apoio.', icon: FileText, className: 'shadow-sm' },
  { label: 'Elevado 2', token: 'shadow-md', name: 'Dropdown', description: 'Menus e listas de seleção.', icon: SlidersHorizontal, className: 'shadow-md' },
  { label: 'Elevado 3', token: 'shadow-lg', name: 'Modal', description: 'Diálogos e janelas modais.', icon: ListFilter, className: 'shadow-lg' },
  { label: 'Elevado 4', token: 'shadow-xl', name: 'Popover', description: 'Informações contextuais.', icon: MessageSquare, className: 'shadow-xl' },
  { label: 'Elevado 5', token: 'shadow-2xl', name: 'Tooltip', description: 'Dicas e pequenas mensagens.', icon: Info, className: 'shadow-2xl' },
];

const coloredShadows = [
  { token: 'shadow-primary', label: 'shadow-primary', value: 'rgba(127,34,254,0.25)', className: 'shadow-primary', textClass: 'text-violet-700 dark:text-violet-400' },
  { token: 'shadow-success', label: 'shadow-success', value: 'rgba(0,166,62,0.20)', className: 'shadow-success', textClass: 'text-green-700 dark:text-green-400' },
  { token: 'shadow-warning', label: 'shadow-warning', value: 'rgba(225,113,0,0.20)', className: 'shadow-warning', textClass: 'text-amber-700 dark:text-amber-400' },
  { token: 'shadow-danger', label: 'shadow-danger', value: 'rgba(231,0,11,0.20)', className: 'shadow-danger', textClass: 'text-red-700 dark:text-red-400' },
  { token: 'shadow-info', label: 'shadow-info', value: 'rgba(21,93,252,0.20)', className: 'shadow-info', textClass: 'text-blue-700 dark:text-blue-400' },
];

const insetShadows = [
  { token: 'inset-sm', value: 'inset 0 1px 2px 0 rgba(0,0,0,0.06)', className: 'shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.06)]' },
  { token: 'inset-md', value: 'inset 0 2px 4px 0 rgba(0,0,0,0.08)', className: 'shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.08)]' },
];

const guidelines = [
  { title: 'Use com propósito', description: 'Aplique sombras para comunicar hierarquia e profundidade.' },
  { title: 'Mantenha sutileza', description: 'Prefira sombras suaves para uma interface limpa e moderna.' },
  { title: 'Consistência', description: 'Use apenas as sombras definidas na escala para manter consistência visual.' },
  { title: 'Camadas', description: 'Combine com sobreposições e blur para experiências ricas.' },
];

const bestPractices = [
  'Não use muitas sombras diferentes. Siga a escala para manter harmonia.',
  'Evite sombras muito fortes em dispositivos móveis para melhor performance.',
  'Combine sombras com bordas e raios para superfícies elevadas.',
  'Teste contraste e acessibilidade em temas claro e escuro.',
];

function CardTitle({ children }: { children: string }) {
  return (
    <Typography as="h2" variant="h2" className="text-base">
      {children}
    </Typography>
  );
}

export function SombrasPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <Card>
          <Card.Header>
            <CardTitle>Escala de Sombras</CardTitle>
          </Card.Header>
          <Card.Body>
            <Typography variant="caption" className="normal-case">
              Baseadas em múltiplas camadas para criar profundidade.
            </Typography>
            <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
              {shadowScale.map((s) => (
                <ShadowSwatch
                  key={s.token}
                  shadowClassName={s.className}
                  label={s.token}
                  description={s.description}
                  value={s.value}
                />
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Diretrizes de Uso</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-4">
            {guidelines.map((g) => (
              <div key={g.title} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-600 text-[10px] text-white">
                  ✓
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{g.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{g.description}</p>
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <Card>
          <Card.Header>
            <CardTitle>Sombras Aplicadas em Superfícies</CardTitle>
          </Card.Header>
          <Card.Body>
            <Typography variant="caption" className="normal-case">
              Exemplos de aplicação da escala em componentes e superfícies.
            </Typography>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {appliedSurfaces.map((s) => (
                <div key={s.label}>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{s.label}</p>
                  <p className="font-mono text-[11px] text-gray-400">{s.token}</p>
                  <div className={`mt-2 rounded-xl border border-gray-100 bg-white p-4 ${s.className}`}>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                      <s.icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-gray-900">{s.name}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Cores das Sombras</CardTitle>
          </Card.Header>
          <Card.Body>
            <Typography variant="caption" className="normal-case">
              Todas as sombras utilizam a cor neutra 900 com diferentes níveis de opacidade.
            </Typography>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-900" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Neutro 900</p>
                <p className="font-mono text-xs text-gray-400">#101828</p>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-500 dark:bg-gray-800/60 dark:text-gray-400">
              <p>
                Aplicação: <code>rgba(16, 24, 40, α)</code>
              </p>
              <p className="mt-1">Onde α (alfa) varia conforme a elevação (0.05 a 0.25).</p>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <Card.Header>
            <CardTitle>Sombras Coloridas (Uso Especial)</CardTitle>
          </Card.Header>
          <Card.Body>
            <Typography variant="caption" className="normal-case">
              Utilizadas apenas em estados de destaque e feedback.
            </Typography>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {coloredShadows.map((s) => (
                <div key={s.token}>
                  <div className={`h-16 w-full rounded-lg border border-gray-100 bg-white ${s.className}`} />
                  <p className={`mt-2 text-xs font-semibold ${s.textClass}`}>{s.label}</p>
                  <p className="font-mono text-[10px] text-gray-400">{s.value}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Sombras Internas</CardTitle>
          </Card.Header>
          <Card.Body>
            <Typography variant="caption" className="normal-case">
              Utilizadas para inset, foco interno e efeitos sutis.
            </Typography>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {insetShadows.map((s) => (
                <div key={s.token}>
                  <div className={`h-16 w-full rounded-lg border border-gray-200 bg-white ${s.className}`} />
                  <p className="mt-2 text-xs font-semibold text-gray-700 dark:text-gray-200">{s.token}</p>
                  <p className="font-mono text-[10px] leading-tight text-gray-400">{s.value}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Boas Práticas</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-2">
            {bestPractices.map((p) => (
              <div key={p} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-600 text-[10px] text-white">
                  ✓
                </span>
                <span>{p}</span>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-violet-50 p-3 text-sm text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>Sombras são parte essencial da linguagem visual. Use-as para guiar o foco, criar hierarquia e proporcionar uma experiência mais natural e envolvente.</p>
      </div>
    </div>
  );
}
