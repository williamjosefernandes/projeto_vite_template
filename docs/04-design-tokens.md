# 04 — Design Tokens

Fonte única da verdade dos tokens visuais do produto. Documento estrutural e permanente — **sempre que um token mudar no código, este documento precisa ser atualizado junto**. Antes de escrever qualquer estilo novo, consulte esta tabela; se o token que você precisa não existir aqui, é sinal de que precisa ser criado (em `src/lib/`) e documentado aqui, não inventado ad-hoc no componente.

## 1. Cores de superfície, texto e borda

Paleta padrão do Tailwind (sem paleta customizada). Fonte: `src/styles/globals.css` (dark mode via classe `.dark`, não `prefers-color-scheme`) e uso consistente em `components/ui`/`components/layout`.

| Papel | Light | Dark |
|---|---|---|
| Fundo geral da aplicação | `bg-gray-50` | `bg-gray-950` |
| Superfície (sidebar/topbar/cards/menus) | `bg-white` | `bg-gray-900` |
| Bordas/divisores | `border-gray-200` | `border-gray-800` |
| Texto principal | `text-gray-900` | `text-gray-100` |
| Texto secundário/corpo | `text-gray-600` / `text-gray-500` | `text-gray-300` / `text-gray-400` |
| Texto muted/caption/placeholder | `text-gray-400` | `text-gray-500` |
| Hover em item de lista/menu | `bg-gray-100` | `bg-gray-800` (ou `bg-gray-800/60`) |

## 2. Cor primária e cores de status

| Papel | Light | Dark |
|---|---|---|
| Primária (marca, item ativo, links, ícone de destaque) | `text-violet-700` / `bg-violet-50` | `text-violet-400` / `bg-violet-900/30` |
| Botão primário (CTA) | `bg-violet-600 hover:bg-violet-700 text-white` | igual (mesma classe em ambos os temas) |
| Foco/anel de acessibilidade | `focus-visible:ring-violet-500` | igual |
| Positivo (sucesso, variação ↑, pago) | `text-green-600` / `bg-green-100` | `text-green-400` / `bg-green-900/30` |
| Negativo (erro, variação ↓, despesa) | `text-red-600` / `bg-red-100` | `text-red-400` / `bg-red-900/30` |
| Alerta (warning) | `text-amber-600` / `bg-amber-100` | `text-amber-400` / `bg-amber-900/30` |
| Informação (info) | `text-blue-700` / `bg-blue-100` | `text-blue-400` / `bg-blue-900/30` |
| Neutro (badge padrão) | `text-gray-700` / `bg-gray-100` | `text-gray-400` / `bg-gray-800` |

Cor hex equivalente para gráficos Recharts (que exigem `string`, não classe Tailwind) — centralizada em `src/lib/chart-theme.ts` (`chartColors`):

| Token | Hex | Uso |
|---|---|---|
| `chartColors.primary` | `#7C3AED` (violet-600) | Série principal de qualquer gráfico |
| `chartColors.secondary` | `#9CA3AF` (gray-400) | Séries secundárias |
| `chartColors.categorical` | `['#7C3AED', '#A78BFA', '#9CA3AF', '#D1D5DB', '#6B7280', '#4B5563']` | Fatias de gráficos categóricos (ex.: `DonutChartCard`) |
| `chartColors.grid` | `#E5E7EB` (light) / `#1F2937` (dark) | Linhas de grade dos eixos |
| `chartColors.axisText` | `#6B7280` (light) / `#9CA3AF` (dark) | Labels dos eixos |
| `chartColors.tooltip` | `{bg:'#FFFFFF',border:'#E5E7EB',text:'#111827'}` (light) / `{bg:'#1F2937',border:'#374151',text:'#F3F4F6'}` (dark) | Tooltip customizado (`ChartTooltip`) |

Use `getChartTheme(isDark?)` ou o hook reativo `useChartTheme()` para resolver esses tokens conforme o tema atual — nunca hardcode o hex direto num componente de gráfico novo.

## 3. Cores por módulo de negócio

Centralizadas em `src/lib/module-colors.ts` (`moduleColors`). Usadas no badge de ícone de cada grupo de módulo na Sidebar, em `StatCard.iconColorClass` e em qualquer lugar que precise identificar visualmente a qual módulo um dado pertence.

| Módulo | Classe (light) | Classe (dark) |
|---|---|---|
| Cadastros | `bg-orange-100 text-orange-600` | `bg-orange-900/30 text-orange-400` |
| Financeiro | `bg-green-100 text-green-600` | `bg-green-900/30 text-green-400` |
| Comunicação | `bg-blue-100 text-blue-600` | `bg-blue-900/30 text-blue-400` |
| Operações | `bg-emerald-100 text-emerald-600` | `bg-emerald-900/30 text-emerald-400` |
| Marketing | `bg-rose-100 text-rose-600` | `bg-rose-900/30 text-rose-400` |
| Configurações | `bg-gray-100 text-gray-600` | `bg-gray-800 text-gray-400` |

Ao criar um módulo novo que não se encaixe nessas 6 categorias, adicione uma entrada nova em `moduleColors` (não use uma cor solta fora dele) e registre a nova linha nesta tabela.

## 4. Tipografia e hierarquia

Consolidada no componente `Typography` (`components/ui/Typography`) — **nunca repita estas classes manualmente**, sempre use `<Typography variant="...">`.

| Uso | Variant | Classe Tailwind | Tag padrão |
|---|---|---|---|
| H1 (saudação/título de página) | `h1` | `text-2xl font-semibold text-gray-900 dark:text-gray-100` | `<h1>` |
| H2 (título de card/seção) | `h2` | `text-base font-semibold text-gray-900 dark:text-gray-100` | `<h2>` |
| Corpo | `body` (padrão) | `text-sm text-gray-600 dark:text-gray-300` | `<p>` |
| Label/Caption | `caption` | `text-xs text-gray-400 uppercase tracking-wide` | `<span>` |
| Valor de KPI | `kpi` | `text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100` | `<p>` |

Fonte: Inter (`@fontsource/inter`, pesos 400/500/600/700), aplicada via `--font-sans` no `@theme` de `src/styles/globals.css`.

## 5. Espaçamento e raio de borda

Não há uma escala customizada — são os valores padrão do Tailwind, usados de forma consistente pelos componentes de `components/ui`:

| Token | Uso típico |
|---|---|
| `p-6` | Padding interno de `Card` |
| `p-4` | Padding interno de itens de lista/menu, popovers |
| `px-3 py-2` / `px-4 py-2.5` | Padding de itens clicáveis (menu, dropdown) |
| `gap-3` | Gap entre ícone e label (itens de menu, lista) |
| `gap-4` / `gap-6` | Gap entre cards num grid (`StatCardsGrid`, linhas do Dashboard) |
| `space-y-1` | Espaçamento vertical entre itens de uma lista de menu |
| `space-y-4` | Espaçamento vertical entre itens de uma lista de card (atividades, agenda, notificações) |
| `rounded-lg` | Raio padrão de botões, inputs, itens de menu, badges de módulo |
| `rounded-xl` | Raio padrão de `Card`, painéis de dropdown/menu |
| `rounded-full` | Avatares, badges de contagem, indicadores de status (pontinho) |
| `rounded-md` | Badge de ícone de módulo (quadrado 8×8) |
| `shadow-sm` | Sombra padrão de `Card` |
| `shadow-md` / `shadow-lg` | Sombra de elementos flutuantes (dropdown, popover, tooltip, modal) |

## 6. Layout do AppShell

Tokens fixos de dimensão da casca (não são reaproveitáveis em outros contextos, mas fazem parte do "grid" visual do produto):

| Elemento | Valor |
|---|---|
| Altura da Topbar | `64px` (`grid-rows-[64px_1fr]`) |
| Largura da Sidebar expandida | `280px` |
| Largura da Sidebar recolhida | `80px` |
| Transição de colapso | `transition-[grid-template-columns] duration-200` |
