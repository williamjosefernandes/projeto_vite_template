# 06 — Arquitetura e Padrões

Documento estrutural e permanente — não pertence a nenhuma fase específica. Descreve como o código é organizado e as regras que qualquer código novo (de qualquer módulo futuro) deve seguir.

## 1. Estrutura de pastas

```
src/
├── components/
│   ├── ui/                # Design System puro — único lugar com estilo bruto (cor/espaçamento/raio)
│   │   └── <Componente>/
│   │       ├── <Componente>.tsx
│   │       └── index.ts   # barrel export da pasta
│   ├── layout/             # AppShell, Sidebar, Topbar, AccountSwitcherMenu, NotificationsPopover
│   └── charts/              # Wrappers do Recharts (AreaChartCard, LineChartCard, BarChartCard, DonutChartCard)
├── modules/
│   └── <nome-do-modulo>/    # Um módulo de negócio por pasta (ex.: dashboard, cadastros, financeiro)
│       ├── components/       # Componentes visuais específicos do módulo (compõem components/ui)
│       ├── hooks/             # Hooks de dados do módulo (ex.: useDashboardData)
│       ├── mocks/              # Dados mockados + os tipos que eles satisfazem
│       ├── <nome>.permissions.ts  # Permissões RBAC do módulo, se houver (opcional)
│       └── <Nome>Page.tsx      # Componente de página — só compõe, sem lógica própria
├── pages/                  # Páginas que não pertencem a um módulo de negócio (ex.: design-system, placeholder)
├── hooks/                  # Hooks compartilhados entre módulos (useTheme, usePermission, useVisibleMenu)
├── lib/                    # Funções puras e tokens compartilhados (cn, module-colors, chart-theme, mocks globais)
├── store/                  # Stores Zustand globais (useSessionStore, useSidebarStore)
├── routes/                 # Definição de rotas (react-router-dom)
├── types/                  # Tipos/interfaces compartilhados entre módulos (ex.: rbac.ts)
└── styles/
    └── globals.css          # @import "tailwindcss", @custom-variant dark, @theme
```

Ver [`04-design-tokens.md`](./04-design-tokens.md) para os tokens visuais e [`05-inventario-componentes.md`](./05-inventario-componentes.md) para o inventário completo do que já existe em `components/ui`, `components/charts` e `components/layout`.

## 2. Princípios de componentização

1. **`components/ui` é o único lugar com estilo bruto.** Nenhum componente de `modules/**`, `pages/**` ou `components/layout` usa classes de cor/espaçamento/raio "cruas" (`bg-violet-600`, `rounded-xl`, `p-6`...) fora daquilo que já vem embutido em um componente de `components/ui`. Se uma tela precisa de um visual que `components/ui` não oferece, o componente novo nasce em `components/ui`, não dentro do módulo que o motivou.
2. **Um componente por arquivo**, `PascalCase`, dentro de uma pasta própria (`components/ui/Button/Button.tsx`), com um `index.ts` de barrel export por pasta. O barrel agregador de tudo é `components/ui/index.ts` (idem `components/charts/index.ts`).
3. **`cva` (`class-variance-authority`) para variantes.** Qualquer componente com 2+ variantes visuais (tamanho, cor, estado) declara essas variantes via `cva`, não via `if`/template string manual — ver `Button`, `Badge`, `Typography` como referência.
4. **Compound components** (`Card.Header`, `Modal.Trigger`, `DropdownMenu.Item`...) para componentes com estrutura interna fixa — `Object.assign(Root, { Sub1, Sub2 })`. É o padrão de todos os wrappers de Radix UI em `components/ui`.
5. **Container vs. apresentacional.** Componentes de `modules/<nome>/components/` recebem dados prontos via props — nunca buscam, mockam ou formatam dados internamente. Essa lógica vive em `modules/<nome>/hooks/` (ex.: `useDashboardData`) e `modules/<nome>/mocks/`. A página (`<Nome>Page.tsx`) é fina: chama o hook de dados e distribui props, sem lógica visual própria.
6. **Tokens centralizados, nunca duplicados.** Cor por módulo de negócio → `src/lib/module-colors.ts`. Cor de gráfico (hex, exigido pelo Recharts) → `src/lib/chart-theme.ts`. Hierarquia tipográfica → componente `Typography`. Nunca reescrever essas classes manualmente em outro arquivo.

## 3. Convenção para novos módulos

Todo módulo novo (Cadastros, Financeiro, Comunicação, Operações, Marketing, Configurações, ou qualquer outro) segue a mesma forma:

```
src/modules/<nome-do-modulo>/
├── components/
│   ├── <Bloco1>.tsx
│   ├── <Bloco2>.tsx
│   └── ...
├── hooks/
│   └── use<NomeDoModulo>Data.ts
├── mocks/
│   └── <nome-do-modulo>.mock.ts
├── <nome-do-modulo>.permissions.ts   # se o módulo tiver blocos condicionados por RBAC (ver seção 4)
└── <NomeDoModulo>Page.tsx
```

- `<NomeDoModulo>Page.tsx` só importa de `components/`, chama `use<NomeDoModulo>Data()` e distribui as props — sem `className` de cor/espaçamento cru, sem `fetch`/mock inline.
- Cada componente em `components/` recebe seus dados via props tipadas (os tipos vêm de `mocks/<nome-do-modulo>.mock.ts`) e compõe a partir de `components/ui` (`Card`, `Table`, `Badge`, `StatCard`, etc. — ver inventário completo em `05-inventario-componentes.md`).
- Registrar a rota em `src/routes/router.tsx`, como filha de `AppShell` (ver `02-appshell-navegacao.md`), e o item de menu correspondente em `src/lib/menu-config.ts` com sua `requiredPermission`.

## 4. RBAC — proibição de UI condicionada sem `usePermission`/`PermissionGate`

Qualquer bloco de UI que deva variar por permissão (não só por rota inteira, mas por widget/ação dentro de uma página) usa exclusivamente:

- `usePermission(permission: string | string[]): boolean` (`src/hooks/usePermission.ts`) quando o resultado também precisa decidir layout (ex.: `col-span` dinâmico).
- `<PermissionGate permission={...}>` (`src/components/ui/permission-gate`) para condicionar um bloco isolado sem impacto em layout externo.

Nunca checar `useSessionStore.permissions.includes(...)` diretamente fora desses dois pontos de entrada. Ver `05-inventario-componentes.md` (seção "Arquitetura e RBAC") para o passo a passo completo de como declarar permissões de um módulo novo.

## 5. O que NÃO fazer

- Não criar um segundo lugar para tokens de cor por módulo — sempre `src/lib/module-colors.ts`.
- Não estilizar diretamente com hex em JSX/CSS fora de `src/lib/chart-theme.ts` (Recharts é a única exceção legítima, por exigir `string` em vez de classe Tailwind).
- Não duplicar a lista de contas/permissões mockadas — sempre `src/lib/mock-accounts.ts` (`mockAccounts`, `mockMemberships`).
- Não criar uma tabela `Table` genérica com sorting/paginação quando a referência visual pede uma tabela estática simples (ver `TopProductsTable` do Dashboard como exemplo do que fazer nesse caso: HTML puro, sem reaproveitar `components/ui/Table`).
- Não introduzir uma nova biblioteca de UI/gráfico/estado sem atualizar `00-setup-e-stack.md`.
