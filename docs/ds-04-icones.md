# DS-04 — Menu "Ícones"

Documento estrutural e permanente. Catálogo de referência dos ícones já em uso na documentação viva do Design System, para que telas futuras do portal reaproveitem o mesmo ícone em vez de duplicar o conceito com um nome diferente. Faz parte da série `docs/ds-*` (ver `docs/ds-00-estrutura-e-visao-geral.md`).

## Biblioteca

`lucide-react` — única biblioteca de ícones do projeto (ver `docs/00-setup-e-stack.md`). Não introduza outra lib de ícones.

## Convenção de estilo e traço

- **Estilo**: Outline (padrão do `lucide-react`) — é o único estilo realmente disponível na lib; "Solid/Duotone/Linear/Rounded" mostrados na página são cards ilustrativos de convenção de uso, não estilos alternativos de verdade instalados no projeto.
- **`strokeWidth`**: `1.5` é o padrão observado na maior parte do código (`Sidebar`, `Topbar`, `NotificationsPopover`, `AccountSwitcherMenu`, `DesignSystemSidebar`). Componentes de feedback pontual (`Alert`) usam `2`. Ao criar um ícone novo em `components/layout`/`components/ui`, prefira `1.5`.
- **Tamanhos** (classes Tailwind `h-*/w-*`, grade de referência 24px):

| Token | Px | Classe |
|---|---|---|
| xs | 12×12 | `h-3 w-3` |
| sm | 16×16 | `h-4 w-4` |
| md | 20×20 | `h-5 w-5` |
| lg | 24×24 | `h-6 w-6` |
| xl | 32×32 | `h-8 w-8` |
| 2xl | 48×48 | `h-12 w-12` |

## Catálogo de ícones já em uso na documentação (por categoria)

| Categoria | Ícones (nome semântico → componente `lucide-react`) |
|---|---|
| Interface | home→Home, search→Search, settings→Settings, calendar→Clock*, info→Info, alert-circle→CircleAlert, warning-triangle→TriangleAlert, question-circle→CircleHelp, globe→Globe, map-pin→MapPin, clock→Clock, more-horizontal→MoreHorizontal, more-vertical→MoreVertical |
| Navegação | chevron-left/right/up/down→ChevronLeft/Right/Up/Down, arrow-left/right/up/down→ArrowLeft/Right/Up/Down, external-link→ExternalLink |
| Ações | bookmark→Bookmark, star→Star, heart→Heart, plus→Plus, trash→Trash2, check→Check, close→X, eye→Eye, eye-off→EyeOff, lock→Lock, unlock→Unlock, share→Share2, filter→Filter, refresh→RefreshCw |
| Comunicação | bell→Bell, mail→Mail, message-circle→MessageCircle |
| Arquivos | folder→Folder, document→File, file→File, download→Download, upload→Upload |
| E-commerce | shopping-cart→ShoppingCart, bag→ShoppingBag, tag→Bookmark (reutilizado — não há ícone "tag" dedicado sem conflitar com `bookmark`) |
| Usuários | user→User, users→Users |
| Editor | edit→Edit3, copy→Copy, link→Link2 |
| Mídia | play→Play, pause→Pause, stop→Square, video→Video, image→Image, camera→Camera |
| Dispositivos | phone→Phone, printer→Printer |

\* `calendar` reaproveita o ícone `Clock` como placeholder — o projeto não usa um ícone de calendário dedicado hoje; se uma tela precisar de um ícone de calendário de verdade, use `CalendarDays`/`Calendar` de `lucide-react` (disponível na lib, apenas não catalogado ainda) e atualize esta tabela.

**Antes de importar um ícone novo de `lucide-react`**: verifique esta tabela primeiro — o conceito que você precisa pode já estar mapeado com outro nome de componente.

## Componentes novos criados nesta etapa

| Componente | Caminho | Props principais |
|---|---|---|
| **Input** | `components/ui/Input` | Todas as props nativas de `<input>` |
| **IconTile** | `components/ui/icon-tile` | `icon: LucideIcon`, `label?: string`, `size?: 'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'`, `strokeWidth?: number` (padrão `1.5`) |

Adicionados a `docs/05-inventario-componentes.md`.
