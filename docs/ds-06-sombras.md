# DS-06 — Menu "Sombras"

Documento estrutural e permanente. Escala de elevação do projeto e mapeamento elevação → componente típico. Faz parte da série `docs/ds-*` (ver `docs/ds-00-estrutura-e-visao-geral.md`).

## Escala de sombras (valores reais do Tailwind v4)

| Token | Descrição | `box-shadow` |
|---|---|---|
| `shadow-none` | Nenhuma sombra | `none` |
| `shadow-xs` | Sombra extra sutil | `0 1px 2px 0 rgba(0,0,0,0.05)` |
| `shadow-sm` | Sombra sutil | `0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)` |
| `shadow-md` | Sombra média | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` |
| `shadow-lg` | Sombra grande | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` |
| `shadow-xl` | Sombra extra grande | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` |
| `shadow-2xl` | Sombra máxima | `0 25px 50px -12px rgba(0,0,0,0.25)` |
| `shadow-inner` | Sombra interna (foco/pressed) | `inset 0 2px 4px 0 rgba(0,0,0,0.05)` |

Valores extraídos do `box-shadow` computado real (renderizado num browser), não estimados.

## Mapeamento elevação → componente

| Elevação | Token | Componente típico |
|---|---|---|
| Elevado 1 | `shadow-sm` | Card de conteúdo (`Card`) |
| Elevado 2 | `shadow-md` | Dropdown (`DropdownMenu`, `Select.Content`) |
| Elevado 3 | `shadow-lg` | Modal (`Modal.Content`) |
| Elevado 4 | `shadow-xl` | Popover |
| Elevado 5 | `shadow-2xl` | Tooltip |

Nota: o uso real em `components/ui` hoje é mais simples que essa escala de 5 níveis — `Card` usa `shadow-sm`, elementos flutuantes (dropdown/popover/tooltip/modal) usam `shadow-md`/`shadow-lg` (ver `docs/04-design-tokens.md` §5). A tabela acima é a convenção-alvo para diferenciar melhor os níveis de flutuação à medida que novos componentes forem criados.

## Cor base

Todas as sombras neutras usam preto com opacidade variável (`rgba(0,0,0,α)`), não a cor `gray-900` (`#101828`) do projeto — é o comportamento padrão do Tailwind, mantido sem customização.

## Sombras coloridas (uso especial)

Não existem no Tailwind padrão — criadas como classes CSS customizadas em `src/styles/globals.css`, usando as mesmas cores semânticas 600 já documentadas em `docs/04-design-tokens.md` §2:

| Classe | Cor base | Valor |
|---|---|---|
| `.shadow-primary` | `violet-600` (`#7F22FE`) | `0 10px 30px -10px rgb(127 34 254 / 0.25)` |
| `.shadow-success` | `green-600` (`#00A63E`) | `0 10px 30px -10px rgb(0 166 62 / 0.2)` |
| `.shadow-warning` | `amber-600` (`#E17100`) | `0 10px 30px -10px rgb(225 113 0 / 0.2)` |
| `.shadow-danger` | `red-600` (`#E7000B`) | `0 10px 30px -10px rgb(231 0 11 / 0.2)` |
| `.shadow-info` | `blue-600` (`#155DFC`) | `0 10px 30px -10px rgb(21 93 252 / 0.2)` |

**Uso restrito**: apenas em estados de destaque/feedback pontual (ex.: card de alerta em hover), nunca como sombra padrão de superfície.

## Sombras internas (inset)

`inset-sm` (`inset 0 1px 2px 0 rgba(0,0,0,0.06)`) e `inset-md` (`inset 0 2px 4px 0 rgba(0,0,0,0.08)`) — aplicadas via arbitrary value do Tailwind (`shadow-[inset_...]`), para foco interno de inputs. Não há classe utilitária nomeada para essas no Tailwind padrão.

## Nota de implementação — contraste no dark mode

Sombras neutras (pretas) ficam invisíveis contra superfícies escuras (`bg-gray-900`/`bg-gray-950`). Por isso, todo swatch de demonstração de sombra nesta página (`ShadowSwatch` e os exemplos inline) usa **fundo branco fixo**, independente do tema — o mesmo princípio já aplicado ao `CodeBlock` (`docs/ds-01-tokens.md`). Ao aplicar sombra num componente real do produto, isso não se aplica: cards em dark mode continuam com `bg-gray-900` e dependem mais de borda (`border-gray-800`) do que de sombra para se destacar do fundo.

## Componentes novos criados nesta etapa

| Componente | Caminho | Props principais |
|---|---|---|
| **ShadowSwatch** | `components/ui/shadow-swatch` | `shadowClassName: string`, `label: string`, `description?: string`, `value?: string` |

Adicionado a `docs/05-inventario-componentes.md`.
