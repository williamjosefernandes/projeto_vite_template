# 02 — AppShell e Navegação

## 1. Objetivo desta fase

Construir a casca de três níveis do portal — Sidebar, Topbar e área de conteúdo — junto com o menu de troca de contas (multi-tenant), o toggle de tema e o filtro de menu por permissões (RBAC). A área de conteúdo ainda é um placeholder por rota; o Dashboard real chega na Etapa 4.

Esta etapa compõe exclusivamente a partir do que foi documentado em [`docs/01-design-system.md`](./01-design-system.md) (Button, DropdownMenu, Popover, Tooltip, Avatar) — nenhum estilo novo foi inventado fora dos tokens já existentes.

## 2. Componentes criados

### AppShell
- **Caminho:** `src/components/layout/AppShell.tsx`
- **O que é:** grid de três níveis (`grid-rows-[64px_1fr]`, colunas `280px_1fr` expandido / `80px_1fr` recolhido) que renderiza `Sidebar` + `Topbar` + `<Outlet />` do react-router. Envolve tudo em `Tooltip.Provider` (montado uma única vez aqui, não em `main.tsx`).
- **Comportamento:** se a rota atual não estiver na lista de rotas visíveis para a conta ativa (ex.: após trocar de conta para uma com menos permissões), redireciona (`<Navigate replace>`) para a primeira rota visível do novo menu.
- **Usado em:** `src/routes/router.tsx`, como elemento pai de todas as rotas do portal (exceto `/design-system`).

### Sidebar
- **Caminho:** `src/components/layout/Sidebar.tsx`
- **Props:** nenhuma — lê `useSidebarStore` (colapso), `useVisibleMenu` (itens filtrados) e `useSessionStore` (dados do usuário) diretamente.
- **Estrutura:** cabeçalho (logo + nome do produto), grupo "Navegação" (itens fixos via `NavLink`), grupo "Módulos" (itens colapsáveis com badge de cor por módulo, sub-itens recuados `pl-12`), rodapé (Central de Ajuda + card do usuário que abre o `AccountSwitcherMenu`).
- **Colapsada** (80px): mostra só ícones; cada item usa `Tooltip` para exibir o label ao passar o mouse.
- **Scroll:** a lista de itens usa a classe utilitária `.sidebar-scroll` (barra fina, definida em `src/styles/globals.css`).

### Topbar
- **Caminho:** `src/components/layout/Topbar.tsx`
- **Estrutura, da esquerda para a direita:** botão hamburguer (`PanelLeft`, alterna `useSidebarStore.toggleCollapsed`) · busca global (`rounded-full`, apenas visual — sem lógica de busca real) · toggle de tema · `NotificationsPopover` · botão de ajuda · trigger do `AccountSwitcherMenu` (avatar + nome + cargo).

### AccountSwitcherMenu
- **Caminho:** `src/components/layout/AccountSwitcherMenu.tsx`
- **Props:** `trigger: ReactNode` (o elemento clicável que abre o menu), `align?: 'start' | 'end' | 'center'` (padrão `end`), `side?: 'top' | 'bottom'` (padrão `bottom`).
- **Por que um componente único:** é o mesmo `DropdownMenu` usado tanto pelo avatar da Topbar (`side="bottom"`, ancorado para baixo) quanto pelo card de usuário no rodapé da Sidebar (`side="top"`, ancorado para cima — já que fica na base da tela). Evita duplicar a lista de contas/ações em dois lugares.
- **Conteúdo:** lista das primeiras 5 contas de `useSessionStore.accounts` (com check na conta ativa), link "Ver todas as contas (N)" se houver mais, ações de conta (Meu perfil, Configurações, Preferências, Segurança) e de produto (Atalhos, Novidades, Central de ajuda), e "Sair". Selecionar uma conta chama `switchAccount(accountId)`.

### NotificationsPopover
- **Caminho:** `src/components/layout/NotificationsPopover.tsx`
- **O que é:** `Popover` (wrapper de `components/ui/Popover`) com uma lista mockada de 4 notificações (ícone colorido + título + descrição + tempo relativo). O badge vermelho no sino mostra a contagem. Sem lógica real de leitura/dispensa nesta etapa.

### PlaceholderPage / DashboardPage
- **Caminho:** `src/pages/placeholder/PlaceholderPage.tsx` (genérica, recebe `title`) e `src/modules/dashboard/DashboardPage.tsx` (específica da rota `/`).
- **O que é:** área de conteúdo vazia com borda tracejada, só para demonstrar que o `<Outlet />` do `AppShell` está funcionando. Serão substituídas pelo conteúdo real de cada módulo nas próximas etapas.

### Avatar (novo componente de `components/ui`)
Ver seção 4 — foi adicionado ao Design System porque é reutilizável fora do AppShell (qualquer lugar que precise mostrar usuário/conta).

## 3. RBAC — como funciona o filtro de menu

### Tipos (`src/types/rbac.ts`)
`Permission` é uma string livre (ex.: `"financeiro.receitas"`). `MenuItem` tem `requiredPermission: Permission`; `MenuGroup` agrupa itens e marca se é `collapsible` (grupo "Módulos") ou não (grupo "Navegação").

### Configuração do menu (`src/lib/menu-config.ts`)
Lista estática de `MenuGroup[]` — a fonte única de verdade de rotas, ícones e labels do menu. Não depende de permissões da conta; é o "menu completo possível".

### Dados mockados (`src/lib/mock-accounts.ts`)
- `mockAccounts`: 5 contas (SoulInstrutor, MadeCoders, Esporty Cup, Esporty Arena, Esporty Academy), cada uma com ícone e cor próprios.
- `mockMemberships`: para cada conta, a lista de `permissions` que ela concede. As 5 contas têm recortes propositalmente diferentes (a SoulInstrutor tem acesso total; a Esporty Academy só enxerga Dashboard + Calendário) para demonstrar o filtro na prática.

### Sessão (`src/store/useSessionStore.ts`)
Store zustand com `accounts`, `activeAccountId` e `permissions` (já resolvidas para a conta ativa). `switchAccount(accountId)` atualiza os dois de uma vez. Persistido em `localStorage` (chave `session-store`) — apenas `activeAccountId` é persistido; `permissions` é sempre recalculado a partir dele (`onRehydrateStorage`), para nunca dessincronizar caso `mockMemberships` mude.

### Filtro (`src/hooks/useVisibleMenu.ts`)
```ts
function useVisibleMenu(): MenuGroup[] {
  const permissions = useSessionStore((s) => s.permissions);
  return menuConfig
    .map((group) => ({ ...group, items: group.items.filter((item) => permissions.includes(item.requiredPermission)) }))
    .filter((group) => group.items.length > 0);
}
```
Grupos sem nenhum item visível somem por completo da sidebar (ex.: conta sem nenhuma permissão de Financeiro não mostra o grupo "Financeiro"). Como é um hook reativo ao store, trocar de conta re-renderiza a sidebar automaticamente — sem reload de página.

### Redirecionamento pós-troca
`AppShell` compara `location.pathname` com a lista de paths visíveis (`useVisibleMenu()` achatado). Se a rota atual não estiver mais visível, redireciona para a primeira rota do novo menu.

### Como adicionar uma permissão / item de menu novo
1. Adicione o item ao grupo correspondente em `src/lib/menu-config.ts` (ícone, label, `path`, `requiredPermission`).
2. Se for uma rota real, registre-a em `src/routes/router.tsx` (hoje as rotas ainda não listadas em `menuConfig` caem no `PlaceholderPage` gerado automaticamente a partir de `menuConfig`).
3. Inclua a nova `requiredPermission` em `mockMemberships` (em `src/lib/mock-accounts.ts`) para cada conta que deve enxergá-la. Em produção, isso viria de uma API de sessão — a mecânica de filtro (`useVisibleMenu`) não muda.

## 4. Tema — como o toggle da Topbar se conecta ao `useTheme()`

`useTheme()` (`src/hooks/useTheme.ts`, criado na Etapa 1) já existia antes desta fase — só foi conectado à UI aqui. A Topbar chama `const { theme, toggleTheme } = useTheme()` e renderiza um botão circular ghost: ícone `Moon` quando `theme === 'light'` (indica "trocar para escuro"), ícone `Sun` quando `theme === 'dark'`. O hook aplica a classe `.dark` em `<html>` e persiste a escolha em `localStorage` (chave `theme`) — o Tailwind v4 está configurado (`src/styles/globals.css`) para reagir a essa classe em vez da media query do sistema.

## 5. Novo store — `useSidebarStore`

- **Caminho:** `src/store/useSidebarStore.ts`
- **Estado:** `collapsed: boolean`, `toggleCollapsed()`. Persistido em `localStorage` (chave `sidebar-store`) para lembrar a preferência entre sessões.
- **Consumido por:** `AppShell` (larguras do grid), `Sidebar` (renderização colapsada/expandida), `Topbar` (botão hamburguer).

## 6. Rotas

`src/routes/router.tsx` gera as rotas filhas de `AppShell` a partir de `menuConfig`: `/` renderiza `DashboardPage`, todos os demais `path` de `menuConfig` renderizam `PlaceholderPage` com o `label` do item como título. `/design-system` continua fora do `AppShell`, como rota solta temporária (ver Etapa 2).

## 7. Entregável verificado

- `npx tsc -b` sem erros de tipagem.
- `npm run lint` (oxlint) sem erros novos — os avisos de `react/only-export-components` são os mesmos já aceitos na Etapa 2 (compound components), incluindo o novo `Avatar`.
- Testado via Playwright headless (light e dark): sidebar expandida/recolhida, tema claro/escuro, `AccountSwitcherMenu` aberto tanto pelo avatar da Topbar quanto pelo card do rodapé da Sidebar, `NotificationsPopover`, expansão de grupo de módulo (sub-itens `pl-12`).
- Filtro RBAC confirmado na prática: trocar para a conta "Esporty Academy" reduz a sidebar a apenas "Dashboard" e "Calendário" (grupo "Módulos" some por completo), sem reload de página.
- Sem erros de console/pageerror nas capturas.
