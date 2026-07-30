# DS-10 — Menu "Layout"

Documento estrutural e permanente. Blocos estruturais reutilizáveis de composição de página — não são a mesma instância do `AppShell` real do portal, mas os padrões que ele (e futuras telas) devem seguir. Faz parte da série `docs/ds-*` (ver `docs/ds-00-estrutura-e-visao-geral.md`).

## Quando usar cada bloco

| Bloco | Caminho | Quando usar |
|---|---|---|
| **Container** | `components/ui/layout-primitives` | Envelope de página: largura máxima + padding horizontal consistente. Já é o padrão usado nas páginas de conteúdo do portal (`max-w-6xl`). |
| **Grid** | `components/ui/layout-primitives` | Grades regulares (`cols`: 1/2/3/4/6/12) com `gap` padronizado. Combine com `col-span-*` do Tailwind nos filhos. |
| **Stack** | `components/ui/layout-primitives` | Listas verticais espaçadas uniformemente — prefira a `space-y-*` manual quando o espaçamento precisa ser consistente e nomeado. |
| **Flex** | `components/ui/layout-primitives` | Alinhamento horizontal com controle fino de `justify`/`align`/`gap`/`wrap` via props, sem escrever classes soltas. |
| **Spacer** | `components/ui/layout-primitives` | Empurra irmãos para as extremidades dentro de um flex container (`flex-1` nomeado). |
| **Divider** | `components/ui/layout-primitives` | Linha divisória horizontal/vertical, `solid`/`dashed`/`dotted`. |
| **ScrollArea** | `components/ui/ScrollArea` | Área com barra de rolagem customizada (wrapper `@radix-ui/react-scroll-area`) — use em vez de `overflow-y-auto` puro quando a barra nativa do OS destoar visualmente. |
| **ResizablePanel** | `components/ui/resizable-panel` | Dois painéis redimensionáveis via arraste (ex.: editor + preview). Implementação própria com `pointermove`, sem dependência externa. |
| **SplitPane** | `components/ui/resizable-panel` | Composição de `ResizablePanel` para o caso comum menu lateral fino + conteúdo. |

## Props principais

```tsx
<Grid cols={12} gap="md">...</Grid>
<Stack gap="sm" align="stretch">...</Stack>
<Flex justify="between" align="center" gap="sm" wrap>...</Flex>
<Divider variant="dashed" orientation="horizontal" />
<ScrollArea className="h-64"><div className="p-3">...</div></ScrollArea>
<ResizablePanel direction="horizontal" first={<A />} second={<B />} defaultSize={50} minSize={15} maxSize={85} />
<SplitPane sidebar={<Menu />} content={<Content />} defaultSidebarSize={25} />
```

## Componentes novos criados nesta etapa

| Componente | Caminho | Props principais |
|---|---|---|
| **Container** | `components/ui/layout-primitives` | Props nativas de `<div>` |
| **Grid** | `components/ui/layout-primitives` | `cols?: 1\|2\|3\|4\|6\|12` (padrão 12), `gap?: 'sm'\|'md'\|'lg'` |
| **Stack** | `components/ui/layout-primitives` | `gap?: 'xs'\|'sm'\|'md'\|'lg'\|'xl'`, `align?: 'start'\|'center'\|'end'\|'stretch'` |
| **Flex** | `components/ui/layout-primitives` | `direction?`, `justify?`, `align?`, `gap?`, `wrap?: boolean` |
| **Spacer** | `components/ui/layout-primitives` | Props nativas de `<div>` |
| **Divider** | `components/ui/layout-primitives` | `variant?: 'solid'\|'dashed'\|'dotted'`, `orientation?: 'horizontal'\|'vertical'` |
| **ScrollArea** | `components/ui/ScrollArea` | Props do `ScrollAreaPrimitive.Root` + `viewportClassName?` |
| **ResizablePanel** | `components/ui/resizable-panel` | `first`, `second: ReactNode`, `direction?`, `defaultSize?`, `minSize?`, `maxSize?` |
| **SplitPane** | `components/ui/resizable-panel` | `sidebar`, `content: ReactNode`, `defaultSidebarSize?` |

Adicionados a `docs/05-inventario-componentes.md`.
