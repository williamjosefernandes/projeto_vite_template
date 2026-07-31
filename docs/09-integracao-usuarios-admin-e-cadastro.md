# 09 — Integração com o backend: Cadastro real e Administração de Usuários

Registro de fase. Documenta a integração das duas únicas frentes do backend (`projeto_nestjs_template`) que tinham tela pronta/prevista no frontend sem estar (totalmente) ligada à API real: o wizard de `/cadastro` e a tela de `/configuracoes/usuarios`. Não muda retroativamente — para a arquitetura de auth em si (permanente), ver `08-autenticacao.md`; para a convenção de módulo, ver `06-arquitetura.md`.

## 1. Escopo e por que só essas duas frentes

O backend só registra três módulos em `app.module.ts`: `AuthModule`, `UsersModule`, `FaqModule`. Todo o resto do menu do portal (Cadastros, Financeiro, Comunicação, Operações, Marketing, Configurações▸Geral, o próprio Dashboard) não tem nenhuma API correspondente — continuam como `PlaceholderPage`/dados mockados, por decisão explícita (não inventar tela nem endpoint).

Dentro do que o backend expõe, também foi decidido **não** construir telas novas para:
- `users/me/*` (perfil, avatar, preferências, trocar senha, `GET /users/me/accounts`, `GET /users/me/permissions`, sessões, `POST /auth/logout-all`) — sem tela "Minha Conta" hoje.
- O módulo FAQ inteiro (`/faq/v1`) — sem tela "Central de Ajuda" hoje.

Esses endpoints continuam sem consumidor no frontend. Ver seção 6.

## 2. Cadastro (`/cadastro`)

O wizard (`src/modules/cadastro/`) já existia com RHF+Zod em cada step, mas nenhum step chamava o backend — confirmado pelo próprio `docs/08-autenticacao.md §10`. Agora:

- `StepAcesso` → `POST /auth/register` (mapeando `nome/sobrenome/senha` → `firstName/lastName/password`).
- `StepConfirmarEmail` → `POST /auth/verify-email` ao confirmar o código; "Reenviar código" → `POST /auth/resend-verification`.
- Após `verify-email` ter sucesso, o wizard chama `POST /auth/login` com as credenciais já digitadas em `StepAcesso` e aplica a sessão via `applyLoginResponse` — **necessário** porque `verify-email` não emite sessão sozinho, e `StepSucessoCliente`/`StepSucessoEmpresa` já navegam para `/` ao final, o que exige sessão válida (senão o `AuthGuard` manda de volta pro login).
- `StepConta`, `StepEmpresaDados`, `StepEmpresaEndereco` **não foram alterados**: coletam telefone/nascimento/gênero/dados de empresa/endereço, mas o backend não tem nenhum endpoint para persistir isso (nem em `users`, nem um módulo de `companies`/`addresses` exposto por controller). Continuam como estado local do wizard, sem persistência — **gap de backend**, não do frontend.

Todas as três mutations (`register`, `verifyEmail`+`login`, `resendVerification`) usam `useMutation` do TanStack Query, com toasts de erro via `getApiErrorMessage` (`src/auth/utils`).

## 3. Administração de usuários (`/configuracoes/usuarios`)

O item de menu já existia (`requiredPermission: 'configuracoes.usuarios'`, `src/lib/menu-config.ts`), renderizando um `PlaceholderPage` genérico. Substituído por `UsuariosPage` (`src/modules/usuarios/`), cobrindo:

| Endpoint | Uso na tela |
|---|---|
| `GET /v1/users` | Tabela paginada/filtrada (`UsuariosTable`) |
| `POST /v1/users` | Modal "Novo usuário" (`CriarUsuarioModal`) |
| `PUT /v1/users/:id` | Modal "Editar usuário" (`EditarUsuarioModal`) |
| `PATCH /v1/users/:id/status` | Modal "Alterar status" (`AlterarStatusModal`) |
| `DELETE /v1/users/:id` | Diálogo de confirmação (`ExcluirUsuarioDialog`), soft delete |

Novo módulo de API `src/users/` (mesma estrutura de `src/auth/`: `types/`, `api/`, `hooks/`), consumido só por essa tela. `src/types/pagination.ts` (novo) espelha `PageMetaDto` para qualquer endpoint paginado futuro.

### 3.1 `x-account-id`

Todo endpoint de administração de usuários exige `MembershipGuard` no backend, que lê o header `x-account-id`. `src/api/http.ts` passou a injetar esse header automaticamente a partir de `useAuthStore.getState().currentAccount?.id`, no mesmo interceptor que já injeta `Authorization`.

### 3.2 `components/ui/Table` em modo servidor

A `Table` genérica só paginava/filtrava/ordenava localmente (`getPaginationRowModel`/`getFilteredRowModel`/`getSortedRowModel` sempre client-side) — incompatível com "nunca paginar/filtrar localmente quando há suporte na API". Ela ganhou props opcionais e retrocompatíveis: `manualPagination`/`pageCount`/`pagination`/`onPaginationChange` e um par `globalFilter`/`onGlobalFilterChange` controlado. Sem esses props, o comportamento client-side original continua idêntico (nenhum outro consumidor da `Table` foi alterado). Em modo servidor, sorting é desligado (`enableSorting: false`) — a API de listagem não suporta ordenação, e ordenar apenas a página atual no cliente seria enganoso.

### 3.3 Inconsistências descobertas no backend

1. **`GET /v1/users` não tem `@ApiStandardResponse`** no Swagger — o shape real do item de `content[]` foi tirado de `users.service.ts::listUsers` (um `Membership` com `user` e `profile` aninhados, não um `User` simples). Tipado em `src/users/types/admin-user.types.ts` a partir do `select`/`include` real do Prisma, não do Swagger. Não corrigido (não é um bug, só uma lacuna de documentação Swagger).
2. **`CreateUserAdminDto.profileId` não tem endpoint de listagem** (não existe `GET /profiles` nem equivalente em nenhum controller). O campo é um `Input` de texto livre (UUID) no modal de criação, com nota explicativa. Não corrigido. **Recomendação para o backend**: expor `GET /profiles` (escopado à conta ativa) para virar um `Select`.
3. ~~`UpdateUserStatusDto.status` documentado como `UserStatus` mas gravado em `Membership.status`~~ — **corrigido no backend** numa fase seguinte (ver `projeto_nestjs_template/prisma/SEED.md §7.1.4`): o DTO agora valida `MembershipStatus` de verdade. `AlterarStatusModal`/`usuario.schemas.ts`/`UsuariosPage` foram atualizados junto (o aviso amarelo que existia no modal foi removido, não é mais necessário).

## 4. Mapeamento User ID vs. Membership ID

`GET /v1/users` devolve itens de `Membership` (campo `id` = id do vínculo). Os endpoints de escrita (`PUT/DELETE /v1/users/:id`, `PATCH /v1/users/:id/status`) esperam o **`User.id`**, não o `Membership.id` — confirmado em `users.service.ts` (todos fazem `membership.findFirst({ where: { userId: id, accountId } })`). `AdminUserListItem.userId` é o campo correto a usar nessas chamadas; `AdminUserListItem.id` só serve para `key` de lista / referência ao vínculo.

## 5. CORS do backend local — resolvido via proxy do Vite, sem alterar o backend

O bloqueio de CORS já estava documentado em `08-autenticacao.md §9.1` como um problema pendente na configuração do backend (`CORS_ORIGINS` vazio em `.env` → `app.enableCors({ origin: false })`, ver `src/main.ts`/`app.config.ts`). Ele voltou a aparecer ao testar o login de verdade nesta fase. Em vez de editar o `.env`/`main.ts` do backend (fora de escopo — "não alterar o backend"), a correção foi 100% no frontend:

- `vite.config.ts` ganhou `server.proxy['/api'] -> http://localhost:3000` (`changeOrigin: true`).
- `.env`/`.env.example` deixaram `VITE_API_URL` comentada (não vazia — `??` em `http.ts` só cai no default `/api/v1` para valor `undefined`, não para string vazia).

Com isso, em dev o navegador chama `http://localhost:5173/api/v1/...` (mesma origem do Vite, sem preflight de CORS) e o próprio dev server do Vite repassa a requisição ao backend — proxy servidor-a-servidor, onde CORS não se aplica. `.env.example` continua documentando como apontar `VITE_API_URL` direto a um host de API que já libere CORS (ex.: staging), para quando não houver proxy de dev no caminho.

**Isso não substitui a recomendação de configurar `CORS_ORIGINS` no backend** — é necessário de qualquer forma para builds de produção servidos sem um proxy equivalente na frente da API.

## 6. Endpoints sem tela consumidora (decisão explícita, não pendência)

| Endpoint | Por quê |
|---|---|
| `GET/PUT /users/me`, `PATCH/DELETE /users/me/avatar`, `PATCH /users/me/password`, `GET/PUT /users/me/preferences`, `GET /users/me/accounts`, `GET /users/me/permissions`, `GET/DELETE /users/me/sessions*` | Sem tela "Minha Conta" — decisão explícita ao planejar esta fase |
| `GET /auth/me`, `POST /auth/logout-all`, `GET/DELETE /auth/sessions*` | Idem — ligados à mesma tela "Minha Conta"/"Segurança" que não foi construída |
| `GET/POST/PATCH/DELETE /faq/v1*` | Sem tela "Central de Ajuda" — decisão explícita ao planejar esta fase |

Se uma dessas telas for construída no futuro, a API de auth (`src/auth/api/auth.api.ts`) e um novo módulo `src/faq/` (mesmo padrão de `src/users/`) são o ponto de partida natural.
