import { useState, type ReactNode } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  ClipboardList,
  Inbox,
  Megaphone,
  MessageSquare,
  Moon,
  Settings2,
  Sun,
  Trash2,
  Users,
  Wallet,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AreaChartCard,
  BarChartCard,
  DonutChartCard,
  LineChartCard,
} from '../../components/charts';
import {
  Badge,
  type BadgeProps,
  Button,
  type ButtonProps,
  Card,
  DropdownMenu,
  EmptyState,
  Modal,
  Popover,
  Select,
  Skeleton,
  StatCard,
  Switch,
  Table,
  Tabs,
  Tooltip,
  Typography,
} from '../../components/ui';
import { useTheme } from '../../hooks/useTheme';
import { moduleColors, type ModuleKey } from '../../lib/module-colors';

function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <Typography as="h2" variant="h1" className="text-xl">
          {title}
        </Typography>
        {description && <Typography className="mt-1">{description}</Typography>}
      </div>
      {children}
    </section>
  );
}

const buttonVariantsDemo: NonNullable<ButtonProps['variant']>[] = ['primary', 'secondary', 'ghost', 'danger'];
const buttonSizesDemo: NonNullable<ButtonProps['size']>[] = ['sm', 'md', 'lg'];
const badgeVariantsDemo: NonNullable<BadgeProps['variant']>[] = ['success', 'warning', 'danger', 'info', 'neutral'];

const moduleIcons: Record<ModuleKey, ReactNode> = {
  cadastros: <Users className="h-5 w-5" />,
  financeiro: <Wallet className="h-5 w-5" />,
  comunicacao: <MessageSquare className="h-5 w-5" />,
  operacoes: <ClipboardList className="h-5 w-5" />,
  marketing: <Megaphone className="h-5 w-5" />,
  configuracoes: <Settings2 className="h-5 w-5" />,
};

const moduleStatValues: Record<ModuleKey, { value: string; deltaPercent: number }> = {
  cadastros: { value: '1.284', deltaPercent: 4.2 },
  financeiro: { value: 'R$ 82.430', deltaPercent: 8.1 },
  comunicacao: { value: '318', deltaPercent: -2.4 },
  operacoes: { value: '96%', deltaPercent: 1.1 },
  marketing: { value: '4.7k', deltaPercent: 12.6 },
  configuracoes: { value: '12', deltaPercent: 0 },
};

interface Invoice {
  id: string;
  client: string;
  status: 'pago' | 'pendente' | 'atrasado';
  amount: number;
}

const invoiceData: Invoice[] = [
  { id: 'FAT-001', client: 'Ipê Alimentos', status: 'pago', amount: 4520 },
  { id: 'FAT-002', client: 'Studio Vento', status: 'pendente', amount: 1280 },
  { id: 'FAT-003', client: 'Grão Norte', status: 'atrasado', amount: 990 },
  { id: 'FAT-004', client: 'Casa Lumen', status: 'pago', amount: 3175 },
  { id: 'FAT-005', client: 'Oficina Prisma', status: 'pendente', amount: 640 },
];

const invoiceStatusVariant: Record<Invoice['status'], NonNullable<BadgeProps['variant']>> = {
  pago: 'success',
  pendente: 'warning',
  atrasado: 'danger',
};

const invoiceColumns: ColumnDef<Invoice, any>[] = [
  { accessorKey: 'id', header: 'Fatura' },
  { accessorKey: 'client', header: 'Cliente' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge variant={invoiceStatusVariant[row.original.status]}>{row.original.status}</Badge>,
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row }) => row.original.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
];

const areaChartData = [
  { month: 'Jan', receita: 32, meta: 28 },
  { month: 'Fev', receita: 40, meta: 30 },
  { month: 'Mar', receita: 38, meta: 32 },
  { month: 'Abr', receita: 51, meta: 34 },
  { month: 'Mai', receita: 46, meta: 36 },
  { month: 'Jun', receita: 58, meta: 38 },
];

const lineChartData = [
  { day: 'Seg', ativos: 210, novos: 40 },
  { day: 'Ter', ativos: 230, novos: 52 },
  { day: 'Qua', ativos: 205, novos: 38 },
  { day: 'Qui', ativos: 260, novos: 61 },
  { day: 'Sex', ativos: 280, novos: 70 },
];

const barChartData = [
  { channel: 'Site', pedidos: 120 },
  { channel: 'App', pedidos: 98 },
  { channel: 'WhatsApp', pedidos: 64 },
  { channel: 'Loja', pedidos: 40 },
];

const donutChartData = [
  { name: 'Cadastros', value: 32 },
  { name: 'Financeiro', value: 28 },
  { name: 'Comunicação', value: 18 },
  { name: 'Operações', value: 14 },
  { name: 'Marketing', value: 8 },
];

export function DesignSystemPage() {
  const { theme, toggleTheme } = useTheme();
  const [switchChecked, setSwitchChecked] = useState(true);

  return (
    <Tooltip.Provider>
      <div className="mx-auto max-w-6xl space-y-14 px-6 py-10">
        <header className="flex items-center justify-between gap-4">
          <div>
            <Typography as="h1" variant="h1">
              Design System
            </Typography>
            <Typography className="mt-1">
              Inventário visual dos componentes de <code>components/ui</code> e <code>components/charts</code>. Rota
              temporária — ver <code>docs/01-design-system.md</code>.
            </Typography>
          </div>
          <Button variant="secondary" size="sm" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
          </Button>
        </header>

        <Section title="Tipografia">
          <Card className="space-y-3">
            <Typography variant="h1">H1 — Título de página</Typography>
            <Typography variant="h2">H2 — Título de card</Typography>
            <Typography variant="body">Corpo — texto padrão usado em parágrafos e descrições.</Typography>
            <Typography variant="caption">Label / caption</Typography>
            <Typography variant="kpi">R$ 82.430</Typography>
          </Card>
        </Section>

        <Section title="Cores por módulo">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {(Object.keys(moduleColors) as ModuleKey[]).map((key) => (
              <Card key={key} className="flex flex-col items-center gap-2 p-4 text-center">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full ${moduleColors[key].iconClassName}`}>
                  {moduleIcons[key]}
                </div>
                <Typography variant="body">{moduleColors[key].label}</Typography>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Button">
          <Card className="space-y-4">
            {buttonVariantsDemo.map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-3">
                <Typography variant="caption" className="w-20 shrink-0">
                  {variant}
                </Typography>
                {buttonSizesDemo.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    Botão {size}
                  </Button>
                ))}
              </div>
            ))}
          </Card>
        </Section>

        <Section title="Badge">
          <Card className="flex flex-wrap gap-3">
            {badgeVariantsDemo.map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
          </Card>
        </Section>

        <Section title="Card">
          <Card>
            <Card.Header>
              <Card.Title>Título do card</Card.Title>
              <Badge variant="info">Composição</Badge>
            </Card.Header>
            <Card.Body>
              <Typography variant="body">
                <code>Card</code>, <code>Card.Header</code>, <code>Card.Title</code> e <code>Card.Body</code> compõem
                qualquer superfície do produto.
              </Typography>
            </Card.Body>
          </Card>
        </Section>

        <Section title="StatCard">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(moduleColors) as ModuleKey[]).map((key) => (
              <StatCard
                key={key}
                icon={moduleIcons[key]}
                iconColorClass={moduleColors[key].iconClassName}
                label={moduleColors[key].label}
                value={moduleStatValues[key].value}
                deltaPercent={moduleStatValues[key].deltaPercent}
                deltaLabel="vs mês anterior"
              />
            ))}
          </div>
        </Section>

        <Section title="Table" description="Sorting, busca global e paginação via @tanstack/react-table.">
          <Table columns={invoiceColumns} data={invoiceData} pageSize={4} filterPlaceholder="Buscar fatura..." />
        </Section>

        <Section title="Modal / Dialog">
          <Card className="flex flex-wrap items-center gap-3">
            <Modal>
              <Modal.Trigger asChild>
                <Button>Abrir modal</Button>
              </Modal.Trigger>
              <Modal.Content>
                <Modal.Title>Confirmar ação</Modal.Title>
                <Modal.Description>Esta é uma janela de exemplo do Design System.</Modal.Description>
                <Modal.Footer>
                  <Modal.Close asChild>
                    <Button variant="secondary">Cancelar</Button>
                  </Modal.Close>
                  <Modal.Close asChild>
                    <Button>Confirmar</Button>
                  </Modal.Close>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Card>
        </Section>

        <Section title="DropdownMenu">
          <Card className="flex flex-wrap items-center gap-3">
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Button variant="secondary">Opções</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>Conta</DropdownMenu.Label>
                <DropdownMenu.Item>Perfil</DropdownMenu.Item>
                <DropdownMenu.Item>Preferências</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item className="text-red-600 dark:text-red-400">Sair</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </Card>
        </Section>

        <Section title="Tabs">
          <Card>
            <Tabs defaultValue="geral">
              <Tabs.List>
                <Tabs.Trigger value="geral">Geral</Tabs.Trigger>
                <Tabs.Trigger value="financeiro">Financeiro</Tabs.Trigger>
                <Tabs.Trigger value="avancado">Avançado</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="geral">
                <Typography variant="body">Conteúdo da aba Geral.</Typography>
              </Tabs.Content>
              <Tabs.Content value="financeiro">
                <Typography variant="body">Conteúdo da aba Financeiro.</Typography>
              </Tabs.Content>
              <Tabs.Content value="avancado">
                <Typography variant="body">Conteúdo da aba Avançado.</Typography>
              </Tabs.Content>
            </Tabs>
          </Card>
        </Section>

        <Section title="Tooltip, Select, Switch, Popover">
          <Card className="flex flex-wrap items-center gap-8">
            <Tooltip>
              <Tooltip.Trigger asChild>
                <Button variant="ghost" size="sm">
                  Passe o mouse
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>Texto de ajuda contextual</Tooltip.Content>
            </Tooltip>

            <Select defaultValue="financeiro">
              <Select.Trigger className="w-44">
                <Select.Value placeholder="Selecione um módulo" />
              </Select.Trigger>
              <Select.Content>
                {(Object.keys(moduleColors) as ModuleKey[]).map((key) => (
                  <Select.Item key={key} value={key}>
                    {moduleColors[key].label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>

            <div className="flex items-center gap-3">
              <Switch id="demo-switch" checked={switchChecked} onCheckedChange={setSwitchChecked} />
              <label htmlFor="demo-switch" className="text-sm text-gray-600 dark:text-gray-300">
                Notificações por email
              </label>
            </div>

            <Popover>
              <Popover.Trigger asChild>
                <Button variant="secondary" size="sm">
                  Abrir popover
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                <Typography variant="h2">Filtros rápidos</Typography>
                <Typography variant="body" className="mt-1">
                  Conteúdo livre dentro do popover.
                </Typography>
              </Popover.Content>
            </Popover>
          </Card>
        </Section>

        <Section title="EmptyState">
          <Card>
            <EmptyState
              icon={<Inbox className="h-6 w-6" />}
              title="Nenhum item por aqui"
              description="Quando houver dados, eles aparecerão nesta área."
              action={
                <Button size="sm">
                  <Trash2 className="h-4 w-4" />
                  Limpar filtros
                </Button>
              }
            />
          </Card>
        </Section>

        <Section title="Skeleton">
          <Card className="space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-24 w-full" />
          </Card>
        </Section>

        <Section title="Toast">
          <Card className="flex flex-wrap gap-3">
            <Button size="sm" onClick={() => toast.success('Registro salvo com sucesso.')}>
              Sucesso
            </Button>
            <Button size="sm" variant="danger" onClick={() => toast.error('Não foi possível concluir a ação.')}>
              Erro
            </Button>
            <Button size="sm" variant="secondary" onClick={() => toast.info('Nova atualização disponível.')}>
              Info
            </Button>
            <Button size="sm" variant="ghost" onClick={() => toast.warning('Verifique os dados antes de continuar.')}>
              Aviso
            </Button>
          </Card>
        </Section>

        <Section title="Gráficos" description="Wrappers de components/charts com dados de exemplo.">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AreaChartCard
              title="Receita vs. meta"
              data={areaChartData}
              xKey="month"
              series={[
                { key: 'receita', label: 'Receita' },
                { key: 'meta', label: 'Meta' },
              ]}
            />
            <LineChartCard
              title="Usuários ativos"
              data={lineChartData}
              xKey="day"
              series={[
                { key: 'ativos', label: 'Ativos' },
                { key: 'novos', label: 'Novos' },
              ]}
            />
            <BarChartCard
              title="Pedidos por canal"
              data={barChartData}
              xKey="channel"
              series={[{ key: 'pedidos', label: 'Pedidos' }]}
            />
            <DonutChartCard
              title="Distribuição por módulo"
              data={donutChartData}
              centerLabel="Total"
              centerValue={donutChartData.reduce((sum, item) => sum + item.value, 0)}
            />
          </div>
        </Section>
      </div>
    </Tooltip.Provider>
  );
}
