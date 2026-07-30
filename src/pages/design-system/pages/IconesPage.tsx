import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Bookmark,
  Bookmark as BookmarkTag,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  CircleHelp,
  Clock,
  Copy,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  Filter,
  Folder,
  Globe,
  Heart,
  Home,
  Image,
  Info,
  Layout,
  Link2,
  List,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  MoreHorizontal,
  MoreVertical,
  Pause,
  Phone,
  Play,
  Plus,
  Printer,
  RefreshCw,
  Search,
  Settings,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Square,
  Star,
  Trash2,
  TriangleAlert,
  Type,
  Unlock,
  Upload,
  User,
  Users,
  Video,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Card, IconTile, Input, Select, Typography } from '../../../components/ui';

const iconStyles = [
  { label: 'Outline', icon: Home, description: 'Uso geral para a maioria dos casos.', active: true },
  { label: 'Solid', icon: Home, description: 'Para ênfase e elementos ativos.', active: false },
  { label: 'Duotone', icon: Home, description: 'Para elementos secundários.', active: false },
  { label: 'Linear', icon: Home, description: 'Para interfaces mais leves.', active: false },
  { label: 'Rounded', icon: Home, description: 'Para uma aparência mais amigável.', active: false },
];

const guidelines = [
  'Use ícones para reforçar o significado, não apenas decorar.',
  'Mantenha consistência no estilo dentro da mesma interface.',
  'Prefira ícones outline para ações e estados neutros.',
  'Use ícones solid para ações primárias e itens ativos.',
  'Evite misturar estilos diferentes no mesmo contexto.',
];

interface IconEntry {
  name: string;
  icon: LucideIcon;
  category: string;
}

const iconLibrary: IconEntry[] = [
  { name: 'home', icon: Home, category: 'Interface' },
  { name: 'search', icon: Search, category: 'Interface' },
  { name: 'user', icon: User, category: 'Usuários' },
  { name: 'users', icon: Users, category: 'Usuários' },
  { name: 'settings', icon: Settings, category: 'Interface' },
  { name: 'bell', icon: Bell, category: 'Comunicação' },
  { name: 'mail', icon: Mail, category: 'Comunicação' },
  { name: 'calendar', icon: Clock, category: 'Interface' },
  { name: 'clock', icon: Clock, category: 'Interface' },
  { name: 'bookmark', icon: Bookmark, category: 'Ações' },
  { name: 'star', icon: Star, category: 'Ações' },
  { name: 'heart', icon: Heart, category: 'Ações' },
  { name: 'plus', icon: Plus, category: 'Ações' },
  { name: 'edit', icon: Edit3, category: 'Editor' },
  { name: 'trash', icon: Trash2, category: 'Ações' },
  { name: 'check', icon: Check, category: 'Ações' },
  { name: 'close', icon: X, category: 'Ações' },
  { name: 'info', icon: Info, category: 'Interface' },
  { name: 'alert-circle', icon: CircleAlert, category: 'Interface' },
  { name: 'warning-triangle', icon: TriangleAlert, category: 'Interface' },
  { name: 'question-circle', icon: CircleHelp, category: 'Interface' },
  { name: 'eye', icon: Eye, category: 'Ações' },
  { name: 'eye-off', icon: EyeOff, category: 'Ações' },
  { name: 'lock', icon: Lock, category: 'Ações' },
  { name: 'unlock', icon: Unlock, category: 'Ações' },
  { name: 'folder', icon: Folder, category: 'Arquivos' },
  { name: 'document', icon: File, category: 'Arquivos' },
  { name: 'file', icon: File, category: 'Arquivos' },
  { name: 'download', icon: Download, category: 'Arquivos' },
  { name: 'upload', icon: Upload, category: 'Arquivos' },
  { name: 'share', icon: Share2, category: 'Ações' },
  { name: 'filter', icon: Filter, category: 'Ações' },
  { name: 'more-horizontal', icon: MoreHorizontal, category: 'Interface' },
  { name: 'more-vertical', icon: MoreVertical, category: 'Interface' },
  { name: 'chevron-left', icon: ChevronLeft, category: 'Navegação' },
  { name: 'chevron-right', icon: ChevronRight, category: 'Navegação' },
  { name: 'chevron-up', icon: ChevronUp, category: 'Navegação' },
  { name: 'chevron-down', icon: ChevronDown, category: 'Navegação' },
  { name: 'arrow-left', icon: ArrowLeft, category: 'Navegação' },
  { name: 'arrow-right', icon: ArrowRight, category: 'Navegação' },
  { name: 'arrow-up', icon: ArrowUp, category: 'Navegação' },
  { name: 'arrow-down', icon: ArrowDown, category: 'Navegação' },
  { name: 'copy', icon: Copy, category: 'Editor' },
  { name: 'link', icon: Link2, category: 'Editor' },
  { name: 'external-link', icon: ExternalLink, category: 'Navegação' },
  { name: 'refresh', icon: RefreshCw, category: 'Ações' },
  { name: 'play', icon: Play, category: 'Mídia' },
  { name: 'pause', icon: Pause, category: 'Mídia' },
  { name: 'stop', icon: Square, category: 'Mídia' },
  { name: 'phone', icon: Phone, category: 'Dispositivos' },
  { name: 'message-circle', icon: MessageCircle, category: 'Comunicação' },
  { name: 'video', icon: Video, category: 'Mídia' },
  { name: 'image', icon: Image, category: 'Mídia' },
  { name: 'camera', icon: Camera, category: 'Mídia' },
  { name: 'printer', icon: Printer, category: 'Dispositivos' },
  { name: 'globe', icon: Globe, category: 'Interface' },
  { name: 'map-pin', icon: MapPin, category: 'Interface' },
  { name: 'shopping-cart', icon: ShoppingCart, category: 'E-commerce' },
  { name: 'bag', icon: ShoppingBag, category: 'E-commerce' },
  { name: 'tag', icon: BookmarkTag, category: 'E-commerce' },
];

const categories = [
  { label: 'Interface', icon: Layout },
  { label: 'Navegação', icon: List },
  { label: 'Ações', icon: Sparkles },
  { label: 'Comunicação', icon: MessageCircle },
  { label: 'Arquivos', icon: Folder },
  { label: 'E-commerce', icon: ShoppingCart },
  { label: 'Usuários', icon: Users },
  { label: 'Editor', icon: Type },
  { label: 'Mídia', icon: Image },
  { label: 'Dispositivos', icon: MonitorSmartphone },
].map((c) => ({ ...c, count: iconLibrary.filter((i) => i.category === c.label).length }));

const sizes = [
  { label: 'xs', px: '12 × 12', boxClass: 'h-3 w-3' },
  { label: 'sm', px: '16 × 16', boxClass: 'h-4 w-4' },
  { label: 'md', px: '20 × 20', boxClass: 'h-5 w-5' },
  { label: 'lg', px: '24 × 24', boxClass: 'h-6 w-6' },
  { label: 'xl', px: '32 × 32', boxClass: 'h-8 w-8' },
  { label: '2xl', px: '48 × 48', boxClass: 'h-12 w-12' },
];

const strokeWidths = [
  { label: '1px', value: 1 },
  { label: '1.5px', value: 1.5, active: true },
  { label: '2px', value: 2 },
];

const states = [
  { label: 'Default', className: 'text-gray-600 dark:text-gray-300' },
  { label: 'Hover', className: 'text-gray-900 dark:text-gray-100' },
  { label: 'Active', className: 'text-violet-600 bg-violet-50 dark:bg-violet-900/30 dark:text-violet-400 rounded-full' },
  { label: 'Disabled', className: 'text-gray-300 dark:text-gray-700' },
];

const bestPractices = [
  'Utilize no máximo um ícone por ação.',
  'Combine com texto para melhor entendimento.',
  'Teste a legibilidade em diferentes tamanhos.',
  'Considere acessibilidade e contraste.',
  'Não altere o design original dos ícones.',
  'Prefira o conjunto lucide-react já instalado a importar outra biblioteca.',
];

function CardTitle({ children }: { children: string }) {
  return (
    <Typography as="h2" variant="h2" className="text-base">
      {children}
    </Typography>
  );
}

export function IconesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    return iconLibrary.filter((entry) => {
      const matchesQuery = entry.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesCategory = category === 'all' || entry.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <Card.Header>
            <CardTitle>Estilos de Ícones</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {iconStyles.map((s) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center ${
                    s.active
                      ? 'border-violet-500 ring-1 ring-violet-500'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <s.icon
                    className={`h-7 w-7 ${s.active ? 'text-violet-600 dark:text-violet-400' : 'text-gray-500 dark:text-gray-400'}`}
                    strokeWidth={1.5}
                  />
                  <p className={`text-sm font-semibold ${s.active ? 'text-violet-700 dark:text-violet-400' : 'text-gray-700 dark:text-gray-200'}`}>
                    {s.label}
                  </p>
                  <p className="text-[11px] text-gray-400">{s.description}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Diretrizes</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-2">
            {guidelines.map((g) => (
              <div key={g} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                <span>{g}</span>
              </div>
            ))}
            <a href="#" className="mt-2 inline-block text-sm font-medium text-violet-700 hover:underline dark:text-violet-400">
              Ver guia completo de ícones →
            </a>
          </Card.Body>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <Card>
          <Card.Header>
            <CardTitle>Biblioteca de Ícones (Exemplos)</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar ícone..."
                  className="pl-9"
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <Select.Trigger className="w-full sm:w-48">
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="all">Todas as categorias</Select.Item>
                  {categories.map((c) => (
                    <Select.Item key={c.label} value={c.label}>
                      {c.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-400">Nenhum ícone encontrado para "{query}".</p>
            ) : (
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
                {filtered.map((entry) => (
                  <IconTile key={entry.name} icon={entry.icon} label={entry.name} />
                ))}
              </div>
            )}
          </Card.Body>
        </Card>

        <div className="space-y-6">
          <Card>
            <Card.Header>
              <CardTitle>Tamanhos</CardTitle>
            </Card.Header>
            <Card.Body>
              <Typography variant="caption" className="normal-case">
                Todos os ícones são baseados em uma grade de 24px.
              </Typography>
              <div className="mt-3 space-y-2">
                {sizes.map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-2">
                    <span className="w-8 text-xs font-medium text-gray-600 dark:text-gray-300">{s.label}</span>
                    <span className="flex-1 text-xs text-gray-400">{s.px}</span>
                    <Home className={`shrink-0 text-gray-500 dark:text-gray-400 ${s.boxClass}`} strokeWidth={1.5} />
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <CardTitle>Espessura do Traço</CardTitle>
            </Card.Header>
            <Card.Body>
              <Typography variant="caption" className="normal-case">
                O peso do traço é consistente em todos os ícones outline.
              </Typography>
              <div className="mt-3 space-y-2">
                {strokeWidths.map((s) => (
                  <div
                    key={s.label}
                    className={`flex items-center justify-between gap-2 rounded-lg p-1.5 ${s.active ? 'ring-1 ring-violet-500' : ''}`}
                  >
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{s.label}</span>
                    <div className="flex gap-2">
                      <Home className="h-5 w-5 text-gray-500 dark:text-gray-400" strokeWidth={s.value} />
                      <Home className="h-5 w-5 text-gray-500 dark:text-gray-400" strokeWidth={s.value} />
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr_320px]">
        <Card>
          <Card.Header>
            <CardTitle>Categorias</CardTitle>
          </Card.Header>
          <Card.Body>
            <Typography variant="caption" className="normal-case">
              Organização dos ícones por contexto de uso.
            </Typography>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {categories.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setCategory(c.label)}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 p-2.5 text-left transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/60"
                >
                  <c.icon className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-gray-700 dark:text-gray-200">{c.label}</p>
                    <p className="text-[10px] text-gray-400">{c.count} ícones</p>
                  </div>
                </button>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Estados</CardTitle>
          </Card.Header>
          <Card.Body>
            <Typography variant="caption" className="normal-case">
              Variações para diferentes estados de interface.
            </Typography>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {states.map((s) => (
                <div key={s.label} className="text-center">
                  <div className={`mx-auto flex h-11 w-11 items-center justify-center ${s.className}`}>
                    <Home className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <p className="mt-1 text-[10px] text-gray-400">{s.label}</p>
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
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                <span>{p}</span>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-violet-50 p-3 text-sm text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>Ícones desenvolvidos com base na grade de 24px e alinhados aos princípios de clareza, consistência e acessibilidade.</p>
      </div>
    </div>
  );
}
