# 08 — Autenticação

Registro de fase. Documenta a infraestrutura de autenticação/RBAC entregue nesta etapa: login real via API, gestão de tokens (access/refresh), sessão persistida, guards de rota, multi-conta e controle de permissões/menus/componentes. Não muda retroativamente — para a estrutura de pastas em si (permanente), ver `06-arquitetura.md`.

## 1. Decisões e por que

- **Sem TanStack Router / shadcn-ui.** O projeto já usa `react-router-dom` (todo o `AppShell`, `/design-system` e as rotas existentes dependem dele) e já tem um Design System próprio em `components/ui` (Radix + `cva`). Introduzir uma segunda biblioteca de roteamento ou de UI duplicaria infraestrutura já madura e violaria `06-arquitetura.md` §5. A infra de auth foi construída sobre o que já existe.
- **`useSessionStore` foi substituída, não duplicada.** A store antiga (`src/store/useSessionStore.ts`, com `mockAccounts`/`mockMemberships` fixos) foi removida. `useAuthStore` (`src/auth/stores`) é agora a única fonte de verdade de sessão — usuário, tokens, conta ativa, contas, permissões, menus e componentes, tudo populado pela resposta real de `POST /api/v1/auth/login`. Isso significa que **o portal exige backend rodando** para logar; não há mais dados mockados de sessão.
- **`AuthLayout` virou `PublicLayout`.** Movido de `modules/cadastro/components/AuthLayout.tsx` para `src/auth/layouts/PublicLayout.tsx` — é a casca de toda tela deslogada (Login, Cadastro, Esqueci senha, Redefinir senha), não só do cadastro.
- **`usePermission`/`useVisibleMenu`/`PermissionGate` mantidos no lugar.** Só a implementação interna mudou (lêem `useAuthStore` em vez de `useSessionStore`) — nenhum consumidor existente precisou mudar de padrão de uso.
- **Tipos validados contra o Swagger real do backend.** A primeira versão desta etapa especulou o formato de `LoginResponse` (campos `memberships`/`permissions`/`menus`/`components` soltos no topo, `user.name`, `Menu` como árvore). Depois de rodar o backend local (`GET /api/docs-json`), os tipos foram corrigidos para bater exatamente com o contrato real — ver seção 3. Sempre que o backend estiver acessível, prefira conferir `/api/docs-json` a especular um contrato nas próximas mudanças de auth.

## 2. Arquitetura (`src/auth/`)

```
src/auth/
├── api/auth.api.ts          # login, refreshToken, logout, register/forgotPassword/resetPassword/switchAccount (stubs)
├── components/               # PasswordField, SessionLoadingScreen
├── guards/                    # AuthGuard, GuestGuard, ProtectedRoute, PermissionGuard, MenuGuard, ComponentGuard
├── hooks/                      # useAuth, useLogin, useLogout, useCurrentUser, useCurrentAccount, usePermissions, useMenus, useMenu, useComponent
├── layouts/PublicLayout.tsx     # casca das telas públicas
├── services/                     # applyLoginResponse, switchAccountService, logoutService (orquestração)
├── stores/useAuthStore.ts         # Zustand + persist — única fonte de verdade da sessão
├── types/                          # User, Account, CurrentAccount, Membership, Profile, Permission, MenuKey, LoginRequest/Response, ApiResponse
└── utils/                           # computeExpiresAt/isTokenExpired, getApiErrorMessage, getUserFullName
```

`src/api/http.ts` é a instância única do axios (fora de `src/auth` porque, em tese, qualquer módulo de negócio futuro vai usá-la para suas próprias chamadas, não só auth).

## 3. Fluxo de login

`POST /api/v1/auth/login` com `{ email, password, authProvider: 'LOCAL' }` (`src/auth/types/auth.types.ts` → `LoginRequest`). Resposta real (`LoginResponseDto`, ver `GET /api/docs-json`):

```ts
{
  auth: { accessToken, refreshToken, expiresIn },
  user: { id, email, firstName, lastName?, avatar?, emailVerified, status, authProvider },
  // currentAccount/accounts são opcionais — um usuário recém-criado pode ainda não ter conta.
  currentAccount?: {
    id, type, name, logo?,
    membership: { id, isOwner, status },
    profile: { id, code, name },
    permissions: string[],   // RBAC da conta ativa — único lugar de onde vêm
    menus: string[],          // só códigos, sem árvore/rótulo/ícone
    components: string[],      // chaves de componente granular (ComponentGuard)
  },
  accounts?: Array<{ id, name, type, logo?, profile: string }>,  // profile aqui é string, sem RBAC
}
```

**Toda a API de login (`LoginResponseDto`) é reemitida por completo em três endpoints**: `/auth/login`, `/auth/refresh-token` e `/auth/switch-account`. Nenhum deles devolve só os tokens — por isso `useAuthStore.setSession()` é o único ponto de entrada da sessão, chamado pelos três fluxos (ver seções 4 e 7).

`useLogin()` (`src/auth/hooks/useLogin.ts`) é uma mutation do TanStack Query: em sucesso, aplica a resposta via `applyLoginResponse` (`src/auth/services/session.service.ts`), mostra toast (`Bem-vindo(a) de volta, ${user.firstName}!`) e navega para `/`; em erro, `getApiErrorMessage` (`src/auth/utils/error.utils.ts`) mapeia `error.error.code` (`ErrorDto.code`, estável e independente de idioma) para uma mensagem em PT-BR — **nunca usar `error.error.message`, que a própria API documenta como "só para debug/log"**.

`LoginPage` (`src/modules/auth/LoginPage.tsx`) usa `react-hook-form` + `zod` (`src/modules/auth/schemas/login.schema.ts`), foco automático no primeiro campo com erro (comportamento padrão do RHF), botão desabilitado e com spinner durante o submit.

## 4. Tokens e refresh automático

`src/api/http.ts`:

- Interceptor de request injeta `Authorization: Bearer <accessToken>` lendo `useAuthStore.getState()` (fora de componente React — nunca usar hooks aqui).
- Interceptor de response: em `401` (exceto nas próprias rotas de login/refresh), dispara `POST /auth/refresh-token` uma única vez por rajada de 401s concorrentes (padrão *single-flight*, variável `refreshPromise` em módulo), repete a requisição original com o novo token. `/auth/refresh-token` devolve o `LoginResponseDto` inteiro (não só os tokens) — o interceptor aplica via `useAuthStore.setSession()`, mantendo permissões/menus/componentes em dia caso tenham mudado no servidor. Se o refresh falhar, `useAuthStore.clearSession()` é chamado — `AuthGuard`, que está inscrito reativamente na store, redireciona para `/login` sozinho no próximo render (nenhuma navegação é feita dentro de `http.ts`, para não acoplar a camada HTTP ao router).

## 5. Sessão persistida e restauração

`useAuthStore` usa `zustand/persist` (chave `auth-store` no `localStorage`). Ao recarregar a página:

1. `onRehydrateStorage` marca `hasHydrated = true` assim que o `persist` termina de ler o `localStorage`.
2. `AuthGuard`/`GuestGuard` mostram `SessionLoadingScreen` (skeleton) enquanto `hasHydrated` é `false`, e só decidem redirecionar depois — evita um "flash" para `/login` durante o reload de uma sessão válida.

## 6. Guards

| Guard | Uso | Onde |
|---|---|---|
| `AuthGuard` | Rota-layout (`<Outlet/>`) — protege uma subárvore inteira | `router.tsx`, envolve `AppShell` e `/design-system` |
| `GuestGuard` | Rota-layout inversa — redireciona usuário já logado para `/` | `router.tsx`, envolve `/login`, `/cadastro`, `/forgot-password`, `/reset-password` |
| `ProtectedRoute` | Mesma checagem de `AuthGuard`, mas como wrapper de `children` (sem `Outlet`) | Para proteger um elemento pontual fora de `router.tsx` |
| `PermissionGuard` | Rota-layout por permissão — redireciona se a conta ativa não tiver acesso | Subárvores de rota condicionadas por RBAC (preparado, ainda não usado por nenhum módulo) |
| `MenuGuard` | Rota-layout por menu da API (`menus[]`) | Idem, para quando o roteamento passar a ser guiado pela árvore de menu da API |
| `ComponentGuard` | Declarativo, tipo `PermissionGate` mas para `components[]` | `<ComponentGuard component="dashboard.financeiro.visualizar">...</ComponentGuard>` |

## 7. Multi-conta

`useCurrentAccount()` expõe `{ currentAccount, accounts, switchAccount }`. `switchAccount(membershipId)` (`switchAccountService`) chama `POST /auth/switch-account` (body `{ membershipId }`) e aguarda a resposta — **não há caminho local/otimista**: `accounts[]` só traz `{ id, name, type, logo?, profile: string }`, sem permissões/menus/componentes por item, então só a conta ativa (`currentAccount`) tem RBAC resolvido. A resposta é um `LoginResponseDto` completo (inclusive tokens novos, escopados à conta alvo), aplicado com `applyLoginResponse`. `membershipId` é o campo `id` de cada item de `accounts[]`. Falha na troca mostra um toast de erro (`useCurrentAccount`) em vez de aplicar algo parcial.

`AccountSwitcherMenu` (`components/layout/`) foi migrado para esse hook; a cor do avatar de iniciais por conta é derivada do `id` (`src/lib/account-avatar.ts`), já que a API não retorna ícone/cor por conta.

## 8. Logout

`useLogout()` chama `logoutService` (`src/auth/services/logout.service.ts`): invalida no backend (best-effort), limpa `useAuthStore`, o cache do TanStack Query (`queryClient.clear()`), a chave `auth-store` do `localStorage` e o `sessionStorage` inteiro — depois navega para `/login`. É o único caminho de logout do app (botão "Sair" do `AccountSwitcherMenu`).

## 9. Variáveis de ambiente

`VITE_API_URL` (opcional, default `/api/v1`) — base URL do axios (`src/api/http.ts`). Ver `.env.example`.

## 9.1 CORS — bloqueio conhecido, fora deste repositório

O backend local (porta 3000) responde corretamente via `curl`, mas bloqueia o navegador: o preflight (`OPTIONS`) e a resposta do `POST /auth/login` não incluem o header `Access-Control-Allow-Origin` (mesmo enviando `Origin: http://localhost:5173`), só `Access-Control-Allow-Credentials: true`/`-Methods`/`-Headers`. Sem `Access-Control-Allow-Origin` ecoando a origem exata, o navegador descarta a resposta antes do JS enxergar — o axios reporta isso como erro de rede (`!error.response`), por isso o toast "Não foi possível conectar ao servidor" aparece mesmo com o backend de pé. Causa raiz (confirmada em `src/main.ts`/`app.config.ts` do backend): `app.enableCors({ origin: corsOrigins.length > 0 ? corsOrigins : false })`, e `CORS_ORIGINS` vem vazio no `.env` do backend — logo `origin: false`, CORS desligado por completo, para qualquer origem.

**Atualização — resolvido no frontend, sem tocar no backend**: ver `docs/09-integracao-usuarios-admin-e-cadastro.md §6` — `vite.config.ts` ganhou um proxy de dev (`server.proxy['/api']` → `http://localhost:3000`), e `VITE_API_URL` ficou comentada em `.env`/`.env.example`. O navegador passa a chamar `/api/v1/...` na própria origem do Vite (`localhost:5173`, sem CORS); o Vite repassa a requisição ao backend server-to-server, onde CORS não se aplica. A correção da allowlist de CORS no backend continua sendo a recomendação correta para produção (onde front e API normalmente não têm proxy de dev no meio), mas deixou de ser bloqueante para o desenvolvimento local.

## 10. Cadastro, Esqueci/Redefinir senha

- `/cadastro` (`src/modules/cadastro/`) já existia como wizard completo (RHF + zod por step); só a casca mudou (`PublicLayout`). O endpoint de registro (`authApi.register`, `POST /auth/register`) está preparado em `src/auth/api/auth.api.ts` mas o wizard ainda não o chama — ele continua sendo um fluxo local até o backend de cadastro existir.
- `/forgot-password` e `/reset-password` (`src/modules/auth/`) são novas, com formulário + validação + chamada preparada (`authApi.forgotPassword`/`resetPassword`) para endpoints que ainda não existem no backend.

## 11. O que NÃO fazer (específico de auth)

- Não chamar `axios` diretamente — sempre `http` (`src/api/http.ts`).
- Não ler/escrever tokens ou dados de sessão via `localStorage` fora de `src/auth` — sempre pelos hooks de `src/auth/hooks` (componentes) ou `useAuthStore.getState()` (fora de React, ex. interceptors).
- Não criar uma segunda store de sessão — `useAuthStore` é a única.
- Não navegar de dentro de `src/api/http.ts` ou `src/auth/services` — essas camadas não conhecem o router; navegação é sempre responsabilidade do hook/guard que consome o serviço.
