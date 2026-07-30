# 05 — Inventário de Componentes de Arquitetura

## 1. Objetivo deste documento

Complementa [`docs/01-design-system.md`](./01-design-system.md) (inventário de componentes visuais de `components/ui`) registrando peças que não são "visuais" no mesmo sentido — são utilitários de arquitetura/RBAC pensados para serem reutilizados por qualquer módulo futuro (Cadastros, Financeiro, Comunicação etc.), não só pelo Dashboard onde foram introduzidos.

Sempre que um componente ou hook nesta categoria for criado, ele deve ser registrado aqui — do mesmo jeito que `components/ui` é registrado em `docs/01-design-system.md`.

## 2. usePermission

- **Caminho:** `src/hooks/usePermission.ts`
- **Assinatura:** `usePermission(required: string | string[]): boolean`
- **O que faz:** lê `useSessionStore.permissions` (permissões já resolvidas para a conta ativa, ver `docs/02-appshell-navegacao.md`) e retorna `true` só se **todas** as permissões informadas estiverem presentes. Reativo — reavalia sozinho quando a conta ativa muda (`switchAccount`), sem precisar de reload.
```tsx
import { usePermission } from '@/hooks/usePermission';

const canEditInvoices = usePermission('financeiro.faturas.editar');
const canManageAccount = usePermission(['configuracoes.geral', 'configuracoes.usuarios']);
```
- **Quando usar diretamente (em vez de `PermissionGate`):** quando o resultado da checagem também precisa alimentar outra decisão além de "renderizar ou não" — por exemplo, calcular classes de grid/`col-span` com base em quais itens de uma linha estão visíveis (ver `DashboardPage.tsx`, seção 4 de `docs/03-pagina-dashboard.md`).

## 3. PermissionGate

- **Caminho:** `src/components/ui/permission-gate/PermissionGate.tsx`
- **Props:** `permission: string | string[]`, `children: ReactNode`, `fallback?: ReactNode` (padrão `null`).
- **O que faz:** wrapper declarativo sobre `usePermission` — renderiza `children` se a conta ativa tiver a(s) permissão(ões), senão renderiza `fallback`.
```tsx
import { PermissionGate } from '@/components/ui';

<PermissionGate permission="financeiro.despesas.visualizar">
  <DespesasCard />
</PermissionGate>

<PermissionGate permission="cadastros.alunos.excluir" fallback={<Button disabled>Excluir</Button>}>
  <Button variant="danger">Excluir</Button>
</PermissionGate>
```
- **Quando usar:** para condicionar um bloco isolado sem que o resultado precise influenciar layout externo a ele — é o padrão preferido para a maioria dos casos (ex.: cada `StatCard` individual dentro de `StatCardsGrid`, ver `src/modules/dashboard/components/StatCardsGrid.tsx`).
- **Exportado por:** `components/ui` (barrel), junto com os demais componentes do Design System.

## 4. Convenção para novos módulos

Qualquer módulo novo que precise condicionar UI por permissão deve seguir o mesmo padrão usado no Dashboard (`src/modules/dashboard/dashboard.permissions.ts`):

1. Declare um objeto `const` de permissões do módulo (`as const`), com uma chave por widget/ação — não strings soltas espalhadas pelo código.
2. Inclua essas permissões nos mocks de conta relevantes (`src/lib/mock-accounts.ts`, `mockMemberships`) para que o comportamento seja demonstrável trocando de conta.
3. Use `PermissionGate` para condicionar blocos isolados; use `usePermission` diretamente só quando o booleano também precisar decidir layout (grid dinâmico, `col-span`, etc.).
4. Se ocultar itens puder deixar buracos num grid multi-coluna, resolva com um componente auxiliar que colapsa o `col-span` dos itens restantes — não com CSS estático por posição (ver `CollapsingTwoColRow` em `DashboardPage.tsx` como referência).
5. Trate o caso de "zero itens visíveis" com `EmptyState` (`components/ui/EmptyState`) em vez de deixar a tela em branco sem explicação.
