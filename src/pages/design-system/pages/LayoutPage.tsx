import type { ReactNode } from 'react';
import {
  Bell,
  LayoutDashboard,
  Moon,
  Search,
  Settings,
  Users,
} from 'lucide-react';
import {
  AreaChartCard,
  DonutChartCard,
} from '../../../components/charts';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  ResizablePanel,
  ScrollArea,
  Spacer,
  Stack,
  StatCard,
  Typography,
} from '../../../components/ui';

function CardTitle({ children }: { children: string }) {
  return (
    <Typography as="h2" variant="h2" className="text-base">
      {children}
    </Typography>
  );
}

function MiniBlock({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-md border border-violet-200 bg-violet-50 text-xs text-violet-600 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-400 ${className}`}>
      {children}
    </div>
  );
}

const exampleAreaData = [
  { month: 'Jan', receita: 32 },
  { month: 'Fev', receita: 40 },
  { month: 'Mar', receita: 38 },
  { month: 'Abr', receita: 51 },
];

const exampleDonutData = [
  { name: 'Site', value: 45 },
  { name: 'App', value: 30 },
  { name: 'Outros', value: 25 },
];

export function LayoutPage() {
  return (
    <div className="space-y-6">
      <Grid cols={4} gap="lg">
        <Card className="col-span-4 lg:col-span-2">
          <Card.Header>
            <CardTitle>AppShell</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="flex h-32 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="w-10 shrink-0 bg-violet-100 dark:bg-violet-900/30" />
              <div className="flex flex-1 flex-col">
                <div className="h-6 shrink-0 border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/60" />
                <div className="flex-1 bg-white p-2 dark:bg-gray-900">
                  <div className="h-full rounded bg-gray-100 dark:bg-gray-800" />
                </div>
              </div>
            </div>
            <Typography className="mt-2">Sidebar + Topbar + conteúdo. Ver `components/layout/AppShell`.</Typography>
          </Card.Body>
        </Card>

        <Card className="col-span-4 lg:col-span-2">
          <Card.Header>
            <CardTitle>Container</CardTitle>
          </Card.Header>
          <Card.Body>
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800/40">
              <Container className="max-w-none space-y-2 rounded-md bg-white p-4 dark:bg-gray-900">
                <Typography as="h3" variant="h2" className="text-sm">
                  Título centralizado
                </Typography>
                <Typography>Bloco com largura máxima e padding horizontal consistente.</Typography>
                <Flex gap="sm">
                  <Button size="sm">Ação</Button>
                  <Button size="sm" variant="secondary">Cancelar</Button>
                </Flex>
              </Container>
            </div>
          </Card.Body>
        </Card>

        <Card className="col-span-4 lg:col-span-2">
          <Card.Header>
            <CardTitle>Grid (12 colunas)</CardTitle>
          </Card.Header>
          <Card.Body>
            <Grid cols={12} gap="sm">
              {Array.from({ length: 12 }, (_, i) => (
                <MiniBlock key={i} className="h-10">
                  {i + 1}
                </MiniBlock>
              ))}
            </Grid>
          </Card.Body>
        </Card>

        <Card className="col-span-4 lg:col-span-2">
          <Card.Header>
            <CardTitle>Stack</CardTitle>
          </Card.Header>
          <Card.Body>
            <Stack gap="sm">
              {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((item) => (
                <MiniBlock key={item} className="h-9">
                  {item}
                </MiniBlock>
              ))}
            </Stack>
          </Card.Body>
        </Card>

        <Card className="col-span-4 lg:col-span-2">
          <Card.Header>
            <CardTitle>Flex</CardTitle>
          </Card.Header>
          <Card.Body>
            <Flex justify="between" gap="sm">
              {['A', 'B', 'C'].map((item) => (
                <MiniBlock key={item} className="h-10 flex-1">
                  {item}
                </MiniBlock>
              ))}
            </Flex>
          </Card.Body>
        </Card>

        <Card className="col-span-4 lg:col-span-2">
          <Card.Header>
            <CardTitle>Spacer</CardTitle>
          </Card.Header>
          <Card.Body>
            <Flex align="center" className="rounded-lg border border-gray-200 p-3 dark:border-gray-800">
              <MiniBlock className="h-9 w-20">Início</MiniBlock>
              <Spacer />
              <MiniBlock className="h-9 w-20">Fim</MiniBlock>
            </Flex>
          </Card.Body>
        </Card>

        <Card className="col-span-4 lg:col-span-2">
          <Card.Header>
            <CardTitle>Divider</CardTitle>
          </Card.Header>
          <Card.Body className="space-y-4">
            <div>
              <Typography variant="caption" className="normal-case">solid (padrão)</Typography>
              <Divider className="mt-2" />
            </div>
            <div>
              <Typography variant="caption" className="normal-case">dashed</Typography>
              <Divider variant="dashed" className="mt-2" />
            </div>
            <div>
              <Typography variant="caption" className="normal-case">dotted</Typography>
              <Divider variant="dotted" className="mt-2" />
            </div>
          </Card.Body>
        </Card>

        <Card className="col-span-4 lg:col-span-2">
          <Card.Header>
            <CardTitle>ScrollArea</CardTitle>
          </Card.Header>
          <Card.Body>
            <ScrollArea className="h-32 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="space-y-2 p-3">
                {Array.from({ length: 10 }, (_, i) => (
                  <p key={i} className="text-sm text-gray-600 dark:text-gray-300">
                    Linha de conteúdo rolável {i + 1}
                  </p>
                ))}
              </div>
            </ScrollArea>
          </Card.Body>
        </Card>

        <Card className="col-span-4 lg:col-span-2">
          <Card.Header>
            <CardTitle>Resizable Panel</CardTitle>
          </Card.Header>
          <Card.Body>
            <ResizablePanel
              className="h-32"
              first={<MiniBlock className="h-full rounded-none border-0">Painel A</MiniBlock>}
              second={<MiniBlock className="h-full rounded-none border-0 bg-violet-100/60 dark:bg-violet-900/10">Painel B</MiniBlock>}
            />
          </Card.Body>
        </Card>

        <Card className="col-span-4 lg:col-span-2">
          <Card.Header>
            <CardTitle>Split Pane</CardTitle>
          </Card.Header>
          <Card.Body>
            <ResizablePanel
              className="h-32"
              defaultSize={30}
              minSize={20}
              maxSize={50}
              first={
                <div className="h-full space-y-1 bg-gray-50 p-2 dark:bg-gray-800/40">
                  <p className="px-2 text-xs font-medium text-gray-500 dark:text-gray-400">Menu</p>
                  {['Geral', 'Conta', 'Segurança'].map((i) => (
                    <p key={i} className="rounded px-2 py-1 text-xs text-gray-600 dark:text-gray-300">{i}</p>
                  ))}
                </div>
              }
              second={<div className="flex h-full items-center justify-center text-xs text-gray-400">Conteúdo</div>}
            />
          </Card.Body>
        </Card>

        <Card className="col-span-4 lg:col-span-2">
          <Card.Header>
            <CardTitle>Sidebar (expandida / recolhida)</CardTitle>
          </Card.Header>
          <Card.Body>
            <Flex gap="sm">
              <div className="h-28 w-24 shrink-0 rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-2 h-3 w-3 rounded-full bg-violet-600" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="mb-1 h-2 w-full rounded bg-gray-100 dark:bg-gray-800" />
                ))}
              </div>
              <div className="flex h-28 w-10 shrink-0 flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white py-2 dark:border-gray-800 dark:bg-gray-900">
                <div className="h-3 w-3 rounded-full bg-violet-600" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-2 w-2 rounded bg-gray-100 dark:bg-gray-800" />
                ))}
              </div>
            </Flex>
          </Card.Body>
        </Card>
      </Grid>

      <Card>
        <Card.Header>
          <CardTitle>Exemplo de Utilização</CardTitle>
        </Card.Header>
        <Card.Body>
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="flex h-[420px]">
              <div className="hidden w-48 shrink-0 flex-col border-r border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900 sm:flex">
                <Flex align="center" gap="sm" className="mb-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-white">
                    <LayoutDashboard className="h-3.5 w-3.5" />
                  </span>
                  <Typography variant="caption" className="normal-case text-gray-900 dark:text-gray-100">Sua Marca</Typography>
                </Flex>
                <Stack gap="xs">
                  {[
                    { icon: LayoutDashboard, label: 'Dashboard' },
                    { icon: Users, label: 'Usuários' },
                    { icon: Settings, label: 'Config' },
                  ].map((item) => (
                    <Flex key={item.label} align="center" gap="sm" className="rounded-lg px-2 py-1.5 text-xs text-gray-600 dark:text-gray-300">
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                    </Flex>
                  ))}
                </Stack>
              </div>
              <div className="flex flex-1 flex-col">
                <Flex align="center" className="h-12 shrink-0 border-b border-gray-200 px-4 dark:border-gray-800">
                  <div className="flex h-7 w-40 items-center gap-1.5 rounded-lg border border-gray-200 px-2 text-gray-400 dark:border-gray-700">
                    <Search className="h-3 w-3" />
                    <span className="text-[10px]">Buscar...</span>
                  </div>
                  <Spacer />
                  <Flex align="center" gap="sm">
                    <Moon className="h-3.5 w-3.5 text-gray-400" />
                    <Bell className="h-3.5 w-3.5 text-gray-400" />
                    <Avatar className="h-6 w-6">
                      <Avatar.Fallback>S</Avatar.Fallback>
                    </Avatar>
                  </Flex>
                </Flex>
                <ScrollArea className="flex-1 bg-gray-50 dark:bg-gray-950">
                  <div className="space-y-4 p-4">
                    <Grid cols={4} gap="md">
                      <StatCard icon={<Users className="h-4 w-4" />} iconColorClass="bg-violet-100 text-violet-600" label="Usuários" value="1.284" deltaPercent={4.2} />
                      <StatCard icon={<Bell className="h-4 w-4" />} iconColorClass="bg-blue-100 text-blue-600" label="Notificações" value="86" deltaPercent={-1.1} />
                      <StatCard icon={<LayoutDashboard className="h-4 w-4" />} iconColorClass="bg-green-100 text-green-600" label="Painéis" value="12" deltaPercent={0} />
                      <StatCard icon={<Settings className="h-4 w-4" />} iconColorClass="bg-amber-100 text-amber-600" label="Integrações" value="5" deltaPercent={2.3} />
                    </Grid>
                    <Grid cols={2} gap="md">
                      <AreaChartCard title="Receita" data={exampleAreaData} xKey="month" series={[{ key: 'receita', label: 'Receita' }]} height={180} />
                      <DonutChartCard title="Canais" data={exampleDonutData} centerLabel="Total" centerValue={100} height={180} />
                    </Grid>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Badge variant="neutral">Nota</Badge>
        <span>Blocos estruturais reutilizáveis — não são a mesma instância do `AppShell` real do portal.</span>
      </div>
    </div>
  );
}
