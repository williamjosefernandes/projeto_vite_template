import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth, useCurrentAccount } from '../../../auth/hooks';
import { useOnboardingDraft } from '../../../onboarding';
import type { OnboardingDraftPayload } from '../../../onboarding';
import { maskCep, maskCnpj, maskCpf, maskPhone, toBrDate } from '../../../lib/masks';
import type {
  AcessoData,
  ConfirmacaoData,
  ConfirmarEmailData,
  DadosPessoaisData,
  EmpresaDadosData,
  EnderecoData,
  PersonalizacaoData,
} from '../schemas/cadastro.schemas';

export type AccountType = 'cliente' | 'empresa';

const STEPS_CLIENTE = [
  { id: 'acesso', label: 'Acesso' },
  { id: 'confirmar-email', label: 'Confirmar e-mail' },
  { id: 'dados-pessoais', label: 'Dados pessoais' },
  { id: 'endereco', label: 'Endereço' },
  { id: 'confirmacao', label: 'Confirmação' },
  { id: 'sucesso', label: 'Sucesso' },
];

const STEPS_EMPRESA = [
  { id: 'acesso', label: 'Acesso' },
  { id: 'confirmar-email', label: 'Confirmar e-mail' },
  { id: 'empresa', label: 'Empresa' },
  { id: 'endereco', label: 'Endereço' },
  { id: 'personalizacao', label: 'Personalização' },
  { id: 'confirmacao', label: 'Confirmação' },
  { id: 'sucesso', label: 'Sucesso' },
];

export interface CadastroWizardData {
  acesso?: AcessoData;
  confirmarEmail?: ConfirmarEmailData;
  dadosPessoais?: DadosPessoaisData;
  empresaDados?: EmpresaDadosData;
  endereco?: EnderecoData;
  personalizacao?: PersonalizacaoData;
  confirmacao?: ConfirmacaoData;
}

/** Retira o "+55" de um telefone E.164 antes de reaplicar a máscara BR — só o DDI do Brasil é suportado pelas máscaras deste projeto. */
function stripDdiBr(e164: string): string {
  return e164.startsWith('+55') ? e164.slice(3) : e164.replace(/\D/g, '');
}

/** Converte o payload acumulado no backend (nomes de campo do DTO) para o shape dos formulários (nomes em PT, com máscara). */
function payloadToWizardData(payload: OnboardingDraftPayload): Partial<CadastroWizardData> {
  const data: Partial<CadastroWizardData> = {};

  if (payload.personalData) {
    data.dadosPessoais = {
      cpf: maskCpf(payload.personalData.document),
      dataNascimento: toBrDate(payload.personalData.birthDate),
      telefone: maskPhone(stripDdiBr(payload.personalData.phone)),
      genero: payload.personalData.gender,
    };
  }

  if (payload.companyData) {
    data.empresaDados = {
      razaoSocial: payload.companyData.corporateName,
      nomeFantasia: payload.companyData.tradeName,
      cnpj: maskCnpj(payload.companyData.document),
      emailEmpresa: payload.companyData.email,
      telefoneComercial: payload.companyData.phone ? maskPhone(stripDdiBr(payload.companyData.phone)) : '',
      whatsapp: payload.companyData.whatsapp ? maskPhone(stripDdiBr(payload.companyData.whatsapp)) : '',
      site: payload.companyData.website ?? '',
    };
  }

  if (payload.address) {
    data.endereco = {
      cep: maskCep(payload.address.zipCode),
      logradouro: payload.address.street,
      numero: payload.address.number,
      complemento: payload.address.complement ?? '',
      bairro: payload.address.district,
      cidade: payload.address.city,
      estado: payload.address.state,
      paisId: payload.address.countryId,
    };
  }

  if (payload.personalization) {
    data.personalizacao = {
      nomeConta: payload.personalization.accountName,
      logoUrl: payload.personalization.logoUrl,
      idioma: payload.personalization.language,
      timezone: payload.personalization.timezone,
    };
  }

  return data;
}

/** Primeiro step (depois de "confirmar-email") cujo dado ainda não está no payload salvo — robusto a qualquer valor de `draft.step`. */
function resolveResumeStepId(accountType: AccountType, payload: OnboardingDraftPayload): string {
  const steps = accountType === 'empresa' ? STEPS_EMPRESA : STEPS_CLIENTE;
  const dataStepIds = steps.map((s) => s.id).filter((id) => id !== 'acesso' && id !== 'confirmar-email' && id !== 'sucesso');

  for (const id of dataStepIds) {
    if (id === 'dados-pessoais' && !payload.personalData) return id;
    if (id === 'empresa' && !payload.companyData) return id;
    if (id === 'endereco' && !payload.address) return id;
    if (id === 'personalizacao' && !payload.personalization) return id;
    if (id === 'confirmacao') return id;
  }
  return dataStepIds[0];
}

/**
 * Estado do wizard de cadastro. `currentStep` é 0-based e inclui o Step 0
 * (seleção de tipo de conta) como -1 — ou seja, `currentStep === -1` é a
 * tela de seleção, `currentStep === 0` é o primeiro step do stepsConfig.
 *
 * Retomada de rascunho: se o usuário está autenticado (já passou por
 * Acesso + Confirmar e-mail antes) mas ainda não tem nenhuma conta, busca o
 * rascunho salvo no backend (`GET /v1/onboarding/draft`) e pula direto pro
 * step certo, com os formulários pré-preenchidos — nada é lido do
 * localStorage, o servidor já é a fonte de verdade (ver docs/09).
 */
export function useCadastroWizard() {
  const { isAuthenticated, isLoading: isSessionLoading } = useAuth();
  const { currentAccount } = useCurrentAccount();
  const shouldResumeDraft = isAuthenticated && !isSessionLoading && !currentAccount;

  const draftQuery = useOnboardingDraft({ enabled: shouldResumeDraft });
  const hasHydratedFromDraft = useRef(false);

  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [data, setData] = useState<CadastroWizardData>({});

  useEffect(() => {
    if (!shouldResumeDraft || hasHydratedFromDraft.current) return;
    if (draftQuery.isLoading) return;

    hasHydratedFromDraft.current = true;
    const draft = draftQuery.data;
    if (!draft) return;

    const resumedAccountType: AccountType = draft.accountType === 'COMPANY' ? 'empresa' : 'cliente';
    setAccountType(resumedAccountType);
    setData((prev) => ({ ...prev, ...payloadToWizardData(draft.payload) }));

    const steps = resumedAccountType === 'empresa' ? STEPS_EMPRESA : STEPS_CLIENTE;
    const resumeStepId = resolveResumeStepId(resumedAccountType, draft.payload);
    const resumeIndex = steps.findIndex((s) => s.id === resumeStepId);
    setCurrentStep(resumeIndex >= 0 ? resumeIndex : 0);
  }, [shouldResumeDraft, draftQuery.isLoading, draftQuery.data]);

  const stepsConfig = useMemo(() => {
    if (accountType === 'empresa') return STEPS_EMPRESA;
    return STEPS_CLIENTE;
  }, [accountType]);

  const totalSteps = stepsConfig.length;

  function selectAccountType(type: AccountType) {
    setAccountType(type);
    setCurrentStep(0);
  }

  function goToNextStep() {
    setCurrentStep((step) => Math.min(step + 1, totalSteps - 1));
  }

  function goToPreviousStep() {
    setCurrentStep((step) => {
      if (step <= 0) {
        setAccountType(null);
        return -1;
      }
      return step - 1;
    });
  }

  function saveStepData<K extends keyof CadastroWizardData>(key: K, value: CadastroWizardData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  return {
    accountType,
    selectAccountType,
    currentStep,
    totalSteps,
    stepsConfig,
    currentStepId: currentStep >= 0 ? stepsConfig[currentStep].id : null,
    goToNextStep,
    goToPreviousStep,
    data,
    saveStepData,
    /** `true` enquanto ainda pode existir um rascunho pra retomar — mostrar loading em vez do seletor de tipo de conta. */
    isResumingDraft: shouldResumeDraft && (draftQuery.isLoading || !hasHydratedFromDraft.current),
  };
}
