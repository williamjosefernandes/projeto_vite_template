# DS-22 — Menu "Autenticação" (fluxo de Cadastro)

Documento estrutural e permanente. Substitui a versão provisória anterior — o print real do fluxo de cadastro (8 telas) foi recebido e implementado como rota funcional `/cadastro`. Faz parte da série `docs/ds-*` (ver `docs/ds-00-estrutura-e-visao-geral.md`).

## Rota

`/cadastro` — fora do `AppShell` do portal e da `DesignSystemLayout` da documentação, com casca própria (`AuthLayout`). Ver também `/login` (`modules/auth/LoginPage.tsx`, layout centralizado diferente, não afetado por esta etapa).

## Ramificação Cliente vs. Empresa

O cadastro tem uma tela inicial de seleção de tipo de conta (Step 0, sem número no stepper) e depois um wizard cujo número de etapas depende do tipo escolhido:

| Tipo | Steps |
|---|---|
| Cliente | Acesso → Confirmar e-mail → Conta → Sucesso (4) |
| Empresa | Acesso → Confirmar e-mail → Conta → Empresa → Endereço → Sucesso (6) |

Os 3 primeiros steps são idênticos (mesmos componentes `StepAcesso`/`StepConfirmarEmail`/`StepConta`) — a ramificação acontece só a partir do Step 4, decidida dinamicamente por `accountType` em `useCadastroWizard`. Não há duplicação de tela: `stepsConfig` é montado uma vez por tipo de conta e `CadastroPage` decide qual componente renderizar a partir de `currentStepId`.

## Arquitetura (`src/modules/cadastro/`)

```
components/
├── AuthLayout.tsx            # painel esquerdo fixo (gradiente) + estrutura direita
├── WizardStepShell.tsx       # stepper + título/subtítulo + conteúdo + rodapé (comum a todos os steps do wizard)
├── AccountTypeSelector.tsx   # Step 0
├── StepAcesso.tsx            # Step 1
├── StepConfirmarEmail.tsx    # Step 2 (com timer de reenvio)
├── StepConta.tsx             # Step 3
├── StepEmpresaDados.tsx      # Step 4 (empresa)
├── StepEmpresaEndereco.tsx   # Step 5 (empresa, com busca de CEP via ViaCEP)
├── StepSucessoCliente.tsx    # Step 4 (cliente)
└── StepSucessoEmpresa.tsx    # Step 6 (empresa)
hooks/
└── useCadastroWizard.ts
schemas/
└── cadastro.schemas.ts       # um schema zod por step
CadastroPage.tsx               # "burra": só lê o hook e decide qual Step renderizar
```

### `useCadastroWizard`

Expõe: `accountType`, `selectAccountType(type)`, `currentStep` (-1 = Step 0/seleção), `totalSteps`, `stepsConfig` (array `{id, label}` já filtrado pelo tipo), `currentStepId`, `goToNextStep`, `goToPreviousStep` (volta ao Step 0 se estiver no primeiro step do wizard), `data` (acumulado de cada step) e `saveStepData(key, value)`.

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

`StepEmpresaEndereco` usa a API pública `viacep.com.br` (real, sem chave) para preencher Logradouro/Bairro/Cidade/Estado a partir do CEP digitado. Falha de rede é silenciosa — usuário preenche manualmente.

## Componentes novos criados nesta etapa

| Componente | Caminho | Props principais |
|---|---|---|
| **Steps** | `components/ui/Steps` | `steps: StepItem[]`, `currentIndex: number` (estado completed/active/upcoming derivado do índice) |
| **OtpInput** | `components/ui/OtpInput` | `length?` (padrão 6), `value: string`, `onChange`, `onComplete?`, `disabled?`. Foco automático, suporta colar o código completo |
| **ImageUpload** | `components/ui/ImageUpload` | `label`, `helperText?`, `icon: ReactNode`, `shape?: 'square'\|'circle'`, `accept?`, `onFileSelect?`. Preview local via `FileReader` |

Adicionados a `docs/05-inventario-componentes.md`. `lib/masks.ts` (novo) centraliza máscaras de telefone/CNPJ/CEP/data — reaproveitar em vez de escrever regex ad-hoc em telas futuras.

## Nota de arquitetura

`AuthLayout` (deste módulo) é distinto do layout de `LoginPage.tsx` (`modules/auth/`) — este último usa um card centralizado (`min-h-screen items-center justify-center`), enquanto o de cadastro é split-screen `h-screen` sem scroll de página. Não foram unificados nesta etapa porque os prints de referência de cada fluxo pedem estruturas visuais diferentes; se uma unificação for desejada no futuro, avaliar com o print de Login como referência antes de decidir qual padrão prevalece.
