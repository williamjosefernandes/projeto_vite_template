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

## 4. Referência visual usada

O print de referência mostrava um dashboard de painel administrativo ("Sua Marca — Painel de Controle", persona "Vicente Pires / Administrador") com:
- Cabeçalho com saudação, seletor de período (`23 - 29 de jul, 2025`) e botão "+ Ação rápida".
- 4 KPIs em cards (Receita do Mês, Novos Clientes, Aulas Agendadas, Conversões), cada um com ícone colorido e variação percentual verde.
- Gráfico de área roxo ("Desempenho") com tooltip mostrando valor + data, ao lado de "Atividades recentes" (lista com ícones coloridos por tipo).
- Coluna lateral direita com "Agenda de Hoje" (compromissos com pontinho verde de status) e "Notificações" (com pontinho vermelho de não lida).
- Linha final com "Top Produtos / Serviços" (tabela com barra de progresso sob cada produto) e "Resumo financeiro" (Receita/Despesas + bloco de Lucro líquido com sparkline).
- Rodapé com copyright.
- Reproduzido tanto em tema claro quanto escuro, com a sidebar/topbar da Etapa 3 ao redor.

## 5. Entregável verificado

- `npx tsc -b` sem erros de tipagem.
- `npm run lint` (oxlint) sem avisos novos além dos já aceitos (compound components da Etapa 2).
- Testado via Playwright headless em `/` (light e dark): todos os 8 cards renderizando com os dados mockados corretos, `Select` de período e dropdown "Ação rápida" abrindo normalmente, sparkline e gráfico de área renderizando nas cores certas em ambos os temas.
- Bug encontrado e corrigido durante a verificação: eixo Y do gráfico "Desempenho" cortava os ticks de 4 dígitos (mostrava `"00"` em vez de `"8000"`); corrigido com `tickFormatter` exibindo os valores em milhares (`2k`–`8k`), que também é mais fiel à referência visual.
- Sem erros de console/pageerror nas capturas.
