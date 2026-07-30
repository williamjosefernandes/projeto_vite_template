import {
  Bell,
  Calendar,
  CheckCircle2,
  Circle,
  Download,
  Eye,
  Filter,
  Home,
  Info,
  Lock,
  Mail,
  MoreVertical,
  Search,
  Settings,
  Shield,
  Upload,
  User,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  RadioGroup,
  Select,
  Typography,
} from '../../../components/ui';

const violetScale = [
  { label: '50', className: 'bg-violet-50 border border-gray-200 dark:border-gray-700' },
  { label: '100', className: 'bg-violet-100' },
  { label: '200', className: 'bg-violet-200' },
  { label: '300', className: 'bg-violet-300' },
  { label: '400', className: 'bg-violet-400' },
  { label: '500', className: 'bg-violet-500' },
  { label: '600', className: 'bg-violet-600' },
  { label: '700', className: 'bg-violet-700' },
  { label: '800', className: 'bg-violet-800' },
  { label: '900', className: 'bg-violet-900' },
];

const accentColors = [
  { label: 'Azul', className: 'bg-blue-500' },
  { label: 'Verde', className: 'bg-green-500' },
  { label: 'Ciano', className: 'bg-cyan-500' },
  { label: 'Amarelo', className: 'bg-amber-500' },
  { label: 'Laranja', className: 'bg-orange-500' },
  { label: 'Vermelho', className: 'bg-red-500' },
  { label: 'Roxo', className: 'bg-purple-500' },
  { label: 'Rosa', className: 'bg-pink-500' },
];

const neutralScale = [
  { label: '0', className: 'bg-white border border-gray-200 dark:border-gray-700' },
  { label: '100', className: 'bg-gray-100' },
  { label: '200', className: 'bg-gray-200' },
  { label: '300', className: 'bg-gray-300' },
  { label: '400', className: 'bg-gray-400' },
  { label: '500', className: 'bg-gray-500' },
  { label: '600', className: 'bg-gray-600' },
  { label: '700', className: 'bg-gray-700' },
  { label: '800', className: 'bg-gray-800' },
  { label: '900', className: 'bg-gray-900' },
];

const typeScale = [
  { name: 'H1', weight: 'Inter Bold', size: '32 / 40', className: 'text-[32px] font-bold leading-[40px]' },
  { name: 'H2', weight: 'Inter Bold', size: '24 / 32', className: 'text-2xl font-bold leading-8' },
  { name: 'H3', weight: 'Inter Semibold', size: '20 / 28', className: 'text-xl font-semibold leading-7' },
  { name: 'H4', weight: 'Inter Semibold', size: '18 / 24', className: 'text-lg font-semibold leading-6' },
  { name: 'Body 1', weight: 'Inter Regular', size: '16 / 24', className: 'text-base font-normal leading-6' },
  { name: 'Body 2', weight: 'Inter Regular', size: '14 / 20', className: 'text-sm font-normal leading-5' },
  { name: 'Caption', weight: 'Inter Regular', size: '12 / 16', className: 'text-xs font-normal leading-4' },
];

const exampleIcons: LucideIcon[] = [Home, Search, Bell, User, Settings, Calendar, Mail, Info];
const utilityIcons: LucideIcon[] = [
  Download,
  Upload,
  Filter,
  MoreVertical,
  Eye,
  Lock,
  Shield,
  Info,
];

const spacingScale = [
  { px: 4, mult: '0.5x' },
  { px: 8, mult: '1x' },
  { px: 12, mult: '1.5x' },
  { px: 24, mult: '3x' },
  { px: 32, mult: '4x' },
  { px: 40, mult: '5x' },
  { px: 48, mult: '6x' },
  { px: 64, mult: '8x' },
];

const radiusScale = [
  { label: 'Sem raio', value: '0', className: 'rounded-none' },
  { label: 'Extra pequeno', value: '4px', className: 'rounded' },
  { label: 'Pequeno', value: '8px', className: 'rounded-lg' },
  { label: 'Médio', value: '12px', className: 'rounded-xl' },
  { label: 'Grande', value: '16px', className: 'rounded-2xl' },
  { label: 'Extra grande', value: '24px', className: 'rounded-[24px]' },
  { label: 'Circular', value: 'Pill', className: 'rounded-full' },
];

const shadowScale = [
  { label: 'xs', value: '0 1px 2px rgba(0,0,0,0.05)', className: 'shadow-xs' },
  { label: 'sm', value: '0 2px 4px rgba(0,0,0,0.06)', className: 'shadow-sm' },
  { label: 'md', value: '0 4px 8px rgba(0,0,0,0.08)', className: 'shadow-md' },
  { label: 'lg', value: '0 8px 16px rgba(0,0,0,0.10)', className: 'shadow-lg' },
  { label: 'xl', value: '0 12px 24px rgba(0,0,0,0.12)', className: 'shadow-xl' },
];

const stateItems = [
  { label: 'Sucesso', icon: CheckCircle2, className: 'text-green-600 dark:text-green-400' },
  { label: 'Informativo', icon: Info, className: 'text-blue-600 dark:text-blue-400' },
  { label: 'Aviso', icon: Info, className: 'text-amber-600 dark:text-amber-400' },
  { label: 'Erro', icon: XCircle, className: 'text-red-600 dark:text-red-400' },
];

const principles = [
  { title: 'Consistência', description: 'Padrões uniformes em toda a aplicação.', icon: CheckCircle2 },
  { title: 'Clareza', description: 'Interface simples e fácil de entender.', icon: Info },
  { title: 'Acessibilidade', description: 'Experiência inclusiva para todos.', icon: Shield },
  { title: 'Feedback', description: 'Comunicação clara em cada interação.', icon: Bell },
  { title: 'Escalabilidade', description: 'Componentes flexíveis e reutilizáveis.', icon: Circle },
];

function CardTitle({ children }: { children: string }) {
  return (
    <Typography as="h2" variant="h2" className="text-base">
      {children}
    </Typography>
  );
}

export function VisaoGeralPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <Card.Header>
            <CardTitle>Cores</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-5">
            <div>
              <Typography variant="caption">Primárias</Typography>
              <div className="mt-2 flex gap-1.5">
                {violetScale.map((swatch) => (
                  <div key={swatch.label} className="flex-1 text-center">
                    <div className={`h-10 w-full rounded-md ${swatch.className}`} />
                    <p className="mt-1 text-[10px] text-gray-400">{swatch.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Typography variant="caption">Acentos</Typography>
              <div className="mt-2 grid grid-cols-4 gap-3">
                {accentColors.map((swatch) => (
                  <div key={swatch.label} className="text-center">
                    <div className={`mx-auto h-9 w-9 rounded-full ${swatch.className}`} />
                    <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">{swatch.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Typography variant="caption">Neutras</Typography>
              <div className="mt-2 flex gap-1.5">
                {neutralScale.map((swatch) => (
                  <div key={swatch.label} className="flex-1 text-center">
                    <div className={`h-10 w-full rounded-md ${swatch.className}`} />
                    <p className="mt-1 text-[10px] text-gray-400">{swatch.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Tipografia</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">Aa</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Inter</span>
            </div>
            <div>
              <Typography variant="caption">Exemplo de hierarquia</Typography>
              <div className="mt-2 space-y-2">
                {typeScale.map((t) => (
                  <div key={t.name} className="flex items-center justify-between gap-2">
                    <span className="w-14 shrink-0 text-xs text-gray-400">{t.name}</span>
                    <span className={`flex-1 truncate text-gray-900 dark:text-gray-100 ${t.className}`}>
                      {t.weight}
                    </span>
                    <span className="shrink-0 text-xs text-gray-400">{t.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Ícones</CardTitle>
          </Card.Header>
          <Card.Body>
            <Typography variant="caption">Estilo: Outline • Peso: 2px • Raio: 2px</Typography>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[...exampleIcons, ...utilityIcons].map((Icon, i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 dark:border-gray-800 dark:text-gray-300"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <Card.Header>
            <CardTitle>Espaçamento</CardTitle>
          </Card.Header>
          <Card.Body>
            <Typography variant="caption">Base: 8px (8pt grid system)</Typography>
            <div className="mt-3 flex items-end gap-3">
              {spacingScale.map((s) => (
                <div key={s.px} className="flex flex-col items-center gap-1">
                  <div className="flex h-16 items-end">
                    <div
                      className="rounded bg-violet-400 dark:bg-violet-600"
                      style={{ width: Math.max(s.px, 4), height: Math.max(s.px, 4) }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400">
                    {s.px} ({s.mult})
                  </p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Raios de Borda</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-4 gap-3">
              {radiusScale.map((r) => (
                <div key={r.label} className="text-center">
                  <div className={`mx-auto h-12 w-12 border-2 border-violet-400 dark:border-violet-600 ${r.className}`} />
                  <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">{r.value}</p>
                  <p className="text-[10px] text-gray-400">{r.label}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Sombras</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-5 gap-3">
              {shadowScale.map((s) => (
                <div key={s.label} className="text-center">
                  <div className={`mx-auto h-12 w-12 rounded-lg bg-white dark:bg-gray-800 ${s.className}`} />
                  <p className="mt-1 text-[10px] font-medium text-gray-500 dark:text-gray-400">{s.label}</p>
                  <p className="text-[9px] leading-tight text-gray-400">{s.value}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <CardTitle>Estados</CardTitle>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
            {stateItems.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 text-center">
                <s.icon className={`h-6 w-6 ${s.className}`} />
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="h-3 w-3 rounded-full bg-violet-600" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Ativo</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Circle className="h-6 w-6 text-gray-400" strokeWidth={2} />
              <p className="text-xs text-gray-500 dark:text-gray-400">Inativo</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Circle className="h-6 w-6 text-gray-300 dark:text-gray-700" strokeWidth={2} />
              <p className="text-xs text-gray-500 dark:text-gray-400">Desabilitado</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600 dark:border-violet-900" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Carregando</p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <div>
        <Typography as="h2" variant="h2" className="mb-3 text-base">
          Componentes em Destaque
        </Typography>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <Card>
            <Card.Header>
              <CardTitle>Botões</CardTitle>
            </Card.Header>
            <Card.Body className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Typography variant="caption" className="normal-case">Primário</Typography>
                <Button size="sm">Salvar</Button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Typography variant="caption" className="normal-case">Secundário</Typography>
                <Button size="sm" variant="secondary">Cancelar</Button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Typography variant="caption" className="normal-case">Terciário</Typography>
                <Button size="sm" variant="ghost">Saiba mais</Button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Typography variant="caption" className="normal-case">Desabilitado</Typography>
                <Button size="sm" disabled>Salvar</Button>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <CardTitle>Inputs</CardTitle>
            </Card.Header>
            <Card.Body className="space-y-3">
              <div>
                <Typography variant="caption" className="normal-case">Default</Typography>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  placeholder="Digite algo..."
                  readOnly
                />
              </div>
              <div>
                <Typography variant="caption" className="normal-case">Focado</Typography>
                <input
                  className="mt-1 w-full rounded-lg border border-violet-500 bg-white px-3 py-2 text-sm text-gray-700 ring-2 ring-violet-500 dark:bg-gray-900 dark:text-gray-200"
                  placeholder="Digite algo..."
                  readOnly
                />
              </div>
              <div>
                <Typography variant="caption" className="normal-case">Preenchido</Typography>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  defaultValue="Exemplo de texto"
                  readOnly
                />
              </div>
              <div>
                <Typography variant="caption" className="normal-case">Desabilitado</Typography>
                <input
                  className="mt-1 w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-400 dark:border-gray-800 dark:bg-gray-800/60"
                  placeholder="Digite algo..."
                  disabled
                />
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <CardTitle>Select</CardTitle>
            </Card.Header>
            <Card.Body className="space-y-3">
              <div>
                <Typography variant="caption" className="normal-case">Default</Typography>
                <Select>
                  <Select.Trigger className="mt-1 w-full">
                    <Select.Value placeholder="Selecione uma opção" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="1">Opção 1</Select.Item>
                    <Select.Item value="2">Opção 2</Select.Item>
                    <Select.Item value="3">Opção 3</Select.Item>
                  </Select.Content>
                </Select>
              </div>
              <div>
                <Typography variant="caption" className="normal-case">Aberto</Typography>
                <div className="mt-1 rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-gray-900">
                  <p className="rounded-md px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200">Opção 1</p>
                  <p className="rounded-md bg-violet-50 px-2 py-1.5 text-sm text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                    Opção 2
                  </p>
                  <p className="rounded-md px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200">Opção 3</p>
                </div>
              </div>
              <div>
                <Typography variant="caption" className="normal-case">Selecionado</Typography>
                <Select defaultValue="2">
                  <Select.Trigger className="mt-1 w-full">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="1">Opção 1</Select.Item>
                    <Select.Item value="2">Opção 2</Select.Item>
                    <Select.Item value="3">Opção 3</Select.Item>
                  </Select.Content>
                </Select>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <CardTitle>Checkbox & Radio</CardTitle>
            </Card.Header>
            <Card.Body className="space-y-4">
              <div>
                <Typography variant="caption" className="normal-case">Checkbox</Typography>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <Checkbox /> Não selecionado
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <Checkbox checked /> Selecionado
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <Checkbox checked="indeterminate" /> Indeterminado
                  </label>
                </div>
              </div>
              <div>
                <Typography variant="caption" className="normal-case">Radio</Typography>
                <RadioGroup defaultValue="selected" className="mt-2 space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <RadioGroup.Item value="unselected" /> Não selecionado
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <RadioGroup.Item value="selected" /> Selecionado
                  </label>
                </RadioGroup>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <CardTitle>Tags (Badges)</CardTitle>
            </Card.Header>
            <Card.Body className="flex flex-wrap gap-2">
              <Badge variant="neutral">Padrão</Badge>
              <Badge variant="success">Sucesso</Badge>
              <Badge variant="info">Informativo</Badge>
              <Badge variant="warning">Aviso</Badge>
              <Badge variant="danger">Erro</Badge>
              <Badge variant="info">Em andamento</Badge>
              <Badge variant="neutral">Novo</Badge>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <CardTitle>Alertas</CardTitle>
            </Card.Header>
            <Card.Body className="space-y-2">
              <Alert variant="success" title="Sucesso" description="A operação foi realizada com sucesso." onClose={() => {}} />
              <Alert variant="info" title="Informação" description="Este é um alerta informativo." onClose={() => {}} />
              <Alert variant="warning" title="Aviso" description="Atenção! Verifique os dados informados." onClose={() => {}} />
              <Alert variant="danger" title="Erro" description="Ocorreu um erro ao processar a solicitação." onClose={() => {}} />
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {principles.map((p) => (
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
  );
}
