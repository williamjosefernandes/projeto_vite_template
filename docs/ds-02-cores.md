# DS-02 — Menu "Cores"

Documento estrutural e permanente. Espelho de consulta rápida da paleta completa do projeto, com os hex reais resolvidos do Tailwind CSS v4 (`tailwindcss@4.3`, paleta default — sem `@theme` de cor customizado, ver `docs/04-design-tokens.md`). Faz parte da série `docs/ds-*` (ver `docs/ds-00-estrutura-e-visao-geral.md`).

## Como os hex foram obtidos

Tailwind v4 define cores em `oklch()`, não hex. Os valores abaixo foram resolvidos renderizando cada classe num browser real e lendo o `backgroundColor` computado via Canvas 2D (conversão `oklch → sRGB` feita pelo próprio motor de renderização, não estimada manualmente). Nenhum valor foi digitado de memória ou copiado do print de referência.

## 1. Escala Primária (Roxo — `violet`)

| Tom | Hex |
|---|---|
| 50 | `#F5F3FF` |
| 100 | `#EDE9FE` |
| 200 | `#DDD6FF` |
| 300 | `#C4B4FF` |
| 400 | `#A684FF` |
| 500 | `#8E51FF` |
| **600** | **`#7F22FE`** — cor principal padrão (ações primárias, links, elementos em destaque) |
| 700 | `#7008E7` |
| 800 | `#5D0EC0` |
| 900 | `#4D179A` |

## 2. Cores Semânticas

| Semântica | 50 | 100 | 200 | 300 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|
| Sucesso (`green`) | `#F0FDF4` | `#DBFCE7` | `#B9F8CF` | `#7BF1A8` | `#00A63E` | `#008236` | `#016630` | `#0D542B` |
| Informativo (`blue`) | `#EFF6FF` | `#DBEAFE` | `#BEDBFF` | `#8EC5FF` | `#155DFC` | `#1447E6` | `#193CB8` | `#1C398E` |
| Aviso (`amber`) | `#FFFBEB` | `#FEF3C6` | `#FEE685` | `#FFD230` | `#E17100` | `#BB4D00` | `#973C00` | `#7B3306` |
| Erro (`red`) | `#FEF2F2` | `#FFE2E2` | `#FFC9C9` | `#FFA2A2` | `#E7000B` | `#C10007` | `#9F0712` | `#82181A` |
| Neutro (`gray`) | `#F9FAFB` | `#F3F4F6` | `#E5E7EB` | `#D1D5DC` | `#4A5565` | `#364153` | `#1E2939` | `#101828` |

Uso por papel (ex.: `bg-green-100`/`text-green-700` para badges) documentado em `docs/04-design-tokens.md` §2.

## 3. Cores Neutras (Cinza — `gray`)

| Tom | Hex |
|---|---|
| 50 | `#F9FAFB` |
| 100 | `#F3F4F6` |
| 200 | `#E5E7EB` |
| 300 | `#D1D5DC` |
| 400 | `#99A1AF` |
| 500 | `#6A7282` |
| 600 | `#4A5565` |
| 700 | `#364153` |
| 800 | `#1E2939` |
| 900 | `#101828` |
| 950 | `#030712` |

## 4. Cores de Apoio (Brand / Complementares)

| Nome | Classe | Hex |
|---|---|---|
| Azul | `blue-600` | `#155DFC` |
| Ciano | `cyan-500` | `#00B8DB` |
| Teal | `teal-500` | `#00BBA7` |
| Verde | `green-600` | `#00A63E` |
| Âmbar | `amber-600` | `#E17100` |
| Laranja | `orange-500` | `#FF6900` |
| Rosa | `pink-500` | `#F6339A` |
| Índigo | `indigo-500` | `#615FFF` |

Estas cores não têm uso funcional definido no código hoje (não aparecem em `moduleColors` nem em componentes) — são a paleta de apoio disponível para uso futuro (ex.: gráficos, categorização visual).

## 5. Gradientes

| Nome | De | Para | Classe |
|---|---|---|---|
| Roxo | `#7F22FE` (violet-600) | `#F6339A` (pink-500) | `bg-gradient-to-r from-violet-600 to-pink-500` |
| Azul | `#155DFC` (blue-600) | `#00B8DB` (cyan-500) | `bg-gradient-to-r from-blue-600 to-cyan-500` |
| Verde | `#00A63E` (green-600) | `#7BF1A8` (green-300) | `bg-gradient-to-r from-green-600 to-green-300` |

Nenhum gradiente é usado hoje em `components/ui`/`components/layout` — apresentados aqui como opção disponível dentro da paleta do projeto.

## 6. Cores para Gráficos

Paleta real de `chartColors.categorical` (`src/lib/chart-theme.ts`), usada em gráficos categóricos (ex.: `DonutChartCard`):

`#7C3AED`, `#A78BFA`, `#9CA3AF`, `#D1D5DB`, `#6B7280`, `#4B5563` (6 cores — o print de referência mostrava 10, mas a paleta real do projeto tem 6).

## 7. Transparências

Exemplo com a cor primária (`violet-600`) em `opacity-{5,10,20,30,40,50,60,90}` — classes padrão do Tailwind (`opacity-*`), sem token nomeado adicional.

## 8. Acessibilidade — contraste WCAG 2.1

Razões de contraste calculadas com a fórmula oficial WCAG 2.1 (luminância relativa, `(L1+0.05)/(L2+0.05)`) a partir dos hex reais acima — nenhum valor foi estimado.

**Aprovados (AA, ≥ 4.5:1)** — todos sobre fundo `Neutro 50` (`#F9FAFB`, o `bg-gray-50` usado como fundo geral da aplicação):

| Texto | Hex | Contraste |
|---|---|---|
| Roxo 600 | `#7F22FE` | 5.64:1 |
| Roxo 700 | `#7008E7` | 6.98:1 |
| Neutro 900 | `#101828` | 16.98:1 |
| Neutro 700 | `#364153` | 9.86:1 |
| Sucesso 700 | `#008236` | 4.73:1 |

**Reprovados (Fail, < 4.5:1)** — mesmo fundo:

| Texto | Hex | Contraste |
|---|---|---|
| Roxo 300 | `#C4B4FF` | 1.78:1 |
| Neutro 300 | `#D1D5DC` | 1.41:1 |
| Neutro 400 | `#99A1AF` | 2.49:1 |
| Aviso 300 | `#FFD230` | 1.38:1 |

**Implicação prática:** nunca use `violet-300`/`amber-300` ou tons de cinza abaixo de `gray-700` como cor de texto sobre fundo claro — reserve tons claros (`50`–`400`) para fundos/backgrounds, não para texto. `Sucesso 600` (`#00A63E`, 3.08:1) também reprova AA para texto normal — use `Sucesso 700` quando o verde for a cor do texto (ex.: link ou label), e reserve `600` para ícones/backgrounds onde o texto ao lado já é `gray-900`.

## 9. Componentes novos criados nesta etapa

| Componente | Caminho | Props principais |
|---|---|---|
| **ColorSwatch** | `components/ui/color-swatch` | `color: string` (classe Tailwind `bg-*` ou cor CSS), `label?`, `hex?`, `size?: 'sm'\|'md'\|'lg'`, `shape?: 'square'\|'circle'` |

Adicionado a `docs/05-inventario-componentes.md`.
