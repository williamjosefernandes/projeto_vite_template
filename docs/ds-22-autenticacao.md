# DS-22 — Menu "Autenticação" (fluxo de Cadastro)

Documento estrutural e permanente. Faz parte da série `docs/ds-*` (ver `docs/ds-00-estrutura-e-visao-geral.md`). **Atualizado na Fase 10** (`docs/10-onboarding-cadastro.md`) — o wizard passou a persistir cada step no backend (rascunho por etapa) em vez de ser só estado local; a tabela de steps e a lista de componentes abaixo refletem o fluxo atual.

## Rota

`/cadastro` — fora do `AppShell` do portal e da `DesignSystemLayout` da documentação, com casca própria (`PublicLayout`, em `src/auth/layouts/`). Ver também `/login` (`modules/auth/LoginPage.tsx`).

> **Atualização (`docs/08-autenticacao.md`):** `AuthLayout` foi renomeado e movido para `src/auth/layouts/PublicLayout.tsx` — agora é a casca compartilhada de *todas* as telas públicas (Login, Cadastro, Esqueci senha, Redefinir senha), não só do cadastro. `LoginPage` já usa o mesmo componente (a nota da seção "Nota de arquitetura" abaixo, que descrevia um layout de Login diferente, ficou desatualizada e foi corrigida).

## Ramificação Cliente vs. Empresa

O cadastro tem uma tela inicial de seleção de tipo de conta (Step 0, sem número no stepper) e depois um wizard cujo número de etapas depende do tipo escolhido:

| Tipo | Steps |
|---|---|
| Cliente | Acesso → Confirmar e-mail → Dados pessoais → Endereço → Confirmação → Sucesso (6) |
| Empresa | Acesso → Confirmar e-mail → Empresa → Endereço → Personalização → Confirmação → Sucesso (7) |

Os 2 primeiros steps são idênticos (mesmos componentes `StepAcesso`/`StepConfirmarEmail`); Endereço e Confirmação também são compartilhados (`StepEndereco`/`StepConfirmacao`, parametrizados por `accountType`) — só Dados pessoais/Empresa/Personalização são exclusivos de um fluxo. A ramificação é decidida dinamicamente por `accountType` em `useCadastroWizard`. Não há duplicação de tela: `stepsConfig` é montado uma vez por tipo de conta e `CadastroPage` decide qual componente renderizar a partir de `currentStepId`.

## Arquitetura (`src/modules/cadastro/`)

```
components/
├── WizardStepShell.tsx       # stepper + título/subtítulo + conteúdo + rodapé (comum a todos os steps do wizard)
├── AccountTypeSelector.tsx   # Step 0
├── StepAcesso.tsx            # Step 1 — POST /auth/register
├── StepConfirmarEmail.tsx    # Step 2 — POST /auth/verify-email + /auth/login (com timer de reenvio)
├── StepDadosPessoais.tsx     # Step 3 (cliente) — PATCH /onboarding/draft/personal-data
├── StepEmpresaDados.tsx      # Step 3 (empresa) — PATCH /onboarding/draft/company-data
├── StepEndereco.tsx          # Step 4 (ambos, compartilhado) — PATCH /onboarding/draft/address, busca de CEP via ViaCEP
├── StepPersonalizacao.tsx    # Step 5 (empresa) — PATCH /onboarding/draft/personalization
├── StepConfirmacao.tsx       # Step 5 (cliente) / Step 6 (empresa), compartilhado — resumo + termos/privacidade + POST /onboarding/complete
├── StepSucessoCliente.tsx    # Step 6 (cliente)
└── StepSucessoEmpresa.tsx    # Step 7 (empresa)
hooks/
└── useCadastroWizard.ts
schemas/
└── cadastro.schemas.ts       # um schema zod por step
CadastroPage.tsx               # "burra": só lê o hook e decide qual Step renderizar
```

Detalhamento completo dos endpoints, da estratégia de persistência (rascunho no backend, não localStorage) e da retomada de rascunho: `docs/10-onboarding-cadastro.md`.

### `useCadastroWizard`

Expõe: `accountType`, `selectAccountType(type)`, `currentStep` (-1 = Step 0/seleção), `totalSteps`, `stepsConfig` (array `{id, label}` já filtrado pelo tipo), `currentStepId`, `goToNextStep`, `goToPreviousStep` (volta ao Step 0 se estiver no primeiro step do wizard), `data` (acumulado de cada step), `saveStepData(key, value)` e `isResumingDraft` (retomando um rascunho salvo no backend — ver `docs/10-onboarding-cadastro.md`).

### Validação

Cada step usa `react-hook-form` + `@hookform/resolvers/zod` + um schema de `schemas/cadastro.schemas.ts`. Padrão:

```tsx
const { register, handleSubmit, formState: { errors } } = useForm<AcessoData>({
  resolver: zodResolver(acessoSchema),
  defaultValues,
});
```

Regras principais: e-mail válido, senha ≥ 8 caracteres com letra e número, confirmação de senha igual, campos obrigatórios de endereço/empresa.

### Busca de CEP

`StepEndereco` usa a API pública `viacep.com.br` (real, sem chave) para preencher Logradouro/Bairro/Cidade/Estado a partir do CEP digitado. Falha de rede é silenciosa — usuário preenche manualmente. `Cidade`/`Estado` continuam texto livre (sem FK para `State`/`City`) — decisão explícita, ver `docs/10-onboarding-cadastro.md §2`.

## Componentes novos criados nesta etapa

| Componente | Caminho | Props principais |
|---|---|---|
| **Steps** | `components/ui/Steps` | `steps: StepItem[]`, `currentIndex: number` (estado completed/active/upcoming derivado do índice) |
| **OtpInput** | `components/ui/OtpInput` | `length?` (padrão 6), `value: string`, `onChange`, `onComplete?`, `disabled?`. Foco automático, suporta colar o código completo |
| **ImageUpload** | `components/ui/ImageUpload` | `label`, `helperText?`, `icon: ReactNode`, `shape?: 'square'\|'circle'`, `accept?`, `onFileSelect?`. Preview local via `FileReader` |

Adicionados a `docs/05-inventario-componentes.md`. `lib/masks.ts` (novo) centraliza máscaras de telefone/CNPJ/CEP/data — reaproveitar em vez de escrever regex ad-hoc em telas futuras.

## Nota de arquitetura

`PublicLayout` (`src/auth/layouts/`) é a casca compartilhada de todas as telas deslogadas — split-screen `h-screen` sem scroll de página, painel esquerdo com gradiente + destaques. `LoginPage`, `CadastroPage`, `ForgotPasswordPage` e `ResetPasswordPage` usam o mesmo componente (ver `docs/08-autenticacao.md`).
