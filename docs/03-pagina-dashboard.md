# 03 — Página Dashboard

## 1. Objetivo desta fase

Implementar o conteúdo real da rota `/` (Dashboard), a única página de conteúdo desta entrega, dentro do `AppShell` construído na Etapa 3. A página é inteiramente orientada a dados mockados — nenhuma chamada de API real ainda — mas já estruturada para que trocar o mock por dados reais não exija tocar em nenhum componente visual (ver seção 3).

Compõe exclusivamente a partir do que já existia: `Card`, `StatCard`, `Select`, `Button`, `DropdownMenu`, `Typography` (Etapa 2) e a lógica de tema dos gráficos (`useChartTheme`, `ChartTooltip`, Etapa 2).

## 2. Componentes criados — `src/modules/dashboard/components`

Todos recebem os dados já prontos via props (sem lógica de mock/formatação dentro deles) e reutilizam `Card` como casca visual.

### DashboardHeader
- **Props:** `userName: string`, `periodLabel: string`, `quickActions: QuickActionData[]`.
- **Renderiza:** saudação `"Olá, {userName}! 👋"` + subtítulo, botão secundário de período (`Calendar` + `periodLabel` + chevron — apenas visual, não filtra dados nesta etapa) e botão primário **"+ Ação rápida"** (`DropdownMenu` com os itens de `quickActions`).

### StatCardsGrid
- **Props:** `stats: StatCardData[]`.
- **Renderiza:** grid responsivo (`1 → 2 → 4` colunas) de `StatCard` (componente da Etapa 2), um por item de `stats`.

### PerformanceCard
- **Props:** `data: Array<{ date: string; valor: number }>`.
- **O que é:** card "Desempenho" com `AreaChart` do Recharts + `Select` de período ("7 dias" / "30 dias" / "90 dias", só visual) no cabeçalho. **Não** usa o `AreaChartCard` genérico da Etapa 2 porque aquele wrapper não expõe um slot para o `Select` no header — a lógica de tema/gradiente/tooltip foi replicada aqui a partir dele (`useChartTheme`, `ChartTooltip`).
- **Detalhe corrigido durante a verificação:** o eixo Y usa `tickFormatter` para exibir valores em milhares (`2k`, `4k`, `6k`...) — sem isso, os ticks de 4 dígitos (ex. `8000`) ficavam cortados na largura padrão do eixo.

### RecentActivitiesCard
- **Props:** `activities: ActivityData[]`.
- **Renderiza:** lista de atividades (ícone colorido + título + descrição + tempo relativo), link "Ver todas" no cabeçalho (sem navegação real nesta etapa).

### TodayAgendaCard
- **Props:** `items: AgendaItemData[]`.
- **Renderiza:** lista de compromissos (horário + nome + descrição + pontinho de status: verde para `confirmado`, âmbar para `pendente`) e botão `"Ver agenda completa"` no rodapé.

### NotificationsCard
- **Props:** `notifications: DashboardNotificationData[]`.
- **Renderiza:** igual ao popover de notificações da Topbar (Etapa 3), mas como card fixo na página — cada item com um pontinho vermelho quando `unread: true`.

### TopProductsTable
- **Props:** `products: TopProductData[]`.
- **O que é:** tabela HTML simples (Produto/Serviço, Vendas, Faturamento) com uma barra de progresso fina sob o nome do produto, largura proporcional a `sharePercent` (0–100). Não usa o componente `Table` genérico da Etapa 2 (que traz sorting/paginação/busca) porque a referência pede uma tabela estática sem essas interações.

### FinancialSummaryCard
- **Props:** `summary: FinancialSummaryData`.
- **Renderiza:** "Receita" (verde) / "Despesas" (vermelho) lado a lado, `Select` "Este mês" no cabeçalho (só visual), e um bloco de destaque com "Lucro líquido" + variação percentual + um `LineChart` do Recharts sem eixos/grid como sparkline (`summary.sparkline: number[]`).

## 3. Dados mockados e como trocar por dados reais

### Onde ficam
- `src/modules/dashboard/mocks/dashboard.mock.ts`: todos os arrays/objetos mockados (`statCardsMock`, `performanceDataMock`, `recentActivitiesMock`, `todayAgendaMock`, `dashboardNotificationsMock`, `topProductsMock`, `financialSummaryMock`, `quickActionsMock`) junto com os tipos (`StatCardData`, `ActivityData`, etc.) que os componentes de `components/` consomem via props.
- `src/modules/dashboard/hooks/useDashboardData.ts`: hoje só importa os mocks acima e devolve um objeto único com todas as chaves que `DashboardPage` distribui para os componentes.

### Como substituir por uma API real
`DashboardPage.tsx` só conhece o formato de retorno de `useDashboardData()` — não conhece os mocks diretamente. Para trocar por dados reais:

1. Crie um cliente/endpoint por seção (ex.: `fetchDashboardStats()`, `fetchPerformanceSeries(period)`) em uma camada de API (`src/lib/api` ou similar).
2. Reescreva `useDashboardData` como um hook baseado em `@tanstack/react-query` (já é dependência do projeto), mantendo a mesma assinatura de retorno:
   ```ts
   export function useDashboardData() {
     const stats = useQuery({ queryKey: ['dashboard', 'stats'], queryFn: fetchDashboardStats });
     const performance = useQuery({ queryKey: ['dashboard', 'performance'], queryFn: fetchPerformanceSeries });
     // ...demais seções

     return {
       statCards: stats.data ?? [],
       performanceData: performance.data ?? [],
       // ...
     };
   }
   ```
3. Nenhum componente em `components/` muda — todos recebem os mesmos tipos (`StatCardData[]`, `ActivityData[]`, etc.) vindos de `mocks/dashboard.mock.ts` hoje, e da API depois.
4. Estados de loading/erro por seção podem ser tratados dentro de `useDashboardData` (ex.: retornando arrays vazios enquanto carrega) ou propagados para `DashboardPage` decidir — não foi necessário nesta etapa por não haver requisições reais.

## 4. Permissões por widget

Cada bloco do Dashboard só é renderizado se a conta ativa (`useSessionStore.permissions`) tiver a permissão correspondente. A checagem é reativa: trocar de conta no `AccountSwitcherMenu` (Etapa 3) reorganiza o dashboard instantaneamente, sem reload.

### Onde ficam as permissões
`src/modules/dashboard/dashboard.permissions.ts` define dois conjuntos:

| Constante | Widget | Permissão |
|---|---|---|
| `DASHBOARD_PERMISSIONS.statCards` | Seção de StatCards (grid inteiro) | `dashboard.indicadores.visualizar` |
| `DASHBOARD_PERMISSIONS.performanceChart` | Card "Desempenho" | `dashboard.desempenho.visualizar` |
| `DASHBOARD_PERMISSIONS.recentActivities` | Card "Atividades recentes" | `dashboard.atividades.visualizar` |
| `DASHBOARD_PERMISSIONS.todayAgenda` | Card "Agenda de Hoje" | `dashboard.agenda.visualizar` |
| `DASHBOARD_PERMISSIONS.notifications` | Card "Notificações" | `dashboard.notificacoes.visualizar` |
| `DASHBOARD_PERMISSIONS.topProducts` | "Top Produtos / Serviços" | `dashboard.top_produtos.visualizar` |
| `DASHBOARD_PERMISSIONS.financialSummary` | "Resumo financeiro" | `dashboard.financeiro.visualizar` |

| Constante | StatCard | Permissão |
|---|---|---|
| `STAT_CARD_PERMISSIONS.receitaDoMes` | Receita do Mês | `dashboard.indicadores.receita` |
| `STAT_CARD_PERMISSIONS.novosClientes` | Novos Clientes | `dashboard.indicadores.novos_clientes` |
| `STAT_CARD_PERMISSIONS.aulasAgendadas` | Aulas Agendadas | `dashboard.indicadores.aulas_agendadas` |
| `STAT_CARD_PERMISSIONS.conversoes` | Conversões | `dashboard.indicadores.conversoes` |

Cada StatCard mockado em `dashboard.mock.ts` carrega seu `requiredPermission` (um dos valores de `STAT_CARD_PERMISSIONS`); `StatCardsGrid` filtra a lista recebida antes de renderizar — um usuário pode ver "Novos Clientes" e "Aulas Agendadas" sem ver "Receita do Mês", mesmo tendo acesso à seção `statCards` como um todo.

### Como a checagem funciona
- `src/hooks/usePermission.ts`: hook que recebe uma permissão (ou lista) e retorna `boolean`, lendo `useSessionStore.permissions` — reavalia automaticamente a cada troca de conta.
- `src/components/ui/permission-gate/PermissionGate.tsx`: componente de guarda declarativo (`<PermissionGate permission={...}>...</PermissionGate>`) que envolve `usePermission` para os casos em que não é preciso decidir layout — só mostrar/ocultar um bloco isolado. É o padrão usado dentro de `StatCardsGrid` para cada StatCard individual.
- Em `DashboardPage.tsx`, as permissões de seção são lidas diretamente via `usePermission` (não via `PermissionGate`) porque o resultado também precisa alimentar o cálculo de layout do grid (ver abaixo) — usar `PermissionGate` ali exigiria checar a mesma permissão duas vezes (uma para renderizar, outra para decidir `col-span`).

### Como o grid se reorganiza sem buracos
- **StatCards:** `visibleStats` é a lista já filtrada por permissão; `StatCardsGrid` só recebe os itens visíveis e o CSS Grid (`grid-cols-4`) reacomoda sozinho — sem posições fixas por índice, não sobra espaço vazio onde um card foi ocultado.
- **Linha "Desempenho + Atividades recentes" e linha "Top Produtos + Resumo financeiro":** ambas usam o mesmo componente auxiliar `CollapsingTwoColRow` (interno a `DashboardPage.tsx`). Ele recebe `left`/`right` (cada um `ReactNode | false`) e decide: se os dois estão presentes, mantém `md:grid-cols-2`; se só um está presente, esse item ganha `md:col-span-2` (ocupa a linha toda); se nenhum está presente, a linha inteira retorna `null`.
- **Coluna principal vs. coluna lateral:** `showMainColumn` (verdadeiro se qualquer um entre Desempenho/Atividades/Top Produtos/Resumo financeiro for visível) e `showSidebarColumn` (Agenda ou Notificações) controlam `lg:col-span-2`/`lg:col-span-3`/ausência total de cada coluna — se só a lateral estiver visível, a coluna principal desaparece e a lateral ocupa o espaço; se nenhuma das duas, a `<div>` externa da linha nem é renderizada.
- **Seção inteira oculta:** cada `if (!left && !right) return null` (dentro de `CollapsingTwoColRow`) e os `{condição && <div>...}` em `DashboardPage` garantem que uma seção sem nenhum widget visível não deixa `<div>` vazia no DOM — não há whitespace/borda fantasma.
- **Zero widgets no dashboard inteiro:** `hasAnyWidgetVisible` (StatCards visíveis OU coluna principal OU coluna lateral) decide entre renderizar o dashboard normal ou um `EmptyState` (`components/ui/EmptyState`, Etapa 2) com o título "Nenhum item disponível" e a mensagem "Você não tem permissão para visualizar nenhum item deste dashboard nesta conta. Fale com o administrador da conta para solicitar acesso."

### Mock de contas usado para demonstrar
Estendido em `src/lib/mock-accounts.ts` (`mockMemberships`), reaproveitando as 5 contas da Etapa 3:

| Conta (mock) | Papel | Widgets visíveis |
|---|---|---|
| SoulInstrutor | Administrador | Todos os widgets e todos os StatCards |
| MadeCoders | Atendente | StatCards "Novos Clientes" e "Aulas Agendadas"; "Atividades recentes"; "Agenda de Hoje" — sem "Resumo financeiro" nem "Top Produtos" |
| Esporty Cup | Financeiro | StatCard "Receita do Mês"; "Resumo financeiro"; "Top Produtos / Serviços" — sem "Agenda de Hoje" nem "Notificações" |
| Esporty Arena | — | Nenhuma permissão de dashboard — usada para demonstrar o `EmptyState` |
| Esporty Academy | — | Nenhuma permissão de dashboard |

## 5. Referência visual usada

O print de referência mostrava um dashboard de painel administrativo ("Sua Marca — Painel de Controle", persona "Vicente Pires / Administrador") com:
- Cabeçalho com saudação, seletor de período (`23 - 29 de jul, 2025`) e botão "+ Ação rápida".
- 4 KPIs em cards (Receita do Mês, Novos Clientes, Aulas Agendadas, Conversões), cada um com ícone colorido e variação percentual verde.
- Gráfico de área roxo ("Desempenho") com tooltip mostrando valor + data, ao lado de "Atividades recentes" (lista com ícones coloridos por tipo).
- Coluna lateral direita com "Agenda de Hoje" (compromissos com pontinho verde de status) e "Notificações" (com pontinho vermelho de não lida).
- Linha final com "Top Produtos / Serviços" (tabela com barra de progresso sob cada produto) e "Resumo financeiro" (Receita/Despesas + bloco de Lucro líquido com sparkline).
- Rodapé com copyright.
- Reproduzido tanto em tema claro quanto escuro, com a sidebar/topbar da Etapa 3 ao redor.

## 6. Entregável verificado

- `npx tsc -b` sem erros de tipagem.
- `npm run lint` (oxlint) sem avisos novos além dos já aceitos (compound components da Etapa 2).
- Testado via Playwright headless em `/` (light e dark): todos os 8 cards renderizando com os dados mockados corretos, `Select` de período e dropdown "Ação rápida" abrindo normalmente, sparkline e gráfico de área renderizando nas cores certas em ambos os temas.
- Bug encontrado e corrigido durante a verificação: eixo Y do gráfico "Desempenho" cortava os ticks de 4 dígitos (mostrava `"00"` em vez de `"8000"`); corrigido com `tickFormatter` exibindo os valores em milhares (`2k`–`8k`), que também é mais fiel à referência visual.
- RBAC de dashboard testado trocando entre as 5 contas do mock: Administrador (todos os widgets), Atendente (2 StatCards + Atividades + Agenda, colunas colapsando sem buraco), Financeiro (1 StatCard + Top Produtos + Resumo financeiro, coluna lateral inteira ausente) e as duas contas sem permissão de dashboard (`EmptyState` renderizado). Nenhuma seção deixou espaço vazio/whitespace ao ocultar widgets.
- Sem erros de console/pageerror nas capturas.
