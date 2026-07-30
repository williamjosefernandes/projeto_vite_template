# DS-03 — Menu "Tipografia"

Documento estrutural e permanente. Espelho de consulta rápida da escala tipográfica do projeto. Faz parte da série `docs/ds-*` (ver `docs/ds-00-estrutura-e-visao-geral.md`).

## Nota sobre a escala

O print de referência usado para este menu descrevia uma hierarquia de 9 níveis (H1 32px, H2 24px, H3 20px, H4 18px, Body 1/2/3, Caption, Overline). **O componente `Typography` deste projeto (`src/components/ui/Typography`) só implementa 5 variantes**, com valores próprios — não uma subdivisão dos 9 níveis do print. Esta página documenta os 5 níveis reais, mesmo princípio já aplicado em `docs/ds-01-tokens.md` e `docs/ds-02-cores.md`: a documentação reflete o componente que os outros módulos do portal de fato usam, não inventa uma escala paralela.

## Escala tipográfica (fonte: `Typography.tsx`)

| Token | Família | Peso | Tamanho | Altura de linha | Tag padrão |
|---|---|---|---|---|---|
| `h1` | Inter | 600 (Semibold) | 24px | 32px (1.33) | `<h1>` |
| `h2` | Inter | 600 (Semibold) | 16px | 24px (1.5) | `<h2>` |
| `body` (padrão) | Inter | 400 (Regular) | 14px | 20px (1.43) | `<p>` |
| `caption` | Inter | 400 (Regular) | 12px | 16px (1.33) | `<span>` |
| `kpi` | Inter | 600 (Semibold) | 24px | 32px (1.33) | `<p>` |

Uso: sempre via `<Typography variant="...">`, nunca repetindo as classes manualmente (ver `docs/04-design-tokens.md` §4).

## Pesos disponíveis

400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold) — via `@fontsource/inter`. O peso 500 não é usado por nenhuma variante de `Typography` hoje, mas está disponível na fonte instalada.

## Estilos de texto por papel

| Papel | Classe | Uso |
|---|---|---|
| Texto primário | `text-gray-900 dark:text-gray-100` | Maioria dos conteúdos e informações |
| Texto secundário | `text-gray-600 dark:text-gray-300` | Informações de apoio, menor ênfase |
| Texto desabilitado | `text-gray-400 dark:text-gray-600` | Conteúdos inativos/indisponíveis |
| Texto em destaque | `text-violet-700 dark:text-violet-400` | Links, CTAs, elementos interativos |

## Componentes novos criados nesta etapa

Nenhum — página construída inteiramente com `Card` e classes Tailwind já documentadas em `docs/04-design-tokens.md` §4.
