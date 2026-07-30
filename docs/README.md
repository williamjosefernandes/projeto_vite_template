# Sua Marca — Painel de Controle (portal-app)

Portal administrativo multi-tenant (SPA) com Sidebar/Topbar, troca de contas, permissões (RBAC) por menu e por widget, e módulos de negócio compostos a partir de um Design System próprio.

## Stack

| Camada | Tecnologia |
|---|---|
| Build/dev server | Vite 8 |
| UI | React 19 + TypeScript |
| Estilo | Tailwind CSS v4 (CSS-first, dark mode via classe `.dark`) |
| Componentes headless/acessíveis | Radix UI (`react-dialog`, `react-dropdown-menu`, `react-tooltip`, `react-avatar`, `react-tabs`, `react-select`, `react-switch`, `react-popover`, `react-scroll-area`) |
| Variantes de componente | `class-variance-authority` (cva) + `clsx` + `tailwind-merge` |
| Gráficos | Recharts |
| Tabelas de dados | `@tanstack/react-table` |
| Roteamento | React Router (`react-router-dom`) |
| Estado global | Zustand (com `persist` em `localStorage`) |
| Data fetching (preparado, não usado ainda) | `@tanstack/react-query` |
| Formulários (preparado, não usado ainda) | `react-hook-form` + `zod` |
| Ícones | `lucide-react` |
| Toasts | `sonner` |
| Animações | `framer-motion` |
| Datas | `date-fns` |
| Fonte | Inter (`@fontsource/inter`, self-hosted) |

Ver [`00-setup-e-stack.md`](./00-setup-e-stack.md) para o detalhamento completo de cada dependência e as decisões tomadas na configuração inicial (ex.: adaptação para Tailwind v4).

## Como rodar

```bash
npm install
npm run dev
```

Outros scripts:
```bash
npm run build     # tsc -b && vite build
npm run lint       # oxlint
npm run preview    # serve o build de produção localmente
```

## Documentação

| Documento | Conteúdo |
|---|---|
| [`00-setup-e-stack.md`](./00-setup-e-stack.md) | Setup do projeto, dependências instaladas, dark mode, estrutura de pastas inicial |
| [`01-design-system.md`](./01-design-system.md) | Histórico da criação dos componentes base (`components/ui`) e wrappers de gráfico |
| [`02-appshell-navegacao.md`](./02-appshell-navegacao.md) | Sidebar, Topbar, menu de troca de contas, RBAC do menu, tema |
| [`03-pagina-dashboard.md`](./03-pagina-dashboard.md) | Página de Dashboard, dados mockados, RBAC por widget |
| [`04-design-tokens.md`](./04-design-tokens.md) | **Fonte única da verdade** dos tokens visuais (cor, tipografia, espaçamento, raio) |
| [`05-inventario-componentes.md`](./05-inventario-componentes.md) | **Inventário vivo** de todos os componentes de `components/ui`, `components/charts`, `components/layout` + utilitários de RBAC |
| [`06-arquitetura.md`](./06-arquitetura.md) | Estrutura de pastas, princípios de componentização, convenção para módulos novos |
| [`07-como-criar-pagina-a-partir-de-print.md`](./07-como-criar-pagina-a-partir-de-print.md) | Guia passo a passo para pedir um módulo novo a partir de uma imagem de referência |
| [`ds-00-estrutura-e-visao-geral.md`](./ds-00-estrutura-e-visao-geral.md) | Documentação viva do Design System (`/design-system`): estrutura da sidebar/topbar próprias, roteamento interno, página "Visão Geral" — **fonte visual de referência interna** do projeto |
| [`ds-01-tokens.md`](./ds-01-tokens.md) | Página "Tokens" — espelho organizado de cor/tipografia/espaçamento/raio/sombra/borda/z-index/opacidade, mapeados para a escala real do Tailwind (não variáveis CSS nomeadas) |
| [`ds-02-cores.md`](./ds-02-cores.md) | Página "Cores" — paleta completa com hex reais (primária, semânticas, neutras, apoio, gradientes, gráficos) e pares de contraste WCAG 2.1 calculados |
| [`ds-03-tipografia.md`](./ds-03-tipografia.md) | Página "Tipografia" — escala tipográfica real do componente `Typography` (5 níveis: h1/h2/body/caption/kpi) |
| [`ds-04-icones.md`](./ds-04-icones.md) | Página "Ícones" — catálogo de ícones `lucide-react` já em uso, por categoria, convenção de tamanho e `strokeWidth` |
| [`ds-05-espacamento.md`](./ds-05-espacamento.md) | Página "Espaçamento" — escala completa (`space-0`–`space-32`) e espaçamentos semânticos (quando usar cada um) |

Os documentos `04`, `05`, `06`, `07` e a série `ds-*` são **estruturais e permanentes** — não pertencem a uma fase específica e devem ser mantidos atualizados conforme o código evolui. Os documentos `00`–`03` (e os que vierem depois, um por módulo) são **registros de fase**: descrevem o que foi decidido e entregue em cada etapa, e não mudam retroativamente.

## Fases

| Fase | Objetivo | Documento | Status |
|---|---|---|---|
| Fase 0 — Setup | Projeto Vite, dependências, Tailwind, dark mode | [`00-setup-e-stack.md`](./00-setup-e-stack.md) | ✅ concluída |
| Fase 1 — Design System | Tokens + componentes base (`components/ui`) | [`01-design-system.md`](./01-design-system.md) | ✅ concluída |
| Fase 2 — AppShell | Sidebar, Topbar, menu de contas, permissões | [`02-appshell-navegacao.md`](./02-appshell-navegacao.md) | ✅ concluída |
| Fase 3 — Dashboard | Página de Dashboard com dados mockados e RBAC por widget | [`03-pagina-dashboard.md`](./03-pagina-dashboard.md) | ✅ concluída |
| Fase 4+ — Módulos futuros | Cada novo módulo/página a partir de um print anexado (Cadastros, Financeiro, Comunicação, Operações, Marketing, Configurações...) | um novo `docs/0N-<nome-do-modulo>.md` por módulo | ⏳ pendente |

Para pedir um módulo novo: anexe o print de referência e peça para seguir [`07-como-criar-pagina-a-partir-de-print.md`](./07-como-criar-pagina-a-partir-de-print.md).
