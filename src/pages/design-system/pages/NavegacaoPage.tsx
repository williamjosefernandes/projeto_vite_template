import { useState } from 'react';
import {
  ArrowUp,
  Bell,
  Boxes,
  Calendar,
  ChevronRight,
  Copy,
  Edit3,
  Home,
  LayoutDashboard,
  Menu,
  MoreVertical,
  Package,
  Pencil,
  Plus,
  Search,
  Settings,
  Share2,
  ShoppingCart,
  Trash2,
  Users,
} from 'lucide-react';
import {
  Accordion,
  Badge,
  BottomNavigation,
  Breadcrumb,
  Button,
  Card,
  CommandMenu,
  DropdownMenu,
  NavigationRail,
  Pagination,
  Steps,
  Tabs,
  Toolbar,
  TreeView,
  Typography,
} from '../../../components/ui';
import { cn } from '../../../lib/utils';

function CardTitle({ children }: { children: string }) {
  return (
    <Typography as="h2" variant="h2" className="text-base">
      {children}
    </Typography>
  );
}

const verticalNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Users, label: 'Usuários' },
  { icon: ShoppingCart, label: 'Pedidos' },
  { icon: Boxes, label: 'Produtos' },
  { icon: Settings, label: 'Configurações' },
];

const treeData = [
  {
    id: 'org',
    label: 'Organização',
    children: [
      {
        id: 'marketing',
        label: 'Marketing',
        children: [
          { id: 'campanhas', label: 'Campanhas' },
          { id: 'materiais', label: 'Materiais' },
        ],
      },
      {
        id: 'vendas',
        label: 'Vendas',
        children: [
          { id: 'leads', label: 'Leads' },
          { id: 'negociacoes', label: 'Negociações' },
        ],
      },
    ],
  },
];

const commandItems = [
  { id: 'novo', label: 'Criar novo registro', icon: Plus, section: 'Ações', onSelect: () => {} },
  { id: 'buscar', label: 'Buscar em tudo', icon: Search, section: 'Ações', onSelect: () => {} },
  { id: 'dashboard', label: 'Ir para Dashboard', icon: LayoutDashboard, section: 'Navegar', onSelect: () => {} },
  { id: 'usuarios', label: 'Ir para Usuários', icon: Users, section: 'Navegar', onSelect: () => {} },
];

export function NavegacaoPage() {
  const [verticalActive] = useState(1);
  const [horizontalActive] = useState(2);
  const [railActive, setRailActive] = useState('dashboard');
  const [bottomActive, setBottomActive] = useState('home');
  const [page, setPage] = useState(4);
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Card.Header>
            <CardTitle>Button</CardTitle>
          </Card.Header>
          <Card.Body className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Button size="sm">Primário</Button>
            <Button size="sm" variant="secondary">Secundário</Button>
            <Button size="sm" variant="ghost">Contorno</Button>
            <Button size="sm" variant="danger">Perigo</Button>
            <Button size="sm" disabled>Primário</Button>
            <Button size="sm" variant="secondary" disabled>Secundário</Button>
            <Button size="sm" variant="ghost" disabled>Contorno</Button>
            <Button size="sm" variant="danger" disabled>Perigo</Button>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Icon Button</CardTitle>
          </Card.Header>
          <Card.Body className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            <Button size="sm" className="w-9 px-0"><Plus className="h-4 w-4" /></Button>
            <Button size="sm" variant="secondary" className="w-9 px-0"><Edit3 className="h-4 w-4" /></Button>
            <Button size="sm" variant="ghost" className="w-9 px-0"><Share2 className="h-4 w-4" /></Button>
            <Button size="sm" variant="danger" className="w-9 px-0"><Trash2 className="h-4 w-4" /></Button>
            <Button size="sm" disabled className="w-9 px-0"><Plus className="h-4 w-4" /></Button>
            <Button size="sm" variant="secondary" disabled className="w-9 px-0"><Edit3 className="h-4 w-4" /></Button>
            <Button size="sm" variant="ghost" disabled className="w-9 px-0"><Share2 className="h-4 w-4" /></Button>
            <Button size="sm" variant="danger" disabled className="w-9 px-0"><Trash2 className="h-4 w-4" /></Button>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Link</CardTitle>
          </Card.Header>
          <Card.Body className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-violet-600 dark:text-violet-400">Padrão</a>
            <a href="#" className="text-violet-800 underline dark:text-violet-300">Hover</a>
            <a href="#" className="font-semibold text-violet-700 dark:text-violet-400">Ativo</a>
            <a href="#" className="text-purple-800 dark:text-purple-400">Visitado</a>
            <a href="#" className="pointer-events-none text-gray-300 dark:text-gray-700">Desabilitado</a>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Breadcrumb</CardTitle>
          </Card.Header>
          <Card.Body>
            <Breadcrumb
              items={[
                { label: 'Dashboard', icon: <Home className="h-3.5 w-3.5" /> },
                { label: 'Produtos' },
                { label: 'Detalhes' },
              ]}
            />
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Navigation Menu (Vertical)</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-1">
            {verticalNavItems.map((item, i) => (
              <div
                key={item.label}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium',
                  i === verticalActive
                    ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                    : 'text-gray-600 dark:text-gray-300',
                )}
              >
                <item.icon className="h-4 w-4" strokeWidth={1.5} />
                {item.label}
              </div>
            ))}
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Navigation Menu (Horizontal)</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="flex gap-6 border-b border-gray-200 dark:border-gray-800">
              {verticalNavItems.map((item, i) => (
                <div
                  key={item.label}
                  className={cn(
                    'flex items-center gap-2 border-b-2 pb-2 text-sm font-medium',
                    i === horizontalActive
                      ? 'border-violet-600 text-violet-700 dark:text-violet-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400',
                  )}
                >
                  <item.icon className="h-4 w-4" strokeWidth={1.5} />
                  {item.label}
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Tabs</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="flex gap-6 border-b border-gray-200 dark:border-gray-800">
              {['Geral', 'Financeiro', 'Membros', 'Avançado'].map((tab, i) => (
                <div
                  key={tab}
                  className={cn(
                    'border-b-2 pb-2 text-sm font-medium',
                    i === 0 ? 'border-violet-600 text-violet-700 dark:text-violet-400' : 'border-transparent text-gray-500 dark:text-gray-400',
                  )}
                >
                  {tab}
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Pills Tabs</CardTitle>
          </Card.Header>
          <Card.Body>
            <Tabs defaultValue="geral">
              <Tabs.List>
                <Tabs.Trigger value="geral">Geral</Tabs.Trigger>
                <Tabs.Trigger value="financeiro">Financeiro</Tabs.Trigger>
                <Tabs.Trigger value="membros">Membros</Tabs.Trigger>
                <Tabs.Trigger value="avancado">Avançado</Tabs.Trigger>
              </Tabs.List>
            </Tabs>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Dropdown Menu</CardTitle>
          </Card.Header>
          <Card.Body>
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Button variant="secondary" size="sm">Ações</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item><Pencil className="mr-2 h-4 w-4" />Editar</DropdownMenu.Item>
                <DropdownMenu.Item><Copy className="mr-2 h-4 w-4" />Duplicar</DropdownMenu.Item>
                <DropdownMenu.Item><Share2 className="mr-2 h-4 w-4" />Compartilhar</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item className="text-red-600 dark:text-red-400"><Trash2 className="mr-2 h-4 w-4" />Excluir</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </Card.Body>
        </Card>

        <Card className="lg:col-span-2">
          <Card.Header>
            <CardTitle>Mega Menu</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-3 gap-6 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              {[
                { title: 'Gerenciar', items: ['Usuários', 'Permissões', 'Equipes'] },
                { title: 'Cadastros', items: ['Clientes', 'Produtos', 'Fornecedores'] },
                { title: 'Promoções', items: ['Cupons', 'Campanhas', 'Descontos'] },
              ].map((col) => (
                <div key={col.title}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{col.title}</p>
                  <div className="space-y-1.5">
                    {col.items.map((item) => (
                      <p key={item} className="text-sm text-gray-600 dark:text-gray-300">{item}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Context Menu</CardTitle>
          </Card.Header>
          <Card.Body>
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <button className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-gray-300 text-sm text-gray-400 dark:border-gray-700">
                  Clique direito (simulado) — clique aqui
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>Visualizar</DropdownMenu.Item>
                <DropdownMenu.Item>Editar</DropdownMenu.Item>
                <DropdownMenu.Item>Mover</DropdownMenu.Item>
                <DropdownMenu.Item>Duplicar</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item className="text-red-600 dark:text-red-400">Excluir</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Command Menu (⌘K)</CardTitle>
          </Card.Header>
          <Card.Body>
            <Button variant="secondary" size="sm" onClick={() => setCommandOpen(true)}>
              <Search className="h-4 w-4" />
              Abrir Command Menu
              <kbd className="ml-2 rounded border border-gray-300 px-1 text-[10px] dark:border-gray-700">⌘K</kbd>
            </Button>
            <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} items={commandItems} />
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Accordion</CardTitle>
          </Card.Header>
          <Card.Body>
            <Accordion type="single" defaultValue="item-2" collapsible>
              <Accordion.Item value="item-1">
                <Accordion.Trigger>O que é o Design System?</Accordion.Trigger>
                <Accordion.Content>Um conjunto de padrões e componentes reutilizáveis.</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item-2">
                <Accordion.Trigger>Como usar os componentes?</Accordion.Trigger>
                <Accordion.Content>Importe de <code>components/ui</code> e siga os exemplos desta documentação.</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item-3">
                <Accordion.Trigger>Onde reportar problemas?</Accordion.Trigger>
                <Accordion.Content>Abra uma issue no repositório do projeto.</Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Tree View</CardTitle>
          </Card.Header>
          <Card.Body>
            <TreeView nodes={treeData} defaultExpandedIds={['org', 'marketing']} />
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Pagination</CardTitle>
          </Card.Header>
          <Card.Body>
            <Pagination currentPage={page} totalPages={12} onPageChange={setPage} />
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Steps (Stepper)</CardTitle>
          </Card.Header>
          <Card.Body>
            <Steps
              steps={[
                { id: '1', label: 'Dados' },
                { id: '2', label: 'Endereço' },
                { id: '3', label: 'Pagamento' },
                { id: '4', label: 'Revisão' },
              ]}
              currentIndex={0}
            />
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Navigation Rail</CardTitle>
          </Card.Header>
          <Card.Body className="flex justify-center bg-gray-50 py-4 dark:bg-gray-800/40">
            <div className="h-48 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
              <NavigationRail
                items={[
                  { id: 'dashboard', label: 'Painel', icon: LayoutDashboard },
                  { id: 'pedidos', label: 'Pedidos', icon: Package },
                  { id: 'agenda', label: 'Agenda', icon: Calendar },
                ]}
                activeId={railActive}
                onSelect={setRailActive}
                className="h-full border-0"
              />
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Bottom Navigation</CardTitle>
          </Card.Header>
          <Card.Body className="flex justify-center bg-gray-50 py-4 dark:bg-gray-800/40">
            <div className="w-80 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
              <BottomNavigation
                items={[
                  { id: 'home', label: 'Início', icon: Home },
                  { id: 'search', label: 'Buscar', icon: Search },
                  { id: 'notif', label: 'Alertas', icon: Bell },
                  { id: 'profile', label: 'Perfil', icon: Users },
                ]}
                activeId={bottomActive}
                onSelect={setBottomActive}
                onActionClick={() => {}}
                className="border-0"
              />
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Toolbar</CardTitle>
          </Card.Header>
          <Card.Body>
            <Toolbar>
              <Menu className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Registros</span>
              <div className="ml-auto flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Badge variant="neutral">Filtro</Badge>
                <MoreVertical className="h-4 w-4 text-gray-400" />
                <Button size="sm">
                  <Plus className="h-3.5 w-3.5" />
                  Novo
                </Button>
              </div>
            </Toolbar>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <CardTitle>Back to Top</CardTitle>
          </Card.Header>
          <Card.Body className="flex justify-center py-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg">
              <ArrowUp className="h-5 w-5" />
            </span>
          </Card.Body>
        </Card>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400">
        <ChevronRight className="h-3.5 w-3.5" />
        <span>Command Palette (⌘K) já está coberto acima — reaproveite o mesmo componente em qualquer tela que precise de busca global.</span>
      </div>
    </div>
  );
}
