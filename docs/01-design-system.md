# 01 — Design System

## 1. Objetivo desta fase

Construir os blocos reutilizáveis do produto: os componentes base em `src/components/ui`, os wrappers de gráfico em `src/components/charts` e a consolidação da tipografia. Nenhuma tela de negócio (Sidebar, Topbar, Dashboard) foi criada nesta etapa — isso vem nas próximas etapas, que devem compor exclusivamente a partir do que está documentado aqui.

Uma rota temporária `/design-system` (`src/pages/design-system`) renderiza todos os componentes lado a lado, em light e dark, apenas para conferência visual. Ela é descartável e deve ser removida quando o AppShell real existir.

Este documento é o **inventário vivo de componentes**: toda vez que um componente novo for criado (nesta etapa ou em etapas futuras), ele deve ser adicionado aqui.

## 2. Tokens

### 2.1 Cores por módulo

Tokens centralizados em `src/lib/module-colors.ts` (`moduleColors`), usados futuramente na sidebar e já hoje no `StatCard`/`Select` da página de demonstração.

| Módulo         | Classe do ícone/fundo                                                       |
|----------------|-------------------------------------------------------------------------------|
| Cadastros      | `bg-orange-100 text-orange-600` (dark: `bg-orange-900/30 text-orange-400`)   |
| Financeiro     | `bg-green-100 text-green-600` (dark: `bg-green-900/30 text-green-400`)      |
| Comunicação    | `bg-blue-100 text-blue-600` (dark: `bg-blue-900/30 text-blue-400`)          |
| Operações      | `bg-emerald-100 text-emerald-600` (dark: `bg-emerald-900/30 text-emerald-400`) |
| Marketing      | `bg-rose-100 text-rose-600` (dark: `bg-rose-900/30 text-rose-400`)          |
| Configurações  | `bg-gray-100 text-gray-600` (dark: `bg-gray-800 text-gray-400`)             |

### 2.2 Tipografia e hierarquia

Consolidada no componente `Typography` (`src/components/ui/Typography`). Nunca repita estas classes manualmente — use `<Typography variant="...">`.

| Uso                  | Variant       | Classe Tailwind                                                          |
|-----------------------|---------------|----------------------------------------------------------------------------|
| H1 (saudação/título)  | `h1`          | `text-2xl font-semibold text-gray-900 dark:text-gray-100`                 |
| H2 (título de card)   | `h2`          | `text-base font-semibold text-gray-900 dark:text-gray-100`                |
| Corpo                 | `body`        | `text-sm text-gray-600 dark:text-gray-300`                                |
| Label/Caption         | `caption`     | `text-xs text-gray-400 uppercase tracking-wide`                           |
| Valor de KPI          | `kpi`         | `text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100`  |

## 3. Inventário de componentes — `src/components/ui`

Cada componente vive em sua própria pasta com barrel export (`index.ts`). O barrel agregador de tudo é `src/components/ui/index.ts`.

### Button
- **Caminho:** `components/ui/Button`
- **Props principais:** todas as props nativas de `<button>` + `variant`, `size`.
- **Variantes:** `variant`: `primary` (padrão) · `secondary` · `ghost` · `danger`. `size`: `sm` · `md` (padrão) · `lg`.
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md" onClick={handleSave}>
  Salvar
</Button>
```

### Card
- **Caminho:** `components/ui/Card`
- **Props principais:** composição — `Card`, `Card.Header`, `Card.Title`, `Card.Body` aceitam as props nativas do elemento correspondente (`div`/heading).
- **Variantes:** nenhuma (visual único: `bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-6`).
```tsx
import { Card } from '@/components/ui';

<Card>
  <Card.Header>
    <Card.Title>Faturamento</Card.Title>
  </Card.Header>
  <Card.Body>Conteúdo do card.</Card.Body>
</Card>
```

### Badge
- **Caminho:** `components/ui/Badge`
- **Props principais:** props nativas de `<span>` + `variant`.
- **Variantes:** `success` · `warning` · `danger` · `info` · `neutral` (padrão).
```tsx
import { Badge } from '@/components/ui';

<Badge variant="success">pago</Badge>
```

### Table
- **Caminho:** `components/ui/Table`
- **Props principais:** `columns: ColumnDef<TData, any>[]`, `data: TData[]`, `pageSize?`, `filterPlaceholder?`, `emptyTitle?`, `emptyDescription?`, `className?`.
- **Variantes:** nenhuma — sorting, busca global e paginação vêm de `@tanstack/react-table` internamente; o campo de busca só aparece se `filterPlaceholder` for informado.
```tsx
import { Table } from '@/components/ui';
import type { ColumnDef } from '@tanstack/react-table';

interface Invoice { id: string; client: string; amount: number }

const columns: ColumnDef<Invoice, any>[] = [
  { accessorKey: 'id', header: 'Fatura' },
  { accessorKey: 'client', header: 'Cliente' },
  { accessorKey: 'amount', header: 'Valor' },
];

<Table columns={columns} data={invoices} filterPlaceholder="Buscar fatura..." />
```

### Modal
- **Caminho:** `components/ui/Modal` (wrapper de `@radix-ui/react-dialog`)
- **Props principais:** `Modal` = `Dialog.Root` (`open`, `onOpenChange`, `defaultOpen`). `Modal.Content` aceita `showCloseButton?: boolean` (padrão `true`) + props do `Dialog.Content`.
- **Subcomponentes:** `Modal.Trigger`, `Modal.Content`, `Modal.Title`, `Modal.Description`, `Modal.Footer`, `Modal.Close`.
```tsx
import { Button, Modal } from '@/components/ui';

<Modal>
  <Modal.Trigger asChild>
    <Button>Abrir modal</Button>
  </Modal.Trigger>
  <Modal.Content>
    <Modal.Title>Confirmar ação</Modal.Title>
    <Modal.Description>Esta ação não pode ser desfeita.</Modal.Description>
    <Modal.Footer>
      <Modal.Close asChild><Button variant="secondary">Cancelar</Button></Modal.Close>
      <Modal.Close asChild><Button>Confirmar</Button></Modal.Close>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

### DropdownMenu
- **Caminho:** `components/ui/DropdownMenu` (wrapper de `@radix-ui/react-dropdown-menu`)
- **Props principais:** `DropdownMenu` = `DropdownMenuPrimitive.Root`.
- **Subcomponentes:** `Trigger`, `Content`, `Item`, `CheckboxItem`, `RadioItem`, `Label`, `Separator`, `Group`, `RadioGroup`, `Sub`, `SubTrigger`, `SubContent`. Reutilizável tanto para menus simples quanto para o menu de conta (Etapa 3 — AppShell).
```tsx
import { Button, DropdownMenu } from '@/components/ui';

<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button variant="secondary">Opções</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>Perfil</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>Sair</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
```

### Tabs
- **Caminho:** `components/ui/Tabs` (wrapper de `@radix-ui/react-tabs`)
- **Subcomponentes:** `Tabs` (`Root`), `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`.
```tsx
import { Tabs } from '@/components/ui';

<Tabs defaultValue="geral">
  <Tabs.List>
    <Tabs.Trigger value="geral">Geral</Tabs.Trigger>
    <Tabs.Trigger value="financeiro">Financeiro</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="geral">Conteúdo geral</Tabs.Content>
  <Tabs.Content value="financeiro">Conteúdo financeiro</Tabs.Content>
</Tabs>
```

### Tooltip
- **Caminho:** `components/ui/Tooltip` (wrapper de `@radix-ui/react-tooltip`)
- **Subcomponentes:** `Tooltip.Provider` (montar uma vez no root/AppShell), `Tooltip` (`Root`), `Tooltip.Trigger`, `Tooltip.Content`.
```tsx
import { Button, Tooltip } from '@/components/ui';

<Tooltip.Provider>
  <Tooltip>
    <Tooltip.Trigger asChild><Button variant="ghost" size="sm">Ajuda</Button></Tooltip.Trigger>
    <Tooltip.Content>Texto de ajuda contextual</Tooltip.Content>
  </Tooltip>
</Tooltip.Provider>
```

### Select
- **Caminho:** `components/ui/Select` (wrapper de `@radix-ui/react-select`)
- **Subcomponentes:** `Select` (`Root`), `Select.Trigger`, `Select.Value`, `Select.Content`, `Select.Item`, `Select.Label`, `Select.Separator`, `Select.Group`.
```tsx
import { Select } from '@/components/ui';

<Select defaultValue="financeiro">
  <Select.Trigger className="w-44">
    <Select.Value placeholder="Selecione um módulo" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="cadastros">Cadastros</Select.Item>
    <Select.Item value="financeiro">Financeiro</Select.Item>
  </Select.Content>
</Select>
```

### Switch
- **Caminho:** `components/ui/Switch` (wrapper de `@radix-ui/react-switch`)
- **Props principais:** props do `Switch.Root` do Radix (`checked`, `onCheckedChange`, `defaultChecked`, `id`, `disabled`).
```tsx
import { Switch } from '@/components/ui';

<Switch id="notify" checked={enabled} onCheckedChange={setEnabled} />
<label htmlFor="notify">Notificações por email</label>
```

### Popover
- **Caminho:** `components/ui/Popover` (wrapper de `@radix-ui/react-popover`)
- **Subcomponentes:** `Popover` (`Root`), `Popover.Trigger`, `Popover.Content`, `Popover.Close`, `Popover.Anchor`.
```tsx
import { Button, Popover } from '@/components/ui';

<Popover>
  <Popover.Trigger asChild><Button variant="secondary" size="sm">Filtros</Button></Popover.Trigger>
  <Popover.Content>Conteúdo livre do popover.</Popover.Content>
</Popover>
```

### StatCard
- **Caminho:** `components/ui/StatCard`
- **Props principais:** `icon: ReactNode`, `iconColorClass: string` (ex.: `moduleColors.financeiro.iconClassName`), `label: string`, `value: string | number`, `deltaPercent?: number`, `deltaLabel?: string`, `className?`.
- **Comportamento:** `deltaPercent` positivo renderiza seta `↑` verde; negativo, `↓` vermelha.
```tsx
import { Wallet } from 'lucide-react';
import { StatCard } from '@/components/ui';
import { moduleColors } from '@/lib/module-colors';

<StatCard
  icon={<Wallet className="h-5 w-5" />}
  iconColorClass={moduleColors.financeiro.iconClassName}
  label="Financeiro"
  value="R$ 82.430"
  deltaPercent={8.1}
  deltaLabel="vs mês anterior"
/>
```

### EmptyState
- **Caminho:** `components/ui/EmptyState`
- **Props principais:** `icon?: ReactNode`, `title: string`, `description?: string`, `action?: ReactNode`, `className?`.
```tsx
import { Inbox } from 'lucide-react';
import { Button, EmptyState } from '@/components/ui';

<EmptyState
  icon={<Inbox className="h-6 w-6" />}
  title="Nenhum item por aqui"
  description="Quando houver dados, eles aparecerão nesta área."
  action={<Button size="sm">Limpar filtros</Button>}
/>
```

### Skeleton
- **Caminho:** `components/ui/Skeleton`
- **Props principais:** props nativas de `<div>`; combine largura/altura via `className`.
```tsx
import { Skeleton } from '@/components/ui';

<Skeleton className="h-4 w-1/3" />
<Skeleton className="h-24 w-full" />
```

### Toast (Toaster)
- **Caminho:** `components/ui/Toast`
- **O que é:** wrapper de `<Toaster />` do `sonner`, já estilizado com os tokens do Design System (cantos arredondados, cores por tipo). Montado uma única vez em `src/main.tsx`.
- **Uso:** para disparar um toast em qualquer componente, importe `toast` diretamente de `sonner` (não precisa reimportar o `Toaster`).
```tsx
import { toast } from 'sonner';

toast.success('Registro salvo com sucesso.');
toast.error('Não foi possível concluir a ação.');
toast.info('Nova atualização disponível.');
toast.warning('Verifique os dados antes de continuar.');
```

### Typography
- **Caminho:** `components/ui/Typography`
- **Props principais:** `variant: 'h1' | 'h2' | 'body' | 'caption' | 'kpi'` (padrão `body`), `as?: ElementType` (sobrescreve a tag renderizada; por padrão `h1→<h1>`, `h2→<h2>`, `body→<p>`, `caption→<span>`, `kpi→<p>`), `className?`.
```tsx
import { Typography } from '@/components/ui';

<Typography variant="h1">Bom dia, William</Typography>
<Typography variant="kpi">R$ 82.430</Typography>
```

## 4. Wrappers de gráfico — `src/components/charts`

Todos os wrappers são puramente visuais (recebem `title` + `data` + configuração mínima via props) e já vêm dentro de um `Card` com `Card.Title`. As cores hex usadas pelo Recharts (que exige `string`, não classe Tailwind) ficam centralizadas em `src/lib/chart-theme.ts`:

- `chartColors.primary` = `#7C3AED` (violet-600) — série principal.
- `chartColors.secondary` = `#9CA3AF` (gray-400) — séries secundárias.
- `chartColors.categorical` — paleta para gráficos categóricos (fatias do `DonutChartCard`).
- `chartColors.grid` / `chartColors.axisText` / `chartColors.tooltip` — variam por tema (`#E5E7EB`/`#1F2937` no grid, por exemplo).
- `getChartTheme(isDark?)` resolve os tokens acima para o tema informado (ou detecta o tema atual lendo a classe `.dark` em `<html>`).
- `useChartTheme()` é a versão reativa: observa a classe `.dark` via `MutationObserver` e força o gráfico a re-renderizar com as cores certas assim que o tema muda — é o que os quatro wrappers usam internamente.

Um `ChartTooltip` compartilhado (`components/charts/ChartTooltip.tsx`) implementa o tooltip customizado (`bg-white dark:bg-gray-800`, `shadow-md`, `rounded-lg`, borda `border-gray-200 dark:border-gray-700`) usado pelos quatro wrappers.

### AreaChartCard
```tsx
import { AreaChartCard } from '@/components/charts';

<AreaChartCard
  title="Receita vs. meta"
  data={[
    { month: 'Jan', receita: 32, meta: 28 },
    { month: 'Fev', receita: 40, meta: 30 },
  ]}
  xKey="month"
  series={[
    { key: 'receita', label: 'Receita' }, // índice 0: violet-600 + gradiente
    { key: 'meta', label: 'Meta' },       // demais séries: cinza neutro
  ]}
/>
```

### LineChartCard
```tsx
import { LineChartCard } from '@/components/charts';

<LineChartCard
  title="Usuários ativos"
  data={[
    { day: 'Seg', ativos: 210, novos: 40 },
    { day: 'Ter', ativos: 230, novos: 52 },
  ]}
  xKey="day"
  series={[{ key: 'ativos', label: 'Ativos' }, { key: 'novos', label: 'Novos' }]}
/>
```

### BarChartCard
```tsx
import { BarChartCard } from '@/components/charts';

<BarChartCard
  title="Pedidos por canal"
  data={[
    { channel: 'Site', pedidos: 120 },
    { channel: 'App', pedidos: 98 },
  ]}
  xKey="channel"
  series={[{ key: 'pedidos', label: 'Pedidos' }]}
/>
```

### DonutChartCard
```tsx
import { DonutChartCard } from '@/components/charts';

<DonutChartCard
  title="Distribuição por módulo"
  data={[
    { name: 'Cadastros', value: 32 },
    { name: 'Financeiro', value: 28 },
  ]}
  centerLabel="Total"
  centerValue={60}
/>
```

## 5. Página de demonstração

`src/pages/design-system/DesignSystemPage.tsx`, montada na rota `/design-system` (`src/routes/router.tsx`). Renderiza todos os componentes acima com dados de exemplo e um botão de alternância de tema no cabeçalho. É temporária — remover quando o AppShell (Sidebar/Topbar) e as telas reais existirem.

## 6. Entregável verificado

- `npx tsc -b` sem erros de tipagem.
- `npm run lint` (oxlint) sem erros — apenas avisos esperados de `react/only-export-components` nos arquivos de componentes compostos (`Card`, `Modal`, `DropdownMenu`, `Tabs`, `Select`, `Tooltip`, `Popover`, `Badge`, `Button`, `Typography`), que exportam variantes/subcomponentes do mesmo arquivo — trade-off aceito do padrão de compound components.
- `/design-system` testado em light e dark via Playwright headless: sem erros de console, modal/dropdown/tabs/select/switch/popover/toast funcionando, gráficos renderizando com as cores corretas em ambos os temas.
- Bug encontrado e corrigido durante a verificação: o `Toaster` usava classes sem `!important`, e o estilo inline padrão do `sonner` sobrescrevia o fundo/borda/texto no tema escuro (toast ficava branco mesmo com `.dark` ativo). Corrigido prefixando as classes de fundo/borda/texto do `toast` com `!` em `components/ui/Toast/Toast.tsx`.
