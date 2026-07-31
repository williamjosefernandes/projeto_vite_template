import type { ReactNode } from 'react';
import { Lock } from 'lucide-react';
import { Steps, Typography } from '../../../components/ui';
import type { AccountType } from '../hooks/useCadastroWizard';
import type { StepItem } from '../../../components/ui/Steps';

export interface WizardStepShellProps {
  accountType: AccountType;
  stepsConfig: StepItem[];
  currentStep: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  securityNote?: ReactNode;
}

/** Estrutura comum de um step do wizard: stepper + título/subtítulo + conteúdo + rodapé. Badge de tipo de conta fica no `PublicLayout`. */
export function WizardStepShell({
  accountType: _accountType,
  stepsConfig,
  currentStep,
  title,
  subtitle,
  children,
  footer,
  securityNote,
}: WizardStepShellProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Steps steps={stepsConfig} currentIndex={currentStep} className="mb-6" />
      <div className="mb-6 border-t border-gray-100 dark:border-gray-800" />

      <p className="text-sm font-semibold text-violet-700 dark:text-violet-400">
        Step {currentStep + 1} de {stepsConfig.length}
      </p>
      <Typography as="h2" variant="h1" className="mt-1 text-2xl">
        {title}
      </Typography>
      <Typography className="mt-1">{subtitle}</Typography>

      <div className="mt-6">{children}</div>

      <div className="mt-8">{footer}</div>

      {securityNote && (
        <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <div>{securityNote}</div>
        </div>
      )}
    </div>
  );
}
