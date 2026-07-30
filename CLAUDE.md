# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é este projeto

**portal-app** — um portal administrativo multi-tenant (SPA) com Sidebar/Topbar, troca de contas, permissões (RBAC) por menu e por widget, e módulos de negócio compostos a partir de um Design System próprio. Toda a documentação viva do projeto está em `docs/` — leia-a antes do código-fonte quando precisar de contexto arquitetural (ver seção "Documentação" abaixo).

## Comandos

```bash
npm run dev       # servidor de dev (Vite)
npm run build     # tsc -b && vite build — checagem de tipos + build de produção
npm run lint      # oxlint
npm run preview   # serve o build de produção localmente
```

Não há suíte de testes configurada neste projeto. Validação de uma alteração = `npx tsc -b` sem erros + `npm run lint` sem erros novos + verificação visual manual (light e dark) via `npm run dev`.

## Documentação — leia antes de codificar

A pasta `docs/` é a fonte primária de verdade arquitetural, **mais confiável que inferir pela leitura do código**. Documentos-chave, por ordem de relevância para qualquer tarefa nova:

| Documento | Quando consultar |
|---|---|
| `docs/06-arquitetura.md` | Sempre — estrutura de pastas, princípios de componentização, convenção de módulo novo |
| `docs/04-design-tokens.md` | Antes de usar qualquer cor/espaçamento/raio — fonte única da verdade dos tokens |
| `docs/05-inventario-componentes.md` | Antes de criar um componente novo — inventário vivo de tudo que já existe em `components/ui`, `components/charts`, `components/layout` |
| `docs/07-como-criar-pagina-a-partir-de-print.md` | Ao construir uma página/módulo novo a partir de uma imagem de referência — checklist passo a passo |
| `docs/02-appshell-navegacao.md` | RBAC de menu, AppShell, troca de contas, tema |
| `docs/00-setup-e-stack.md` | Decisões de setup (ex.: por que Tailwind v4 e não v3) |
| série `docs/ds-*` | Documentação viva da rota `/design-system` (ver seção própria abaixo) |

Os documentos `04`, `05`, `06`, `07` e a série `ds-*` são **estruturais e permanentes** — devem ser mantidos atualizados conforme o código evolui. Os documentos `00`–`03` (e futuros `0N-<módulo>.md`) são **registros de fase**: descrevem o que foi decidido/entregue em cada etapa e não mudam retroativamente.

## Stack

| Camada | Tecnologia |
|---|---|
| Build/dev server | Vite 8 |
| UI | React 19 + TypeScript |
| Estilo | Tailwind CSS **v4** (CSS-first — sem `tailwind.config.js`; tema vive em `@theme` dentro de `src/styles/globals.css`) |
| Componentes headless/acessíveis | Radix UI (dialog, dropdown-menu, tooltip, avatar, tabs, select, switch, popover, scroll-area, checkbox, radio-group) |
| Variantes de componente | `class-variance-authority` (cva) + `clsx` + `tailwind-merge` (via `cn()` em `src/lib/utils.ts`) |
| Gráficos | Recharts (wrappers em `src/components/charts`) |
| Tabelas de dados | `@tanstack/react-table` |
| Roteamento | React Router (`react-router-dom`) |
| Estado global | Zustand com `persist` em `localStorage` (`src/store`) |
| Data fetching | `@tanstack/react-query` (dependência instalada, ainda não usada em nenhum módulo) |
| Formulários | `react-hook-form` + `zod` (instalado, ainda não usado) |
| Ícones | `lucide-react` |
| Toasts | `sonner` |

Dark mode é via classe `.dark` em `<html>` (não `prefers-color-scheme`), controlado por `src/hooks/useTheme.ts` e a diretiva `@custom-variant dark (&:where(.dark, .dark *));` em `globals.css`.

## Arquitetura

```
src/
├── components/
│   ├── ui/          # Design System puro — ÚNICO lugar com estilo bruto (cor/espaçamento/raio)
│   ├── layout/        # AppShell, Sidebar, Topbar, AccountSwitcherMenu, NotificationsPopover, DesignSystemSidebar
│   └── charts/         # Wrappers do Recharts (AreaChartCard, LineChartCard, BarChartCard, DonutChartCard)
├── modules/
│   └── <nome-do-modulo>/   # Um módulo de negócio por pasta (ex.: dashboard)
│       ├── components/       # Componentes visuais do módulo — recebem dados via props, sem lógica própria
│       ├── hooks/              # use<Modulo>Data — busca/mock de dados
│       ├── mocks/               # Dados mockados + tipos
│       ├── <nome>.permissions.ts  # RBAC do módulo, se houver
│       └── <Nome>Page.tsx       # Componente de página — só compõe
├── pages/            # Páginas fora de um módulo de negócio (design-system, placeholder)
├── hooks/             # Hooks compartilhados (useTheme, usePermission, useVisibleMenu)
├── lib/                # Funções puras e tokens compartilhados (cn, module-colors, chart-theme, menu-config, mock-accounts)
├── store/              # Stores Zustand globais (useSessionStore, useSidebarStore)
├── routes/             # router.tsx (react-router-dom)
├── types/              # Tipos compartilhados (rbac.ts)
└── styles/globals.css   # @import "tailwindcss", @custom-variant dark, @theme
```

### Princípios de componentização (não negociáveis)

1. **`components/ui` é o único lugar com estilo bruto.** Nenhum código em `modules/**`, `pages/**` ou `components/layout` usa classes de cor/espaçamento/raio cruas (`bg-violet-600`, `rounded-xl`, `p-6`...) fora do que já vem embutido num componente de `components/ui`. Se uma tela precisa de um visual que não existe lá, o componente nasce em `components/ui`, não dentro do módulo que o motivou.
2. **Um componente por arquivo**, `PascalCase`, em pasta própria com `index.ts` de barrel export. Barrel agregador geral: `components/ui/index.ts` (idem `components/charts/index.ts`).
3. **`cva` para variantes.** Qualquer componente com 2+ variantes visuais usa `class-variance-authority`, não `if`/template string manual (ver `Button`, `Badge`, `Typography`).
4. **Compound components** (`Card.Header`, `Modal.Trigger`, `DropdownMenu.Item`) via `Object.assign(Root, { Sub1, Sub2 })` — padrão de todos os wrappers Radix.
5. **Container vs. apresentacional.** Componentes de `modules/<nome>/components/` só recebem dados prontos via props — nunca buscam/mockam/formatam dados internamente. Isso vive em `modules/<nome>/hooks/` e `modules/<nome>/mocks/`. A `<Nome>Page.tsx` é fina: chama o hook e distribui props.
6. **Tokens centralizados, nunca duplicados.** Cor por módulo de negócio → `src/lib/module-colors.ts`. Cor de gráfico (hex, exigido pelo Recharts) → `src/lib/chart-theme.ts`. Hierarquia tipográfica → sempre componente `Typography`, nunca classes de fonte cruas.
7. **Tabela estática simples** (sem sorting/paginação/busca) → HTML puro dentro de `Card` (ver `TopProductsTable`). Não force o `Table` genérico (`@tanstack/react-table`) nesse caso.
8. **Nunca introduzir uma nova biblioteca de UI/gráfico/estado sem atualizar `docs/00-setup-e-stack.md`.**

### Convenção para módulo novo

```
src/modules/<nome-do-modulo>/
├── components/<Bloco>.tsx        # um arquivo por bloco visual
├── hooks/use<NomeDoModulo>Data.ts
├── mocks/<nome-do-modulo>.mock.ts
├── <nome-do-modulo>.permissions.ts   # se houver blocos condicionados por RBAC
└── <NomeDoModulo>Page.tsx
```

Depois: registrar a rota em `src/routes/router.tsx` (filha de `AppShell`) e o item de menu em `src/lib/menu-config.ts` com sua `requiredPermission`.

Ao construir uma página nova a partir de um print de referência, siga literalmente `docs/07-como-criar-pagina-a-partir-de-print.md` (mapear cada bloco visual para um componente existente antes de criar um novo; atualizar `05-inventario-componentes.md`/`04-design-tokens.md`/`README.md` de docs ao final; criar `docs/0N-<nome-do-modulo>.md` registrando a fase).

### RBAC

- `Permission` é string livre (ex.: `"financeiro.receitas"`), definida em `src/types/rbac.ts`.
- `src/lib/menu-config.ts` é a lista estática (`MenuGroup[]`) de todo o menu possível do produto — não depende de permissões de conta.
- `src/lib/mock-accounts.ts` define `mockAccounts` e `mockMemberships` (permissões por conta).
- `useSessionStore` (Zustand, persistido) guarda `accounts`, `activeAccountId`, `permissions` já resolvidas; `switchAccount(id)` atualiza ambos. Só `activeAccountId` é persistido — `permissions` é sempre recalculado no rehydrate.
- `useVisibleMenu()` filtra `menuConfig` pelas `permissions` da conta ativa; grupos sem itens visíveis somem da sidebar.
- **Nunca** checar `useSessionStore.permissions.includes(...)` diretamente fora dos dois pontos de entrada: `usePermission(permission)` (quando o resultado afeta layout, ex. `col-span` dinâmico) e `<PermissionGate permission={...}>` (para condicionar um bloco isolado). Ver `docs/05-inventario-componentes.md` §RBAC para o passo a passo de declarar permissões de um módulo novo.
- Trate sempre o caso de zero itens visíveis com `EmptyState`.

### `/design-system` — importante não confundir com o portal

A rota `/design-system` é a documentação viva/visual interna do Design System — casca própria (`DesignSystemLayout` + `DesignSystemSidebar`), **fora** do `AppShell`/`Sidebar` do portal, sem RBAC. Usa `src/lib/ds-menu-config.ts` (não `menu-config.ts`) para seu próprio menu — os dois arquivos são intencionalmente separados: um item novo de produto vai em `menuConfig`, um item novo de documentação vai em `dsMenuGroups`. Cada página de conteúdo em `src/pages/design-system/pages/` só implementa o corpo — título/subtítulo (H1 + descrição) vêm automaticamente do `dsMenuItems` correspondente, lido pelo `DesignSystemLayout` via `useLocation`. Menus ainda não implementados caem em `DesignSystemComingSoonPage`.

`/design-system` é a **fonte visual de referência interna** do projeto: antes de inventar um estilo novo em qualquer tela do portal, confira contra ela (cores, tipografia, espaçamento, raios, sombras, componentes em destaque). Se faltar algo, o fluxo correto é: criar o componente/token em `components/ui`/tokens → documentar em `docs/05-inventario-componentes.md`/`docs/04-design-tokens.md` → só então adicionar à página de documentação correspondente (nunca ao contrário).

## O que NÃO fazer

- Não criar um segundo lugar para tokens de cor por módulo — sempre `src/lib/module-colors.ts`.
- Não estilizar com hex cru em JSX/CSS fora de `src/lib/chart-theme.ts` (Recharts é a única exceção legítima, por exigir `string` em vez de classe Tailwind).
- Não duplicar a lista de contas/permissões mockadas — sempre `src/lib/mock-accounts.ts`.
- Não forçar um `Table` genérico com sorting/paginação quando o print pede uma tabela estática simples.
- Não checar permissões fora de `usePermission`/`PermissionGate`.
- Não misturar `menu-config.ts` (produto, com RBAC) e `ds-menu-config.ts` (documentação, sem RBAC).
