# DS-01 — Menu "Tokens"

Documento estrutural e permanente. Espelho organizado dos tokens exibidos na página `/design-system/tokens`. Faz parte da série `docs/ds-*` (ver `docs/ds-00-estrutura-e-visao-geral.md`).

## Nota sobre nomenclatura

O print de referência usado para este menu mostrava variáveis CSS nomeadas (`--space-4`, `--text-xs`, `--shadow-md`, `--z-modal`, `--border-dashed`, fonte `JetBrains Mono`, opacidades e z-index nomeados). **Este projeto não define essas variáveis** — usa Tailwind CSS v4 com a escala padrão do framework, sem `@theme` customizado além da fonte Inter (ver `src/styles/globals.css`). Não há fonte monoespaçada instalada.

Por isso, a página "Tokens" replica o **layout e as seções** do print, mas com os **tokens reais do projeto**: nomes de classe Tailwind (`p-4`, `text-xs`, `shadow-md`, `rounded-lg`...) em vez de variáveis `--custom`. Nenhum valor foi inventado — todos vêm da escala padrão do Tailwind v4 (`tailwindcss@4.3`). Z-Index e Opacidade não têm uma escala nomeada formalizada no código hoje; a tabela documenta o uso convencional observado em `components/ui` (`Modal`, `Popover`, `Tooltip`, `DropdownMenu`, `Toast`).

## 1. Cores

Ver `docs/04-design-tokens.md` §1–§3 para a tabela completa com valores hex e uso por papel. Nesta página os swatches mostram apenas amostras representativas (não a escala completa) de:

- **Primárias**: `violet-{50,100,300,400,600,700,800,900}`
- **Semânticas**: Sucesso (`green-600`), Informativo (`blue-600`), Aviso (`amber-500`), Erro (`red-600`), Neutro (`gray-400`), Indigo (`indigo-500`), Roxo (`purple-500`), Rosa (`pink-500`)
- **Neutras**: `gray-{0(white),50,100,200,400,500,600,700,800,900,950}`

## 2. Tipografia

| Token | Família | Peso | Tamanho | Altura de linha |
|---|---|---|---|---|
| `--font-sans` | Inter | 400 | — | — |
| `text-xs` | Inter | 400 | 12px | 16px |
| `text-sm` | Inter | 400 | 14px | 20px |
| `text-base` | Inter | 400 | 16px | 24px |
| `text-lg` | Inter | 500 | 18px | 28px |
| `text-xl` | Inter | 600 | 20px | 28px |
| `text-2xl` | Inter | 600 | 24px | 32px |
| `text-3xl` | Inter | 700 | 30px | 36px |
| `text-4xl` | Inter | 700 | 36px | 40px |

Pesos exibidos refletem o uso real do `Typography` (`components/ui/Typography`), não a variação completa disponível na fonte.

## 3. Espaçamento

Escala padrão do Tailwind (`1` unidade = `0.25rem` = `4px`).

| Token | Rem | Px |
|---|---|---|
| `p-0` / `gap-0` | 0 | 0px |
| `p-1` / `gap-1` | 0.25rem | 4px |
| `p-2` / `gap-2` | 0.5rem | 8px |
| `p-3` / `gap-3` | 0.75rem | 12px |
| `p-4` / `gap-4` | 1rem | 16px |
| `p-6` / `gap-6` | 1.5rem | 24px |
| `p-8` / `gap-8` | 2rem | 32px |
| `p-10` / `gap-10` | 2.5rem | 40px |
| `p-12` / `gap-12` | 3rem | 48px |
| `p-16` / `gap-16` | 4rem | 64px |

## 4. Raios (Border Radius)

| Token | Rem | Px |
|---|---|---|
| `rounded-none` | 0 | 0px |
| `rounded-sm` | 0.125rem | 2px |
| `rounded` | 0.25rem | 4px |
| `rounded-md` | 0.375rem | 6px |
| `rounded-lg` | 0.5rem | 8px |
| `rounded-xl` | 0.75rem | 12px |
| `rounded-2xl` | 1rem | 16px |
| `rounded-full` | 9999px | 9999px |

## 5. Sombras (Box Shadow)

`shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-inner` — valores padrão do Tailwind v4, sem customização. Uso documentado em `docs/04-design-tokens.md` §5 (`shadow-sm` para `Card`, `shadow-md`/`shadow-lg` para elementos flutuantes).

## 6. Bordas (Border)

| Token | Valor |
|---|---|
| `border-0` | 0px |
| `border` | 1px solid |
| `border-2` | 2px solid |
| `border-4` | 4px solid |
| `border-dashed` | 1px dashed |
| `border-dotted` | 1px dotted |

## 7. Z-Index

Não há escala formalizada em código — convenção observada nos componentes de sobreposição:

| Token | Uso | Valor |
|---|---|---|
| `z-0` | Base | 0 |
| `z-10` | Elementos elevados (sticky headers) | 10 |
| `z-20` | Sidebar / Topbar | 20 |
| `z-30` | Dropdown / Select / Popover | 30 |
| `z-40` | Tooltip | 40 |
| `z-50` | Modal / Dialog / Toast | 50 |

## 8. Opacidade

`opacity-0`, `opacity-25`, `opacity-50`, `opacity-75`, `opacity-90`, `opacity-100` — valores padrão do Tailwind.

## 9. Componentes novos criados nesta etapa

| Componente | Caminho | Props principais |
|---|---|---|
| **CodeBlock** | `components/ui/code-block` | `language: string` (badge no canto: CSS/JS/TS/JSON), `code: string`. Fundo escuro fixo (`bg-gray-900`), independente do tema da aplicação — como um editor de código. |

Adicionado a `docs/05-inventario-componentes.md`.
