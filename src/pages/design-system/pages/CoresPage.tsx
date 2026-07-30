import { AlertTriangle, CheckCircle2, Circle, Info, XCircle } from 'lucide-react';
import { Badge, Card, ColorSwatch, Typography } from '../../../components/ui';

const primaryScale = [
  { shade: '50', hex: '#F5F3FF', className: 'bg-violet-50' },
  { shade: '100', hex: '#EDE9FE', className: 'bg-violet-100' },
  { shade: '200', hex: '#DDD6FF', className: 'bg-violet-200' },
  { shade: '300', hex: '#C4B4FF', className: 'bg-violet-300' },
  { shade: '400', hex: '#A684FF', className: 'bg-violet-400' },
  { shade: '500', hex: '#8E51FF', className: 'bg-violet-500' },
  { shade: '600', hex: '#7F22FE', className: 'bg-violet-600' },
  { shade: '700', hex: '#7008E7', className: 'bg-violet-700' },
  { shade: '800', hex: '#5D0EC0', className: 'bg-violet-800' },
  { shade: '900', hex: '#4D179A', className: 'bg-violet-900' },
];

const semanticRows = [
  {
    label: 'Sucesso',
    icon: CheckCircle2,
    iconClass: 'text-green-600 dark:text-green-400',
    mainHex: '#00A63E',
    shades: [
      { shade: '50', hex: '#F0FDF4', className: 'bg-green-50' },
      { shade: '100', hex: '#DBFCE7', className: 'bg-green-100' },
      { shade: '200', hex: '#B9F8CF', className: 'bg-green-200' },
      { shade: '300', hex: '#7BF1A8', className: 'bg-green-300' },
      { shade: '600', hex: '#00A63E', className: 'bg-green-600' },
      { shade: '700', hex: '#008236', className: 'bg-green-700' },
      { shade: '800', hex: '#016630', className: 'bg-green-800' },
      { shade: '900', hex: '#0D542B', className: 'bg-green-900' },
    ],
  },
  {
    label: 'Informativo',
    icon: Info,
    iconClass: 'text-blue-600 dark:text-blue-400',
    mainHex: '#155DFC',
    shades: [
      { shade: '50', hex: '#EFF6FF', className: 'bg-blue-50' },
      { shade: '100', hex: '#DBEAFE', className: 'bg-blue-100' },
      { shade: '200', hex: '#BEDBFF', className: 'bg-blue-200' },
      { shade: '300', hex: '#8EC5FF', className: 'bg-blue-300' },
      { shade: '600', hex: '#155DFC', className: 'bg-blue-600' },
      { shade: '700', hex: '#1447E6', className: 'bg-blue-700' },
      { shade: '800', hex: '#193CB8', className: 'bg-blue-800' },
      { shade: '900', hex: '#1C398E', className: 'bg-blue-900' },
    ],
  },
  {
    label: 'Aviso',
    icon: AlertTriangle,
    iconClass: 'text-amber-600 dark:text-amber-400',
    mainHex: '#E17100',
    shades: [
      { shade: '50', hex: '#FFFBEB', className: 'bg-amber-50' },
      { shade: '100', hex: '#FEF3C6', className: 'bg-amber-100' },
      { shade: '200', hex: '#FEE685', className: 'bg-amber-200' },
      { shade: '300', hex: '#FFD230', className: 'bg-amber-300' },
      { shade: '600', hex: '#E17100', className: 'bg-amber-600' },
      { shade: '700', hex: '#BB4D00', className: 'bg-amber-700' },
      { shade: '800', hex: '#973C00', className: 'bg-amber-800' },
      { shade: '900', hex: '#7B3306', className: 'bg-amber-900' },
    ],
  },
  {
    label: 'Erro',
    icon: XCircle,
    iconClass: 'text-red-600 dark:text-red-400',
    mainHex: '#E7000B',
    shades: [
      { shade: '50', hex: '#FEF2F2', className: 'bg-red-50' },
      { shade: '100', hex: '#FFE2E2', className: 'bg-red-100' },
      { shade: '200', hex: '#FFC9C9', className: 'bg-red-200' },
      { shade: '300', hex: '#FFA2A2', className: 'bg-red-300' },
      { shade: '600', hex: '#E7000B', className: 'bg-red-600' },
      { shade: '700', hex: '#C10007', className: 'bg-red-700' },
      { shade: '800', hex: '#9F0712', className: 'bg-red-800' },
      { shade: '900', hex: '#82181A', className: 'bg-red-900' },
    ],
  },
  {
    label: 'Neutro',
    icon: Circle,
    iconClass: 'text-gray-500 dark:text-gray-400',
    mainHex: '#4A5565',
    shades: [
      { shade: '50', hex: '#F9FAFB', className: 'bg-gray-50 border border-gray-200 dark:border-gray-700' },
      { shade: '100', hex: '#F3F4F6', className: 'bg-gray-100' },
      { shade: '200', hex: '#E5E7EB', className: 'bg-gray-200' },
      { shade: '300', hex: '#D1D5DC', className: 'bg-gray-300' },
      { shade: '600', hex: '#4A5565', className: 'bg-gray-600' },
      { shade: '700', hex: '#364153', className: 'bg-gray-700' },
      { shade: '800', hex: '#1E2939', className: 'bg-gray-800' },
      { shade: '900', hex: '#101828', className: 'bg-gray-900' },
    ],
  },
];

const neutralScale = [
  { shade: '50', hex: '#F9FAFB', className: 'bg-gray-50 border border-gray-200 dark:border-gray-700' },
  { shade: '100', hex: '#F3F4F6', className: 'bg-gray-100' },
  { shade: '200', hex: '#E5E7EB', className: 'bg-gray-200' },
  { shade: '300', hex: '#D1D5DC', className: 'bg-gray-300' },
  { shade: '400', hex: '#99A1AF', className: 'bg-gray-400' },
  { shade: '500', hex: '#6A7282', className: 'bg-gray-500' },
  { shade: '600', hex: '#4A5565', className: 'bg-gray-600' },
  { shade: '700', hex: '#364153', className: 'bg-gray-700' },
  { shade: '800', hex: '#1E2939', className: 'bg-gray-800' },
  { shade: '900', hex: '#101828', className: 'bg-gray-900' },
  { shade: '950', hex: '#030712', className: 'bg-gray-950' },
];

const brandColors = [
  { label: 'Azul', hex: '#155DFC', className: 'bg-blue-600' },
  { label: 'Ciano', hex: '#00B8DB', className: 'bg-cyan-500' },
  { label: 'Teal', hex: '#00BBA7', className: 'bg-teal-500' },
  { label: 'Verde', hex: '#00A63E', className: 'bg-green-600' },
  { label: 'Âmbar', hex: '#E17100', className: 'bg-amber-600' },
  { label: 'Laranja', hex: '#FF6900', className: 'bg-orange-500' },
  { label: 'Rosa', hex: '#F6339A', className: 'bg-pink-500' },
  { label: 'Índigo', hex: '#615FFF', className: 'bg-indigo-500' },
];

const gradients = [
  { label: 'Roxo', from: '#7F22FE', to: '#F6339A', className: 'from-violet-600 to-pink-500' },
  { label: 'Azul', from: '#155DFC', to: '#00B8DB', className: 'from-blue-600 to-cyan-500' },
  { label: 'Verde', from: '#00A63E', to: '#7BF1A8', className: 'from-green-600 to-green-300' },
];

const chartColors = [
  { hex: '#7C3AED' },
  { hex: '#A78BFA' },
  { hex: '#9CA3AF' },
  { hex: '#D1D5DB' },
  { hex: '#6B7280' },
  { hex: '#4B5563' },
];

const transparencyStops = [5, 10, 20, 30, 40, 50, 60, 90];

const approvedContrast = [
  { fg: 'Roxo 600', fgHex: '#7F22FE', bg: 'Neutro 50', bgHex: '#F9FAFB', ratio: '5.64:1' },
  { fg: 'Roxo 700', fgHex: '#7008E7', bg: 'Neutro 50', bgHex: '#F9FAFB', ratio: '6.98:1' },
  { fg: 'Neutro 900', fgHex: '#101828', bg: 'Neutro 50', bgHex: '#F9FAFB', ratio: '16.98:1' },
  { fg: 'Neutro 700', fgHex: '#364153', bg: 'Neutro 50', bgHex: '#F9FAFB', ratio: '9.86:1' },
  { fg: 'Sucesso 700', fgHex: '#008236', bg: 'Neutro 50', bgHex: '#F9FAFB', ratio: '4.73:1' },
];

const failedContrast = [
  { fg: 'Roxo 300', fgHex: '#C4B4FF', bg: 'Neutro 50', bgHex: '#F9FAFB', ratio: '1.78:1' },
  { fg: 'Neutro 300', fgHex: '#D1D5DC', bg: 'Neutro 50', bgHex: '#F9FAFB', ratio: '1.41:1' },
  { fg: 'Neutro 400', fgHex: '#99A1AF', bg: 'Neutro 50', bgHex: '#F9FAFB', ratio: '2.49:1' },
  { fg: 'Aviso 300', fgHex: '#FFD230', bg: 'Neutro 50', bgHex: '#F9FAFB', ratio: '1.38:1' },
];

const bestPractices = [
  {
    title: 'Use a escala',
    description: 'Utilize as escalas completas para manter consistência visual.',
    icon: Circle,
  },
  {
    title: 'Semântica primeiro',
    description: 'Prefira as cores semânticas para comunicar estados e significados.',
    icon: Info,
  },
  {
    title: 'Contraste',
    description: 'Sempre verifique o contraste para garantir acessibilidade.',
    icon: CheckCircle2,
  },
  {
    title: 'Consistência',
    description: 'Não invente novas cores. Use as tokens do sistema.',
    icon: XCircle,
  },
  {
    title: 'Modo escuro',
    description: 'Em modo escuro, as mesmas cores são ajustadas para manter legibilidade.',
    icon: AlertTriangle,
  },
];

function CardTitle({ children }: { children: string }) {
  return (
    <Typography as="h2" variant="h2" className="text-base">
      {children}
    </Typography>
  );
}

export function CoresPage() {
  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <CardTitle>Escala de Cores Primárias (Roxo)</CardTitle>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
            {primaryScale.map((s) => (
              <ColorSwatch key={s.shade} color={s.className} label={s.shade} hex={s.hex} />
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-violet-50 p-3 text-sm text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-600" />
            <p>A cor 600 (violet-600) é a cor principal padrão utilizada para ações primárias, links e elementos em destaque.</p>
          </div>
        </Card.Body>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <Card.Header>
            <CardTitle>Cores Semânticas</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-4">
            {semanticRows.map((row) => (
              <div key={row.label} className="flex items-center gap-3">
                <div className="flex w-28 shrink-0 items-center gap-1.5">
                  <row.icon className={`h-4 w-4 ${row.iconClass}`} strokeWidth={2} />
                  <span className="text-sm text-gray-700 dark:text-gray-200">{row.label}</span>
                </div>
                <div className="flex flex-1 gap-1.5">
                  {row.shades.map((s) => (
                    <div
                      key={s.shade}
                      className={`h-8 flex-1 rounded border border-black/5 dark:border-white/10 ${s.className}`}
                      title={`${row.label} ${s.shade} — ${s.hex}`}
                    />
                  ))}
                </div>
                <span className="w-20 shrink-0 text-right font-mono text-xs text-gray-400">{row.mainHex}</span>
              </div>
            ))}
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Cores Neutras (Cinza)</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-4 gap-2.5">
              {neutralScale.map((s) => (
                <ColorSwatch key={s.shade} color={s.className} label={s.shade} hex={s.hex} size="sm" />
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <CardTitle>Cores de Apoio (Brand / Complementares)</CardTitle>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
            {brandColors.map((c) => (
              <ColorSwatch key={c.label} color={c.className} label={c.label} hex={c.hex} shape="circle" size="sm" />
            ))}
          </div>
        </Card.Body>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <Card.Header>
            <CardTitle>Gradientes</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-4">
            {gradients.map((g) => (
              <div key={g.label}>
                <Typography variant="caption" className="normal-case">{g.label}</Typography>
                <div className={`mt-1 h-8 rounded-lg bg-gradient-to-r ${g.className}`} />
                <p className="mt-1 font-mono text-[11px] text-gray-400">
                  {g.from} → {g.to}
                </p>
              </div>
            ))}
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Cores para Gráficos</CardTitle>
          </Card.Header>
          <Card.Body>
            <Typography variant="caption" className="normal-case">
              Paleta categórica de <code>chartColors.categorical</code> (components/charts)
            </Typography>
            <div className="mt-2 flex flex-wrap gap-3">
              {chartColors.map((c, i) => (
                <div key={c.hex} className="text-center">
                  <div className="h-9 w-9 rounded-md" style={{ backgroundColor: c.hex }} />
                  <p className="mt-1 text-[10px] text-gray-400">{i + 1}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Transparências</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="flex flex-wrap gap-2">
              {transparencyStops.map((stop) => (
                <div key={stop} className="text-center">
                  <div
                    className="h-9 w-9 rounded-md bg-violet-600"
                    style={{
                      opacity: stop / 100,
                      backgroundImage:
                        'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                      backgroundSize: '8px 8px',
                      backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
                    }}
                  />
                  <p className="mt-1 text-[10px] text-gray-400">{stop}%</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <CardTitle>Acessibilidade</CardTitle>
        </Card.Header>
        <Card.Body className="space-y-4">
          <Typography>
            Combinações abaixo foram calculadas segundo a fórmula de contraste WCAG 2.1 (mínimo 4.5:1 para AA em texto normal) a
            partir dos hex reais de <code>gray-50</code> e das escalas semânticas/primária do projeto.
          </Typography>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Typography variant="caption">Exemplos de contraste</Typography>
              <div className="mt-2 space-y-2">
                {approvedContrast.map((c) => (
                  <div key={c.fg} className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-2 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-6 rounded" style={{ backgroundColor: c.fgHex }} />
                      <div>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-200">{c.fg}</p>
                        <p className="font-mono text-[10px] text-gray-400">{c.fgHex}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="success">AA</Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{c.ratio}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Typography variant="caption">Não recomendado</Typography>
              <div className="mt-2 space-y-2">
                {failedContrast.map((c) => (
                  <div key={c.fg} className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-2 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-6 rounded" style={{ backgroundColor: c.fgHex }} />
                      <div>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-200">{c.fg}</p>
                        <p className="font-mono text-[10px] text-gray-400">{c.fgHex}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="danger">Fail</Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{c.ratio}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

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
