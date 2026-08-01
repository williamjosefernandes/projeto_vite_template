# 10 — Onboarding completo: Cadastro (Customer e Company) ligado ao backend

Registro de fase. Fecha a lacuna documentada em `09-integracao-usuarios-admin-e-cadastro.md §2`: até então `StepConta`/`StepEmpresaDados`/`StepEmpresaEndereco` coletavam dados (telefone, nascimento, gênero, dados de empresa, endereço) só como estado local do wizard — o backend não tinha nenhum endpoint para persistir isso, e um usuário que terminava o cadastro ficava autenticado **sem nenhuma conta** (`accounts: []`). Esta fase implementou o backend (schema + módulo `onboarding` + módulo `geo`) e reescreveu o wizard do zero para consumir a API real, nos dois projetos. Não muda retroativamente `08-autenticacao.md` (arquitetura de auth em si); para a estrutura de steps/componentes do wizard, ver `ds-22-autenticacao.md` (já atualizado por esta fase).

## 1. Dois fluxos, mesma estrutura de conta

`POST /auth/register` passou a exigir `accountType: 'CUSTOMER' | 'COMPANY'`. Em uma transaction, o backend cria o `User` **e** um `OnboardingDraft` (rascunho vazio, `step: 'account-type'`) — todo usuário nasce com um rascunho em andamento até completar o onboarding. A partir daí:

| | Cliente (`Customer`) | Empresa (`Company`) |
|---|---|---|
| Steps exclusivos | Dados pessoais (CPF, nascimento, telefone, gênero) | Empresa (razão social, nome fantasia, CNPJ, e-mail comercial, telefone, WhatsApp, site) + Personalização (nome da conta, logo, idioma, timezone) |
| Steps compartilhados | Acesso, Confirmar e-mail, Endereço, Confirmação, Sucesso | idem |
| Total de steps | 6 | 7 |

## 2. Schema (`projeto_nestjs_template/prisma/schema.prisma`)

Migration única e aditiva (`add_onboarding_draft_and_terms_consent`), sem alterar nenhuma tabela existente além de novas colunas nullable em `users`:

```prisma
model OnboardingDraft {
  id          String       @id @default(uuid(7)) @db.Uuid
  userId      String       @unique @db.Uuid
  accountType AccountType
  step        String       @db.VarChar(50)
  payload     Json         @default("{}")   // { personalData?, companyData?, address?, personalization? }
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@map("onboarding_drafts")
}
```

`User` ganhou `termsAcceptedAt`/`termsVersion`/`privacyAcceptedAt`/`privacyVersion` (nullable) — consentimento é da plataforma, não por conta, por isso fica no `User`, gravado uma única vez na conclusão do primeiro onboarding.

**`payload` é `Json`, não colunas tipadas** — é estado de processo (rascunho), não dado de domínio final; a validação forte de verdade acontece no DTO de cada `PATCH` e de novo na conclusão. Uma tabela larga com ~20 colunas nullable (metade sempre vazia, porque Cliente e Empresa usam campos diferentes) seria pior manutenção sem ganho real de segurança de tipo.

**Decisão explícita do usuário: `Address.city`/`Address.state` continuam texto livre**, sem normalizar para FK de `State`/`City`. Nenhuma outra entidade de endereço mudou.

## 3. Backend — endpoints novos

Módulo `src/onboarding/` + módulo `src/geo/` (`app.module.ts`):

| Rota | O que faz |
|---|---|
| `GET /v1/onboarding/draft` | Rascunho do usuário autenticado (`{accountType, step, payload}` ou `data: null`) — usado pelo wizard pra retomar de onde parou |
| `PATCH /v1/onboarding/draft/personal-data` | Cliente only. CPF/CNPJ com checksum mod-11 real (`@IsCPF`), nascimento, telefone E.164, gênero. 409 se o rascunho for de Empresa |
| `PATCH /v1/onboarding/draft/company-data` | Empresa only. CNPJ com checksum real (`@IsCNPJ`). 409 se o rascunho for de Cliente |
| `PATCH /v1/onboarding/draft/address` | Ambos os fluxos |
| `PATCH /v1/onboarding/draft/personalization` | Empresa only |
| `POST /v1/onboarding/complete` | `{termsAccepted: true, privacyAccepted: true}` — ver §4 |
| `DELETE /v1/onboarding/draft` | Descarta o rascunho (ex.: trocar de fluxo do zero) |
| `GET /v1/geo/countries` | Lista `Country` (id/name/code) — alimenta o `Select` de País. Público |

Todas as rotas Bearer usam só `@CurrentUser()` (sem `x-account-id`/`MembershipGuard`) — o usuário ainda não tem conta nenhuma nesse momento.

## 4. Transação de conclusão (`POST /onboarding/complete`)

Uma única `$transaction`: `Account` → perfis padrão (`provisionDefaultProfiles`, ver §5) → `Membership` (Owner) → `Customer`/`Company` → `Address` → consentimento no `User` → `AuditLog` → apaga o `OnboardingDraft` → escopa a sessão atual (`Session.currentMembershipId`) à conta nova. Se qualquer passo falhar (CPF/CNPJ/telefone duplicado), nada é persistido — sem isso sobraria uma `Account` órfã, sem dono de verdade, num sistema multi-tenant.

Depois do commit, reemite `accessToken`/`refreshToken` já escopados à conta nova (mesmo padrão de `switchAccount`) — o frontend não precisa de um segundo round-trip de login.

### 4.1 Bug descoberto e corrigido durante o teste em navegador: 500 em vez de 409 em documento/telefone duplicado

`Customer.document`/`Company.document`/`User.phone` são `@unique` no schema. Antes da correção, um CPF/CNPJ/telefone já cadastrado (ex.: colisão com a massa de teste do `prisma/SEED.md`) estourava um `PrismaClientKnownRequestError` (P2002) não tratado, que o `AllExceptionsFilter` só sabia mapear para `500 INTERNAL_SERVER_ERROR` genérico — encontrado rodando o fluxo completo Playwright headless, não em revisão de código. Corrigido seguindo o mesmo padrão já usado em `AuthService.register()` para e-mail duplicado (checagem prévia + exceção de negócio, não deixar a constraint do banco vazar): `OnboardingService.complete()` agora chama `assertDocumentAvailable`/`assertPhoneAvailable` (dentro da própria transaction, via `tx`) antes de cada `create`/`update`, lançando `ConflictAppException` com os novos `ErrorCode.DOCUMENT_ALREADY_IN_USE`/`PHONE_ALREADY_IN_USE` (409, mensagem localizável em `errors.json`). Refletido no frontend em `src/auth/types/api.types.ts` (`ErrorCode`) e `src/auth/utils/error.utils.ts` (`ERROR_MESSAGES`).

## 5. Provisionamento de perfis — extraído para `src/`

Antes, os 7 perfis padrão (Owner/Administrador/Gerente/Usuário/Visualizador/Financeiro/Suporte) só existiam em `prisma/data/*.ts`, lido apenas pelo script de seed (fora do runtime do Nest) — uma conta criada via onboarding não ganharia nenhum `Profile`/`ProfilePermission`. Extraído para `src/core/security/provisioning/` (`default-profiles.data.ts` + `default-profiles.provisioner.ts`, função pura `provisionDefaultProfiles(tx, accountId)`), chamável tanto de dentro de uma transaction do Nest quanto do script de seed (`prisma/seeds/*.seed.ts` agora importam de lá — fonte única, sem duplicação). Confirmado nos dois testes E2E: a conta recém-criada aparece no Dashboard com o perfil **Owner** e o menu completo (Cadastros/Financeiro/Comunicação/Operações/Marketing/Configurações), igual às contas seedadas.

## 6. Frontend — persistência: rascunho no backend, não localStorage

**Decisão explícita do usuário**, contrária à recomendação inicial (`localStorage` + submit atômico no fim): cada step persiste no backend assim que o usuário avança (`PATCH /onboarding/draft/*`), não só no fim. Justificativa: o rascunho sobrevive a fechar o navegador/trocar de dispositivo — `useCadastroWizard` chama `GET /onboarding/draft` ao montar (se `isAuthenticated && !currentAccount`) e re-hidrata `accountType`/`currentStep`/cada step a partir do `payload` salvo (`payloadToWizardData`/`resolveResumeStepId`), sem depender de nada no `localStorage`. Novo módulo `src/onboarding/` (mesma estrutura de `src/auth/`/`src/users/`: `types/`, `api/`, `hooks/`).

`src/lib/br-documents.ts` (novo) replica no frontend o mesmo checksum mod-11 de CPF/CNPJ do backend (`isValidCPF`/`isValidCNPJ`) — duplicado de propósito, sem pacote compartilhado entre os dois projetos.

### 6.1 Bug descoberto no navegador: usuário "pulava" o wizard direto pro Dashboard sem conta

Achado só ao rodar o fluxo completo num Chromium real (Playwright), não haveria como pegar isso em `tsc`/lint: assim que `POST /auth/verify-email` + `POST /auth/login` aplicavam a sessão (`applyLoginResponse`), o usuário passava a ser `isAuthenticated: true`. O `GuestGuard` (que protege `/cadastro`/`/login`) só sabia checar `isAuthenticated` — redirecionava imediatamente para `/`, interrompendo o wizard logo após a confirmação de e-mail, antes de qualquer step de dados. Na tela de sucesso o problema se repetia ao contrário: aplicar a sessão nova (`currentAccount` deixando de ser `null`) disparava o mesmo redirect do `GuestGuard` antes do React sequer renderizar `StepSucessoCliente`/`StepSucessoEmpresa` — o usuário caía direto no Dashboard real, sem ver a tela de celebração.

Corrigido em dois pontos, ambos usando o mesmo sinal (`currentAccount === null` = "autenticado, mas onboarding incompleto"), já usado por `useCadastroWizard` para decidir se retoma um rascunho:

- **`src/auth/guards/GuestGuard.tsx`**: se `isAuthenticated && !currentAccount`, só permite `/cadastro` (qualquer outra rota pública redireciona pra lá) — em vez de mandar pra `/` como um usuário totalmente logado.
- **`src/auth/guards/AuthGuard.tsx`**: se `!currentAccount`, redireciona para `/cadastro` em vez de renderizar o `AppShell` (que ficaria com um Dashboard sem conta nenhuma, "Nenhum item disponível").
- **`src/onboarding/hooks/useOnboardingSteps.ts` (`useCompleteOnboarding`)**: não aplica mais a sessão nova no `onSuccess` da mutation. `CadastroPage` guarda a resposta (`pendingSession`) e só chama `applyLoginResponse` no clique de "Acessar portal" dentro de `StepSucessoCliente`/`StepSucessoEmpresa` (novo prop `onAccessPortal`) — o redirect do `GuestGuard` só acontece quando o usuário already decidiu sair da tela de sucesso, não antes.

## 7. CORS — regressão pontual, não um bug novo

Durante o teste em navegador desta fase, o login voltou a falhar por CORS (`Response to preflight request doesn't pass access control check`). Já era um problema conhecido e resolvido via proxy do Vite (`09-integracao-usuarios-admin-e-cadastro.md §5`) — a causa aqui foi só uma linha de `.env` sem o `#` de comentário (`VITE_API_URL=http://localhost:3000/api/v1` ativa, sobrescrevendo o default `/api/v1` que passa pelo proxy same-origin). Corrigido recomentando a linha e reiniciando o Vite (variáveis de ambiente só são lidas na inicialização). Nenhuma mudança de arquitetura — reforça que `.env`/`.env.example` devem continuar com essa linha comentada.

## 8. Limitações conhecidas (decisões explícitas, não pendências)

| Item | Decisão |
|---|---|
| Upload de logo (`StepEmpresaDados`/`StepPersonalizacao`) | Preview local via `FileReader` apenas, mesmo padrão já existente do avatar de usuário (`UsersService.updateAvatar` é um stub) — sem pipeline de storage real, fora de escopo desta fase |
| `Address.city`/`state` | Texto livre, não normalizado para FK — decisão explícita do usuário (§2) |
| Sem tela "Minha Conta"/"Central de Ajuda" | Já documentado em `09-integracao-usuarios-admin-e-cadastro.md §6`, inalterado |

## 9. Validação

- `npx tsc -b` (frontend) e `npx tsc --noEmit`/`nest build` (backend, excluindo `test/*.spec.ts` pré-existentes e não relacionados) sem erros novos; `npm run lint` sem warnings novos (os 43 pré-existentes de `only-export-components` em `components/ui` continuam, não fazem parte desta fase).
- Curl end-to-end dos dois fluxos (registro → draft → cada `PATCH` → `complete`), incluindo os casos de erro (409 de tipo de conta errado, 400 de step faltando, 409 de documento/telefone duplicado).
- **Fluxo completo em navegador real (Playwright/Chromium headless)** para Cliente e para Empresa: seleção de tipo → Acesso → código de verificação (lido direto da tabela `tokens` do Postgres) → dados exclusivos do fluxo → Endereço (com autopreenchimento de País/Brasil) → Confirmação (termos/privacidade) → tela de Sucesso → clique em "Acessar portal" → Dashboard autenticado com o perfil Owner e o menu completo, zero erros de console/rede. Os dois bugs de guard de rota (§6.1) e o de 500-em-vez-de-409 (§4.1) só foram encontrados nesse teste — não apareciam em `tsc`/lint nem nos testes via curl (que não exercitam o roteador do React).
