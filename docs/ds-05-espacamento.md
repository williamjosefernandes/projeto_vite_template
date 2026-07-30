# DS-05 — Menu "Espaçamento"

Documento estrutural e permanente. Espelho de consulta rápida da escala de espaçamento do projeto, para não "inventar" valores de `padding`/`gap`/`margin` fora da escala em telas futuras. Faz parte da série `docs/ds-*` (ver `docs/ds-00-estrutura-e-visao-geral.md`).

## Nota sobre nomenclatura

Como em `docs/ds-01-tokens.md`, os nomes `space-*`/`spacing-*` não são variáveis CSS reais do projeto — são a notação da escala padrão do Tailwind (`p-1` = `space-1` = 4px). Ao aplicar um valor desta tabela no código, use a classe Tailwind (`p-4`, `gap-6`, `mt-12`...), não um token `--space-*` que não existe.

## Escala de Espaçamentos

Base 8px (`space-2`), escala padrão do Tailwind v4 — 1 unidade = `0.25rem` = `4px`.

| Token | Rem | Px |
|---|---|---|
| `space-0` | 0rem | 0px |
| `space-1` | 0.25rem | 4px |
| `space-2` | 0.5rem | 8px |
| `space-3` | 0.75rem | 12px |
| `space-4` | 1rem | 16px |
| `space-5` | 1.25rem | 20px |
| `space-6` | 1.5rem | 24px |
| `space-8` | 2rem | 32px |
| `space-10` | 2.5rem | 40px |
| `space-12` | 3rem | 48px |
| `space-16` | 4rem | 64px |
| `space-20` | 5rem | 80px |
| `space-24` | 6rem | 96px |
| `space-32` | 8rem | 128px |

## Espaçamentos semânticos (quando usar cada um)

| Token | Valor | Uso |
|---|---|---|
| `spacing-xs` | 4px (`space-1`) | Ajustes mínimos (ex.: gap entre ícone e texto muito próximos) |
| `spacing-sm` | 8px (`space-2`) | Elementos próximos (ex.: entre botões de uma mesma ação) |
| `spacing-md` | 16px (`space-4`) | Padrão da interface (ex.: entre inputs de um formulário) |
| `spacing-lg` | 24px (`space-6`) | Seções e cards (padding interno de `Card`, gap entre cards de um grid) |
| `spacing-xl` | 32px (`space-8`) | Blocos grandes |
| `spacing-2xl` | 48px (`space-12`) | Separações de página (entre seções de uma página) |

Correspondência com o uso real já documentado em `docs/04-design-tokens.md` §5: `p-6` (padding de `Card`) = `spacing-lg`; `gap-3` (ícone+label) ≈ `spacing-sm`/`spacing-md`; `space-y-4` (lista de card) = `spacing-md`.

## Espaçamentos de layout do AppShell

Fixos, não fazem parte da escala reaproveitável (ver `docs/04-design-tokens.md` §6): largura da sidebar 280px (expandida)/80px (recolhida), altura da topbar 64px. O card "Espaçamentos no Layout" desta página ilustra a sidebar com o valor real (280px).

## Componentes novos criados nesta etapa

| Componente | Caminho | Props principais |
|---|---|---|
| **SpacingBar** | `components/ui/spacing-bar` | `px: number`, `maxPx: number` (normaliza a largura da barra) |

Adicionado a `docs/05-inventario-componentes.md`.
