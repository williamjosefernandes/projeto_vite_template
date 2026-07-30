# DS-00 — Estrutura da `DesignSystemPage` + Visão Geral

Documento estrutural e permanente da documentação viva do Design System, disponível em `/design-system`. Faz parte da série `docs/ds-*` (uma entrada por menu da sidebar de documentação — ver `docs/README.md` para o índice completo à medida que os prompts DS-02 em diante forem executados).

## 1. Como a `DesignSystemPage` é estruturada

A documentação vive sob a rota `/design-system` e usa uma casca **própria**, independente do `AppShell`/`Sidebar` do portal (sem RBAC — é documentação interna, não uma tela de produto):

- **`DesignSystemLayout`** (`src/pages/design-system/DesignSystemLayout.tsx`) — casca de duas colunas: `DesignSystemSidebar` + área de conteúdo com topbar própria e `<Outlet />`.
- **`DesignSystemSidebar`** (`src/components/layout/DesignSystemSidebar.tsx`) — cabeçalho "Sua Marca / Design System", campo de busca funcional (`Buscar componentes...`, atalho `⌘K`/`Ctrl+K` foca o campo, `Escape` limpa, `Enter` navega para o primeiro resultado; filtra os itens de menu por label, ignorando acentos), grupos **Fundamentos** e **Componentes**, e rodapé com o toggle de tema (reaproveita `useTheme`, o mesmo hook do portal).
- **Roteamento interno**: cada menu da sidebar é uma sub-rota de `/design-system` (ex. `/design-system/visao-geral`, `/design-system/tokens`), declarada em `src/routes/router.tsx` a partir de `dsMenuItems` (`src/lib/ds-menu-config.ts`). O item ativo é destacado via `NavLink` (mesmo padrão visual do `Sidebar` do portal: `bg-violet-50 dark:bg-violet-900/30` + texto `violet-700/400`).
- **Título/subtítulo da topbar**: `DesignSystemLayout` lê a rota atual (`useLocation`) e busca o item correspondente em `dsMenuItems` para exibir `label` (H1) e `description` (subtítulo) — cada página de conteúdo **não** precisa declarar seu próprio header, só o conteúdo do corpo.
- **Menus ainda não construídos** (a maioria, até os prompts DS-02+ serem executados) renderizam `DesignSystemComingSoonPage`, que mostra o nome do menu e, se marcado `provisional: true` em `ds-menu-config.ts`, um aviso de que está aguardando o print de referência.

### Diferença importante: `lib/menu-config.ts` vs. `lib/ds-menu-config.ts`

São dois arquivos de configuração de menu **intencionalmente separados**:

| | `lib/menu-config.ts` | `lib/ds-menu-config.ts` |
|---|---|---|
| Usado por | `Sidebar` do portal (`AppShell`) | `DesignSystemSidebar` |
| Tem RBAC (`requiredPermission`) | Sim | Não |
| Propósito | Navegação real do produto | Navegação da documentação |

Não misture os dois — um item novo de produto vai em `menuConfig`; um item novo de documentação vai em `dsMenuGroups`.

## 2. Componentes novos criados nesta etapa

| Componente | Caminho | Motivo |
|---|---|---|
| **Checkbox** | `components/ui/Checkbox` (wrapper `@radix-ui/react-checkbox`) | Não existia; necessário para o card "Checkbox & Radio" da Visão Geral e para o futuro menu "Checkbox" (DS-10) |
| **RadioGroup** | `components/ui/Radio` (wrapper `@radix-ui/react-radio-group`) | Idem, para o futuro menu "Radios" (DS-09) |
| **Alert** | `components/ui/Alert` | Alerta inline (não-toast) para mensagens persistentes dentro de uma página — distinto de `Toast` (`sonner`), que é efêmero. Necessário para o card "Alertas" da Visão Geral e para o futuro menu "Feedback" (DS-16) |

Todos seguem o padrão de arquitetura já estabelecido: uma pasta por componente com barrel `index.ts`, `cva` para variantes (`Alert`), wrapper direto de primitiva Radix estilizada com `cn()` (`Checkbox`, `RadioGroup`). Ver detalhes de props em `docs/05-inventario-componentes.md`.

Pacotes adicionados: `@radix-ui/react-checkbox`, `@radix-ui/react-radio-group`.

## 3. Página "Visão Geral"

`src/pages/design-system/pages/VisaoGeralPage.tsx` — réplica fiel do print de referência (`Visão_Geral.png`), com 9 blocos:

1. Cores (Primárias/Acentos/Neutras)
2. Tipografia (especime + hierarquia H1–Caption)
3. Ícones (grade outline, `lucide-react`)
4. Espaçamento (barras 4px–64px, base 8px)
5. Raios de Borda (0 a Pill)
6. Sombras (xs a xl, com valor de `box-shadow`)
7. Estados (Sucesso/Informativo/Aviso/Erro/Ativo/Inativo/Desabilitado/Carregando)
8. Componentes em Destaque (Botões, Inputs, Select, Checkbox & Radio, Tags, Alertas)
9. Princípios (Consistência, Clareza, Acessibilidade, Feedback, Escalabilidade)

Todos os valores exibidos (cores, tipografia, espaçamento, raios, sombras) usam a escala padrão do Tailwind já em uso no projeto — nenhum token novo foi inventado. A escala "Primárias" usa `violet-{50..900}`, a mesma cor primária documentada em `docs/04-design-tokens.md` §2.

**Nota de layout:** o grid de "Componentes em Destaque" usa 3 colunas (`sm:grid-cols-2 xl:grid-cols-3`) em vez das 6 colunas do print original — em 6 colunas o card "Alertas" fica estreito demais e o texto do `Alert` quebra mal. Conteúdo idêntico ao print, dispostos em 2 fileiras de 3 em vez de 1 fileira de 6.

## 4. Esta página como fonte de referência interna

A partir de agora, `/design-system` é a **fonte visual de referência interna** do projeto. Qualquer tela nova do portal pode (e deve) ser conferida contra ela antes de inventar um estilo novo — cores, tipografia, espaçamento, raios, sombras e os componentes de "Componentes em Destaque" já cobrem os casos mais comuns. Se uma tela precisar de algo que não está documentado aqui, o padrão é: criar o componente/token em `components/ui`/tokens, documentá-lo em `docs/05-inventario-componentes.md` / `docs/04-design-tokens.md`, e depois adicioná-lo à página de documentação correspondente (não o contrário).

## 5. Pendências

Os demais 21 menus da sidebar (Tokens, Cores, Tipografia, ... Autenticação) ainda renderizam `DesignSystemComingSoonPage` — serão implementados um a um nos prompts DS-02 a DS-23, na ordem definida no índice do projeto. Os menus **Bordas**, **Select** e **Autenticação** estão marcados como `provisional: true` em `ds-menu-config.ts` (aguardando print de referência).
