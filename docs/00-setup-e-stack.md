# 00 — Setup e Stack

## 1. Objetivo desta fase

Criar a base técnica do projeto **portal-app**: Vite + React + TypeScript, Tailwind CSS com suporte a dark mode via classe, tipografia Inter, e a estrutura de pastas que vai receber o Design System (Etapa 2), o AppShell (Etapa 3) e o módulo de Dashboard (Etapa 4).

Nenhuma tela, página ou componente visual foi criado nesta etapa — apenas infraestrutura.

### Desvio de versão registrado: Tailwind CSS v4

A receita original desta etapa foi escrita para **Tailwind CSS v3** (`tailwind.config.js` com `darkMode`/`content`, `npx tailwindcss init -p`, diretivas `@tailwind base/components/utilities`). O `npm install` trouxe **Tailwind CSS v4.3.3** (versão atual da lib), que muda o modelo de configuração para CSS-first. Após alinhamento com o usuário, decidiu-se manter a v4 e adaptar a configuração, preservando o mesmo resultado funcional pedido (dark mode via classe `.dark`, paleta padrão do Tailwind, fonte Inter como `font-sans`). Diferenças práticas:

- Não existe mais `tailwind.config.js` — configuração de tema vive em CSS, dentro de um bloco `@theme` em `src/styles/globals.css`.
- Não há `content: [...]` — o v4 varre o projeto automaticamente (respeitando `.gitignore`).
- `darkMode: 'class'` foi substituído por `@custom-variant dark (&:where(.dark, .dark *));`, que faz o prefixo `dark:` reagir à classe `.dark` num elemento ancestral (em vez do padrão `prefers-color-scheme`).
- O plugin PostCSS passou a ser `@tailwindcss/postcss` (em vez de `tailwindcss` direto). `autoprefixer` foi instalado (conforme pedido) mas não é referenciado no `postcss.config.js`, pois o v4 já faz prefixação de vendor internamente via Lightning CSS — mantê-lo no pipeline seria redundante.

## 2. Dependências instaladas

### Base do projeto
| Pacote | Versão | Para que serve |
|---|---|---|
| `vite` | `8.1.5` (fixado) | Bundler/dev server |
| `react`, `react-dom` | `^19.2.8` | Biblioteca de UI |
| `typescript` | `~6.0.2` | Tipagem estática |
| `@vitejs/plugin-react` | `^6.0.4` | Suporte a JSX/Fast Refresh no Vite |
| `oxlint` | `^1.75.0` | Linter (script `npm run lint`) |

### Estilo
| Pacote | Para que serve |
|---|---|
| `tailwindcss` | Framework de utilitários CSS (v4, CSS-first) |
| `@tailwindcss/postcss` | Plugin PostCSS do Tailwind v4 |
| `postcss` | Processador CSS usado pelo Vite |
| `autoprefixer` | Instalado conforme solicitado; não usado no pipeline do v4 (prefixação já é feita internamente) |
| `@fontsource/inter` | Fonte Inter self-hosted (pesos 400/500/600/700), sem depender de CDN externo |
| `clsx` | Composição condicional de classes CSS |
| `tailwind-merge` | Resolve conflitos entre classes Tailwind (usado dentro de `cn()`) |
| `class-variance-authority` | Define variantes de componentes do Design System (`cva`) |

### Roteamento e estado
| Pacote | Para que serve |
|---|---|
| `react-router-dom` | Roteamento client-side |
| `zustand` | Estado global leve (stores em `src/store` e `src/auth/stores`) |
| `@tanstack/react-query` | Data fetching, cache e sincronização com o servidor |
| `axios` | Cliente HTTP — instância única em `src/api/http.ts` (interceptors de Authorization e refresh automático em 401). Adicionado na etapa de autenticação (`docs/08-autenticacao.md`); nenhum outro arquivo deve chamar `axios` diretamente. |

### Formulários
| Pacote | Para que serve |
|---|---|
| `react-hook-form` | Gerenciamento de formulários |
| `zod` | Validação de esquemas |
| `@hookform/resolvers` | Integração entre `react-hook-form` e `zod` |

### Dados e visualização
| Pacote | Para que serve |
|---|---|
| `recharts` | Gráficos (wrappers ficam em `src/components/charts`) |
| `@tanstack/react-table` | Tabelas de dados avançadas (ordenação, paginação, filtros) |
| `date-fns` | Manipulação/formatação de datas |

### UI e interação
| Pacote | Para que serve |
|---|---|
| `lucide-react` | Ícones outline monocromáticos |
| `framer-motion` | Animações sutis de UI |
| `sonner` | Toasts/notificações |
| `@radix-ui/react-dialog` | Modal acessível headless |
| `@radix-ui/react-dropdown-menu` | Menu suspenso acessível headless |
| `@radix-ui/react-tooltip` | Tooltip acessível headless |
| `@radix-ui/react-avatar` | Avatar acessível headless |
| `@radix-ui/react-tabs` | Abas acessíveis headless |
| `@radix-ui/react-select` | Select acessível headless |
| `@radix-ui/react-switch` | Switch/toggle acessível headless |
| `@radix-ui/react-popover` | Popover acessível headless |
| `@radix-ui/react-scroll-area` | Área de rolagem estilizável e acessível |

> **Nota de auditoria:** `npm audit` reporta 2 vulnerabilidades "high" em `react-router`/`react-router-dom`, referentes a um bypass de CSRF no **RSC Mode** (React Server Components). Este projeto é um SPA client-side puro, sem RSC, portanto a vulnerabilidade não se aplica ao uso atual. Não foi feito downgrade forçado (`npm audit fix --force` rebaixaria para uma major anterior, `7.11.0`, uma mudança incompatível e desnecessária aqui).

## 3. Dark mode: como funciona

1. **`src/hooks/useTheme.ts`** expõe `{ theme, toggleTheme }`.
   - Na inicialização, lê `localStorage.getItem('theme')`. Se não houver valor salvo, usa `window.matchMedia('(prefers-color-scheme: dark)')` como fallback.
   - Um `useEffect` aplica o tema toda vez que ele muda: adiciona/remove a classe `dark` em `document.documentElement` (a tag `<html>`) e persiste o valor em `localStorage`.
   - `toggleTheme()` alterna entre `'light'` e `'dark'`. O botão de sol/lua que vai chamar essa função será criado na Etapa 3 — o hook já está pronto para ser consumido.
2. **`src/styles/globals.css`** redefine a variante `dark:` do Tailwind v4 com `@custom-variant dark (&:where(.dark, .dark *));`, fazendo com que qualquer utilitário `dark:*` só se aplique quando o elemento (ou um ancestral) tiver a classe `.dark` — em vez do comportamento padrão do v4, que segue `prefers-color-scheme`.
3. Para testar manualmente: rodar `npm run dev`, abrir o DevTools e alternar a classe `dark` na tag `<html>` — os utilitários `dark:bg-*`, `dark:text-*` etc. devem responder imediatamente.

## 4. Estrutura de pastas criada

```
src/
├── components/
│   ├── ui/           # Design System puro (Etapa 2) — único lugar com estilo bruto (cores/espaçamento)
│   ├── layout/        # AppShell, Sidebar, Topbar (Etapa 3)
│   └── charts/        # Wrappers do Recharts (Etapa 2)
├── modules/
│   └── dashboard/      # Página de Dashboard e sua lógica (Etapa 4)
├── pages/              # Componentes de página/rota
├── hooks/
│   └── useTheme.ts     # Hook de tema claro/escuro (pronto, sem UI ainda)
├── lib/
│   ├── utils.ts         # Função cn() (clsx + tailwind-merge)
│   └── query-client.ts  # Instância do QueryClient (react-query)
├── store/               # Stores Zustand
├── routes/              # Definição de rotas (react-router-dom)
├── types/               # Tipos e interfaces compartilhados
└── styles/
    └── globals.css       # @import "tailwindcss", @custom-variant dark, @theme (font-sans Inter)
```

Pastas ainda vazias receberam um arquivo `.gitkeep` para serem versionadas no Git.

## 5. Princípios de arquitetura (registrados para as próximas etapas — nada disso foi implementado ainda)

- `components/ui` é o único lugar com estilo bruto do Design System. Componentes de módulo (`modules/**`) nunca usam classes de cor/espaçamento cruas — sempre compõem a partir de `Card`, `Button`, `Badge`, `Table` etc.
- Um componente por arquivo, `PascalCase`, com `index.ts` de barrel export por pasta.
- Props complexas/variantes em `*.types.ts` separado do `.tsx`.
- Componentes com mais de 2 variantes visuais usam `class-variance-authority` (`cva`).
- Container vs. apresentacional: busca/mock de dados em hooks, nunca dentro do componente visual.

## 6. Paleta de cores (referência para as próximas etapas)

Cores padrão do Tailwind, sem paleta customizada. Primária do produto: roxo/violeta (`violet-*`).

| Papel | Light | Dark |
|---|---|---|
| Fundo geral | `bg-gray-50` | `bg-gray-950` |
| Superfície (sidebar/topbar/cards) | `bg-white` | `bg-gray-900` |
| Bordas/divisores | `border-gray-200` | `border-gray-800` |
| Texto principal | `text-gray-900` | `text-gray-100` |
| Texto secundário | `text-gray-500` | `text-gray-400` |
| Texto muted/caption | `text-gray-400` | `text-gray-500` |
| Primária (destaque/ativo) | `text-violet-700` / `bg-violet-50` | `text-violet-400` / `bg-violet-900/30` |
| Botão primário (CTA) | `bg-violet-600 hover:bg-violet-700 text-white` | igual |
| Positivo | `text-green-600` / `bg-green-100` | `text-green-400` / `bg-green-900/30` |
| Negativo | `text-red-600` / `bg-red-100` | `text-red-400` / `bg-red-900/30` |
| Alerta | `text-amber-600` / `bg-amber-100` | `text-amber-400` / `bg-amber-900/30` |

## 7. Entregável verificado

- `npm run dev` sobe sem erros (Vite 8.1.5, testado na porta 5183).
- `npx tsc -b --noEmit` sem erros de tipagem.
- CSS gerado confirmado via inspeção do bundle: `@custom-variant dark` produz seletores `:where(.dark, .dark *)` e `--font-sans` resolve para `'Inter', ui-sans-serif, system-ui, ...`.
- Estrutura de pastas criada conforme especificação.
