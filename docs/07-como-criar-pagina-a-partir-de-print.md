# 07 — Como criar uma página a partir de um print

Guia reutilizável para qualquer módulo futuro (Cadastros, Financeiro, Comunicação, Operações, Marketing, Configurações, ou qualquer outro). Quando um novo prompt vier com uma imagem de referência anexada pedindo uma página/tela nova, siga este checklist na ordem.

## Passo a passo

### 1. Ler os documentos estruturais antes de escrever qualquer código
- [`04-design-tokens.md`](./04-design-tokens.md) — cores, tipografia, espaçamento, raio de borda.
- [`05-inventario-componentes.md`](./05-inventario-componentes.md) — todos os componentes de `components/ui`, `components/charts` e `components/layout` já disponíveis.
- [`06-arquitetura.md`](./06-arquitetura.md) — estrutura de pastas e princípios de componentização.

Isso é suficiente para entender o que já existe — não é necessário reler o código-fonte inteiro nem os prompts das etapas anteriores.

### 2. Mapear cada bloco visual do print para um componente existente
Percorra a imagem bloco por bloco (cabeçalho, KPIs, tabela, gráfico, lista, formulário...) e, para cada um, procure primeiro em `05-inventario-componentes.md`:
- Card de indicador numérico → `StatCard`.
- Tabela de dados com sorting/paginação/busca → `Table`.
- Tabela estática simples (sem interação) → HTML puro dentro de `Card` (ver `TopProductsTable` do Dashboard como referência) — **não** force o `Table` genérico nesse caso.
- Gráfico → `AreaChartCard`/`LineChartCard`/`BarChartCard`/`DonutChartCard`. Se o card precisar de um elemento extra no header (ex.: `Select` de período) que o wrapper não expõe, replique a lógica com Recharts + `useChartTheme()` diretamente (ver `PerformanceCard` do Dashboard).
- Rótulo colorido de status → `Badge`.
- Lista vazia/sem dados → `EmptyState`.
- Texto/título/rótulo → sempre `Typography`, nunca classes de fonte cruas.
- Menu de ações, seletor, popover, modal, tooltip, switch, avatar → os wrappers Radix já existentes (`DropdownMenu`, `Select`, `Popover`, `Modal`, `Tooltip`, `Switch`, `Avatar`).

**Só crie um componente novo em `components/ui` se não houver equivalente** — e, quando criar, siga o mesmo padrão dos demais (pasta própria + `index.ts`, `cva` se tiver variantes, sem estilo cru fora dele) e registre-o em `05-inventario-componentes.md` ao final.

### 3. Seguir a convenção de pastas para o novo módulo/página
Conforme `06-arquitetura.md` §3:
```
src/modules/<nome-do-modulo>/
├── components/       # um arquivo por bloco visual do print
├── hooks/
│   └── use<NomeDoModulo>Data.ts
├── mocks/
│   └── <nome-do-modulo>.mock.ts
├── <nome-do-modulo>.permissions.ts   # se algum bloco variar por permissão
└── <NomeDoModulo>Page.tsx            # só compõe — sem lógica/estilo próprio
```
Registre a rota em `src/routes/router.tsx` (filha de `AppShell`) e o item de menu em `src/lib/menu-config.ts` com sua `requiredPermission`.

### 4. Nunca usar cor ou espaçamento fora dos tokens
Toda cor, raio de borda, sombra e espaçamento usados devem vir de `04-design-tokens.md` (ou, transitivamente, de um componente de `components/ui` que já os embute). Se o print mostrar uma cor de módulo que ainda não existe em `moduleColors`, adicione-a lá — não escreva a classe hex/Tailwind solta no componente do módulo.

### 5. Se o módulo tiver blocos condicionados por permissão (RBAC)
Siga a convenção de `05-inventario-componentes.md` §4: declare `<nome-do-modulo>.permissions.ts`, use `PermissionGate`/`usePermission`, trate grids multi-coluna com um componente que colapsa `col-span` (não CSS fixo por posição), e cubra o caso de zero itens visíveis com `EmptyState`. Estenda `mockMemberships` (`src/lib/mock-accounts.ts`) para pelo menos uma conta demonstrar o recorte.

### 6. Testar visualmente antes de reportar como concluído
Suba o dev server e confira a página em light e em dark, comparando lado a lado com o print de referência. Rode `npx tsc -b` e `npm run lint` sem erros novos.

### 7. Atualizar a documentação ao terminar
- Se algum componente novo foi criado em `components/ui`/`components/charts`/`components/layout`: adicione a linha correspondente em [`05-inventario-componentes.md`](./05-inventario-componentes.md).
- Se algum token novo foi criado (cor de módulo, etc.): adicione em [`04-design-tokens.md`](./04-design-tokens.md).
- Atualize [`README.md`](./README.md): adicione a nova linha na tabela de fases, com status `✅ concluída` e o link para o novo documento.
- Crie `docs/0N-<nome-do-modulo>.md` (próximo número disponível) seguindo o mesmo formato dos documentos de fase já existentes (`01`–`03`):
  1. Objetivo desta fase.
  2. Componentes criados (caminho, props principais, comportamento) — só o que é específico deste módulo; não repita o que já está em `05-inventario-componentes.md`.
  3. Decisões de design tomadas (ex.: por que um wrapper genérico não foi usado nalgum bloco).
  4. Se houver RBAC no módulo: seção "Permissões por widget" nos mesmos moldes de `03-pagina-dashboard.md` §4.
  5. Descrição da imagem de referência usada (para quem for reproduzir uma tela parecida depois, sem acesso à imagem original).
  6. Como estender (ex.: como trocar mocks por dados reais).
  7. Entregável verificado (tsc/lint/teste visual).

## Checklist resumido

- [ ] Li `04-design-tokens.md`, `05-inventario-componentes.md`, `06-arquitetura.md`.
- [ ] Mapeei cada bloco do print para um componente existente (ou justifiquei a criação de um novo).
- [ ] Segui a estrutura de pastas `modules/<nome>/{components,hooks,mocks}` + `<Nome>Page.tsx`.
- [ ] Não usei cor/espaçamento fora dos tokens documentados.
- [ ] Tratei RBAC (se aplicável) com `PermissionGate`/`usePermission` + `EmptyState` para zero itens.
- [ ] Testei em light e dark; `tsc`/`lint` limpos.
- [ ] Atualizei `05-inventario-componentes.md` (se aplicável) e `04-design-tokens.md` (se aplicável).
- [ ] Atualizei `README.md` com a nova linha na tabela de fases.
- [ ] Criei `docs/0N-<nome-do-modulo>.md`.
