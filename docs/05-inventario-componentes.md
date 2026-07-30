# 05 — Inventário de Componentes

Documento estrutural e permanente — inventário vivo de **todos** os componentes reutilizáveis do produto: `components/ui` (Design System puro), `components/charts` (wrappers Recharts) e `components/layout` (peças do AppShell). Toda vez que um componente novo for criado em qualquer uma dessas três pastas, ele deve ser adicionado à tabela correspondente aqui.

Antes de criar um componente novo para uma tela, **verifique esta tabela primeiro** — a maior parte dos blocos visuais do produto já tem um equivalente pronto.

## 1. `components/ui` — Design System

Cada componente vive em sua própria pasta com barrel export (`index.ts`); o barrel agregador de tudo é `src/components/ui/index.ts`.

| Componente | Caminho | Variantes | Props principais | Exemplo de uso |
|---|---|---|---|---|
| **Alert** | `components/ui/Alert` | `variant`: `success` · `info` (padrão) · `warning` · `danger` | `title: string`, `description?: string`, `onClose?: () => void`, `variant` | `<Alert variant="success" title="Sucesso" description="..." onClose={fn} />` |
| **Button** | `components/ui/Button` | `variant`: `primary` (padrão) · `secondary` · `ghost` · `danger`. `size`: `sm` · `md` (padrão) · `lg` | Todas as props nativas de `<button>` + `variant`, `size` | `<Button variant="primary" onClick={fn}>Salvar</Button>` |
| **Card** | `components/ui/Card` | Nenhuma (visual único: `bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-6`) | Compound: `Card`, `Card.Header`, `Card.Title`, `Card.Body` | `<Card><Card.Header><Card.Title>X</Card.Title></Card.Header><Card.Body>...</Card.Body></Card>` |
| **Checkbox** | `components/ui/Checkbox` (wrapper `@radix-ui/react-checkbox`) | Nenhuma — estado via `checked` (`true` \| `false` \| `"indeterminate"`) | Props do `Checkbox.Root` (`checked`, `onCheckedChange`, `disabled`, `id`) | `<Checkbox checked={v} onCheckedChange={setV} />` |
| **CodeBlock** | `components/ui/code-block` | Badge de linguagem: `CSS` · `JS` · `TS` · `JSON` (cor por tipo) | `language: string`, `code: string` | `<CodeBlock language="TS" code="const x = 1;" />` |
| **ColorSwatch** | `components/ui/color-swatch` | `shape`: `square` (padrão) · `circle`. `size`: `sm` · `md` (padrão) · `lg` | `color: string` (classe `bg-*` ou cor CSS), `label?: string`, `hex?: string` | `<ColorSwatch color="bg-violet-600" label="600" hex="#7F22FE" />` |
| **Avatar** | `components/ui/Avatar` (wrapper `@radix-ui/react-avatar`) | Nenhuma | Compound: `Avatar` (`h-9 w-9 rounded-full`), `Avatar.Image`, `Avatar.Fallback` | `<Avatar><Avatar.Image src="..." /><Avatar.Fallback>V</Avatar.Fallback></Avatar>` |
| **Badge** | `components/ui/Badge` | `variant`: `success` · `warning` · `danger` · `info` · `neutral` (padrão) | Props nativas de `<span>` + `variant` | `<Badge variant="success">pago</Badge>` |
| **Table** | `components/ui/Table` | Nenhuma — sorting/filtro/paginação vêm de `@tanstack/react-table` | `columns: ColumnDef<TData, any>[]`, `data: TData[]`, `pageSize?`, `filterPlaceholder?`, `emptyTitle?`, `emptyDescription?` | Ver exemplo completo em `docs/01-design-system.md` §3 (Table) |
| **Modal** | `components/ui/Modal` (wrapper `@radix-ui/react-dialog`) | Nenhuma | `Modal` = `Dialog.Root` (`open`, `onOpenChange`). Compound: `Trigger`, `Content` (`showCloseButton?`), `Title`, `Description`, `Footer`, `Close` | `<Modal><Modal.Trigger asChild><Button>Abrir</Button></Modal.Trigger><Modal.Content>...</Modal.Content></Modal>` |
| **DropdownMenu** | `components/ui/DropdownMenu` (wrapper `@radix-ui/react-dropdown-menu`) | Nenhuma | Compound: `Trigger`, `Content`, `Item`, `CheckboxItem`, `RadioItem`, `Label`, `Separator`, `Group`, `RadioGroup`, `Sub`, `SubTrigger`, `SubContent` | `<DropdownMenu><DropdownMenu.Trigger asChild><Button>Opções</Button></DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.Item>Perfil</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu>` |
| **Tabs** | `components/ui/Tabs` (wrapper `@radix-ui/react-tabs`) | Nenhuma | Compound: `Tabs` (`Root`), `Tabs.List`, `Tabs.Trigger`, `Tabs.Content` | `<Tabs defaultValue="geral"><Tabs.List><Tabs.Trigger value="geral">Geral</Tabs.Trigger></Tabs.List><Tabs.Content value="geral">...</Tabs.Content></Tabs>` |
| **Tooltip** | `components/ui/Tooltip` (wrapper `@radix-ui/react-tooltip`) | Nenhuma | Compound: `Tooltip.Provider` (montar uma vez, já feito em `AppShell`), `Tooltip` (`Root`), `Trigger`, `Content` | `<Tooltip><Tooltip.Trigger asChild><Button size="sm">Ajuda</Button></Tooltip.Trigger><Tooltip.Content>Texto</Tooltip.Content></Tooltip>` |
| **Select** | `components/ui/Select` (wrapper `@radix-ui/react-select`) | Nenhuma | Compound: `Select` (`Root`), `Trigger`, `Value`, `Content`, `Item`, `Label`, `Separator`, `Group` | `<Select defaultValue="financeiro"><Select.Trigger className="w-44"><Select.Value /></Select.Trigger><Select.Content><Select.Item value="financeiro">Financeiro</Select.Item></Select.Content></Select>` |
| **ShadowSwatch** | `components/ui/shadow-swatch` | Nenhuma | `shadowClassName: string`, `label: string`, `description?: string`, `value?: string` | `<ShadowSwatch shadowClassName="shadow-md" label="shadow-md" description="Sombra média" value="0 4px 6px -1px..." />` |
| **Switch** | `components/ui/Switch` (wrapper `@radix-ui/react-switch`) | Nenhuma | Props do `Switch.Root` (`checked`, `onCheckedChange`, `defaultChecked`, `id`, `disabled`) | `<Switch id="notify" checked={v} onCheckedChange={setV} />` |
| **Popover** | `components/ui/Popover` (wrapper `@radix-ui/react-popover`) | Nenhuma | Compound: `Popover` (`Root`), `Trigger`, `Content`, `Close`, `Anchor` | `<Popover><Popover.Trigger asChild><Button size="sm">Filtros</Button></Popover.Trigger><Popover.Content>...</Popover.Content></Popover>` |
| **RadioGroup** | `components/ui/Radio` (wrapper `@radix-ui/react-radio-group`) | `size`: `sm`·`md` (padrão)·`lg` | Compound: `RadioGroup` (`Root`, props `value`/`defaultValue`/`onValueChange`), `RadioGroup.Item` (primitivo: `value`, `size`, `error`), `RadioGroup.Field` (`id`, `value`, `label`, `description?`, `size?`, `error?`, `disabled?`) | `<RadioGroup defaultValue="b"><RadioGroup.Field id="a" value="a" label="A" /><RadioGroup.Field id="b" value="b" label="B" /></RadioGroup>` |
| **StatCard** | `components/ui/StatCard` | Nenhuma — cor do ícone via `iconColorClass` (props) | `icon: ReactNode`, `iconColorClass: string` (ex. `moduleColors.financeiro.iconClassName`), `label: string`, `value: string \| number`, `deltaPercent?`, `deltaLabel?` | `<StatCard icon={<Wallet />} iconColorClass={moduleColors.financeiro.iconClassName} label="Financeiro" value="R$ 82.430" deltaPercent={8.1} deltaLabel="vs mês anterior" />` |
| **EmptyState** | `components/ui/EmptyState` | Nenhuma | `icon?: ReactNode`, `title: string`, `description?`, `action?: ReactNode` | `<EmptyState icon={<Inbox />} title="Nenhum item" description="..." action={<Button size="sm">Limpar filtros</Button>} />` |
| **IconTile** | `components/ui/icon-tile` | `size`: `xs`·`sm`·`md` (padrão)·`lg`·`xl`·`2xl` | `icon: LucideIcon`, `label?: string`, `strokeWidth?: number` (padrão `1.5`) | `<IconTile icon={Home} label="home" />` |
| **Input** | `components/ui/Input` | Nenhuma | Todas as props nativas de `<input>` | `<Input placeholder="Buscar..." value={v} onChange={e => setV(e.target.value)} />` |
| **Skeleton** | `components/ui/Skeleton` | Nenhuma | Props nativas de `<div>`; largura/altura via `className` | `<Skeleton className="h-4 w-1/3" />` |
| **SpacingBar** | `components/ui/spacing-bar` | Nenhuma | `px: number`, `maxPx: number` (normaliza a largura proporcional) | `<SpacingBar px={24} maxPx={128} />` |
| **Toast (Toaster)** | `components/ui/Toast` | 4 tipos via função (`success`/`error`/`info`/`warning`) | Montado uma vez em `src/main.tsx`; disparado via `toast` de `sonner` (não reimportar `Toaster`) | `toast.success('Registro salvo com sucesso.')` |
| **Typography** | `components/ui/Typography` | `variant`: `h1` · `h2` · `body` (padrão) · `caption` · `kpi` — ver tabela de tipografia em `docs/04-design-tokens.md` | `variant`, `as?: ElementType` (sobrescreve a tag), `className?` | `<Typography variant="h1">Bom dia, William</Typography>` |
| **PermissionGate** | `components/ui/permission-gate` | Nenhuma | `permission: string \| string[]`, `children`, `fallback?` (padrão `null`) | Ver seção 4 (Arquitetura e RBAC) abaixo |

## 2. `components/charts` — wrappers Recharts

Todos são puramente visuais (recebem `title` + `data` + configuração mínima via props) e já vêm dentro de um `Card` com `Card.Title`. Cores hex centralizadas em `src/lib/chart-theme.ts` (ver `docs/04-design-tokens.md` §2) via `useChartTheme()`. Tooltip customizado compartilhado: `components/charts/ChartTooltip.tsx`.

| Componente | Caminho | Variantes | Props principais | Exemplo de uso |
|---|---|---|---|---|
| **AreaChartCard** | `components/charts/AreaChartCard` | Série 0 = violet-600 + gradiente; demais = cinza neutro | `title: string`, `data: Array<Record<string, string \| number>>`, `xKey: string`, `series: ChartSeriesConfig[]`, `height?` (280) | `<AreaChartCard title="Receita vs. meta" data={data} xKey="month" series={[{key:'receita'},{key:'meta'}]} />` |
| **LineChartCard** | `components/charts/LineChartCard` | Série 0 = violet-600; demais = cinza neutro | Mesmas de `AreaChartCard` | `<LineChartCard title="Usuários ativos" data={data} xKey="day" series={[{key:'ativos'}]} />` |
| **BarChartCard** | `components/charts/BarChartCard` | Igual `AreaChartCard` | Mesmas de `AreaChartCard` | `<BarChartCard title="Pedidos por canal" data={data} xKey="channel" series={[{key:'pedidos'}]} />` |
| **DonutChartCard** | `components/charts/DonutChartCard` | Paleta categórica (`chartColors.categorical`) | `title`, `data: Array<{name, value}>`, `centerLabel?`, `centerValue?` | `<DonutChartCard title="Distribuição por módulo" data={data} centerLabel="Total" centerValue={60} />` |

**Quando NÃO usar um wrapper de `charts/`:** se a referência visual exige um elemento extra no header do card (ex.: um `Select` de período), o wrapper genérico não expõe esse slot — replique a lógica de tema/tooltip diretamente com Recharts + `useChartTheme()`/`ChartTooltip`, como feito em `modules/dashboard/components/PerformanceCard.tsx` (ver `docs/03-pagina-dashboard.md`).

## 3. `components/layout` — peças do AppShell

Ver `docs/02-appshell-navegacao.md` para o funcionamento completo (RBAC do menu, tema, colapso da sidebar).

| Componente | Caminho | Variantes | Props principais | Exemplo de uso |
|---|---|---|---|---|
| **AppShell** | `components/layout/AppShell.tsx` | Nenhuma | Sem props — lê `useSidebarStore`, `useVisibleMenu` diretamente; renderiza `<Outlet />` | Elemento pai de todas as rotas do portal em `src/routes/router.tsx` |
| **Sidebar** | `components/layout/Sidebar.tsx` | Expandida (280px) / recolhida (80px, só ícones + Tooltip) | Sem props — lê `useSidebarStore`, `useVisibleMenu`, `useSessionStore` | Renderizado uma vez dentro de `AppShell` |
| **Topbar** | `components/layout/Topbar.tsx` | Nenhuma | Sem props — lê `useTheme`, `useSessionStore`, `useSidebarStore` | Renderizado uma vez dentro de `AppShell` |
| **AccountSwitcherMenu** | `components/layout/AccountSwitcherMenu.tsx` | Ancorado para baixo (topbar) ou para cima (rodapé da sidebar) | `trigger: ReactNode`, `align?: 'start'\|'end'\|'center'` (padrão `end`), `side?: 'top'\|'bottom'` (padrão `bottom`) | `<AccountSwitcherMenu trigger={<button>...</button>} side="top" align="start" />` |
| **NotificationsPopover** | `components/layout/NotificationsPopover.tsx` | Nenhuma | Sem props — lista mockada interna | Usado dentro de `Topbar` |
| **DesignSystemSidebar** | `components/layout/DesignSystemSidebar.tsx` | Nenhuma | Sem props — lê `dsMenuGroups` (`lib/ds-menu-config.ts`) e `useTheme` | Sidebar própria da documentação viva do Design System (`/design-system`), independente da `Sidebar` do portal — ver `docs/ds-00-estrutura-e-visao-geral.md` |

## 4. Arquitetura e RBAC — hooks/componentes de infraestrutura reutilizável

Peças que não são "visuais" no mesmo sentido de `components/ui` — são utilitários de arquitetura pensados para qualquer módulo futuro (Cadastros, Financeiro, Comunicação etc.), não só o Dashboard onde foram introduzidos.

### usePermission

- **Caminho:** `src/hooks/usePermission.ts`
- **Assinatura:** `usePermission(required: string | string[]): boolean`
- **O que faz:** lê `useSessionStore.permissions` (permissões já resolvidas para a conta ativa, ver `docs/02-appshell-navegacao.md`) e retorna `true` só se **todas** as permissões informadas estiverem presentes. Reativo — reavalia sozinho quando a conta ativa muda (`switchAccount`), sem precisar de reload.
```tsx
import { usePermission } from '@/hooks/usePermission';

const canEditInvoices = usePermission('financeiro.faturas.editar');
const canManageAccount = usePermission(['configuracoes.geral', 'configuracoes.usuarios']);
```
- **Quando usar diretamente (em vez de `PermissionGate`):** quando o resultado da checagem também precisa alimentar outra decisão além de "renderizar ou não" — por exemplo, calcular classes de grid/`col-span` com base em quais itens de uma linha estão visíveis (ver `DashboardPage.tsx`, seção 4 de `docs/03-pagina-dashboard.md`).

### PermissionGate

- **Caminho:** `src/components/ui/permission-gate/PermissionGate.tsx`
- **Props:** `permission: string | string[]`, `children: ReactNode`, `fallback?: ReactNode` (padrão `null`).
- **O que faz:** wrapper declarativo sobre `usePermission` — renderiza `children` se a conta ativa tiver a(s) permissão(ões), senão renderiza `fallback`.
```tsx
import { PermissionGate } from '@/components/ui';

<PermissionGate permission="financeiro.despesas.visualizar">
  <DespesasCard />
</PermissionGate>

<PermissionGate permission="cadastros.alunos.excluir" fallback={<Button disabled>Excluir</Button>}>
  <Button variant="danger">Excluir</Button>
</PermissionGate>
```
- **Quando usar:** para condicionar um bloco isolado sem que o resultado precise influenciar layout externo a ele — é o padrão preferido para a maioria dos casos (ex.: cada `StatCard` individual dentro de `StatCardsGrid`).
- **Exportado por:** `components/ui` (barrel), junto com os demais componentes do Design System.

### Convenção para novos módulos

Qualquer módulo novo que precise condicionar UI por permissão segue o mesmo padrão usado no Dashboard (`src/modules/dashboard/dashboard.permissions.ts`):

1. Declare um objeto `const` de permissões do módulo (`as const`), com uma chave por widget/ação — não strings soltas espalhadas pelo código.
2. Inclua essas permissões nos mocks de conta relevantes (`src/lib/mock-accounts.ts`, `mockMemberships`) para que o comportamento seja demonstrável trocando de conta.
3. Use `PermissionGate` para condicionar blocos isolados; use `usePermission` diretamente só quando o booleano também precisar decidir layout (grid dinâmico, `col-span`, etc.).
4. Se ocultar itens puder deixar buracos num grid multi-coluna, resolva com um componente auxiliar que colapsa o `col-span` dos itens restantes — não com CSS estático por posição (ver `CollapsingTwoColRow` em `DashboardPage.tsx` como referência).
5. Trate o caso de "zero itens visíveis" com `EmptyState` (`components/ui/EmptyState`) em vez de deixar a tela em branco sem explicação.
