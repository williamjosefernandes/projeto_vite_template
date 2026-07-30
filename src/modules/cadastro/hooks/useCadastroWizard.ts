import { useMemo, useState } from 'react';
import type { AcessoData, ConfirmarEmailData, ContaData, EmpresaDadosData, EmpresaEnderecoData } from '../schemas/cadastro.schemas';

export type AccountType = 'cliente' | 'empresa';

const STEPS_CLIENTE = [
  { id: 'acesso', label: 'Acesso' },
  { id: 'confirmar-email', label: 'Confirmar e-mail' },
  { id: 'conta', label: 'Conta' },
  { id: 'sucesso', label: 'Sucesso' },
];

const STEPS_EMPRESA = [
  { id: 'acesso', label: 'Acesso' },
  { id: 'confirmar-email', label: 'Confirmar e-mail' },
  { id: 'conta', label: 'Conta' },
  { id: 'empresa', label: 'Empresa' },
  { id: 'endereco', label: 'Endereço' },
  { id: 'sucesso', label: 'Sucesso' },
];

export interface CadastroWizardData {
  acesso?: AcessoData;
  confirmarEmail?: ConfirmarEmailData;
  conta?: ContaData;
  empresaDados?: EmpresaDadosData;
  empresaEndereco?: EmpresaEnderecoData;
}

/**
 * Estado do wizard de cadastro. `currentStep` é 0-based e inclui o Step 0
 * (seleção de tipo de conta) como -1 — ou seja, `currentStep === -1` é a
 * tela de seleção, `currentStep === 0` é o primeiro step do stepsConfig.
 */
export function useCadastroWizard() {
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [data, setData] = useState<CadastroWizardData>({});

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
  };
}
