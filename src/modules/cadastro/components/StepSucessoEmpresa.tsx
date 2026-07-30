import { useNavigate } from 'react-router-dom';
import { Building2, Check, LayoutGrid, Mail } from 'lucide-react';
import { Button } from '../../../components/ui';
import { WizardStepShell } from './WizardStepShell';
import type { AccountType } from '../hooks/useCadastroWizard';
import type { StepItem } from '../../../components/ui/Steps';

export interface StepSucessoEmpresaProps {
  accountType: AccountType;
  stepsConfig: StepItem[];
  currentStep: number;
}

export function StepSucessoEmpresa({ accountType, stepsConfig, currentStep }: StepSucessoEmpresaProps) {
  const navigate = useNavigate();

  return (
    <WizardStepShell
      accountType={accountType}
      stepsConfig={stepsConfig}
      currentStep={currentStep}
      title="Empresa cadastrada com sucesso! 🎉"
      subtitle="Sua empresa foi criada e todas as informações foram salvas com sucesso. Agora você já pode acessar o portal da empresa e aproveitar todos os recursos disponíveis."
      footer={
        <Button className="w-full" onClick={() => navigate('/')}>
          <LayoutGrid className="h-4 w-4" />
          Acessar portal da empresa →
        </Button>
      }
    >
      <div className="flex flex-col items-center py-4">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <span className="absolute -left-4 top-2 h-2 w-2 rounded-full bg-violet-300" />
          <span className="absolute -right-2 top-6 h-3 w-3 rounded-full bg-green-300" />
          <span className="absolute -left-2 bottom-4 h-2.5 w-2.5 rounded-full bg-violet-200" />
          <span className="absolute -right-4 bottom-8 h-2 w-2 rounded-full bg-green-200" />
          <Building2 className="h-14 w-14 text-green-600 dark:text-green-400" strokeWidth={2} />
          <span className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 ring-4 ring-white dark:ring-gray-950">
            <Check className="h-4 w-4 text-white" strokeWidth={3} />
          </span>
        </div>

        <div className="mt-8 flex w-full items-start gap-3 rounded-xl bg-violet-50 p-4 dark:bg-violet-900/20">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400">
            <Mail className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Próximos passos</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Enviamos um e-mail de boas-vindas com informações importantes para você começar.
            </p>
          </div>
        </div>
      </div>
    </WizardStepShell>
  );
}
