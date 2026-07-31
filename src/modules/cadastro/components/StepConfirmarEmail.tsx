import { useEffect, useState } from 'react';
import { Loader2, Mail } from 'lucide-react';
import { Button, OtpInput } from '../../../components/ui';
import { WizardStepShell } from './WizardStepShell';
import type { AccountType } from '../hooks/useCadastroWizard';
import type { StepItem } from '../../../components/ui/Steps';

const RESEND_SECONDS = 45;

export interface StepConfirmarEmailProps {
  accountType: AccountType;
  stepsConfig: StepItem[];
  currentStep: number;
  email: string;
  onSubmit: (codigo: string) => void;
  onBack: () => void;
  onResend: () => void;
  isVerifying?: boolean;
  isResending?: boolean;
}

function formatSeconds(total: number) {
  const minutes = Math.floor(total / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (total % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function StepConfirmarEmail({
  accountType,
  stepsConfig,
  currentStep,
  email,
  onSubmit,
  onBack,
  onResend,
  isVerifying,
  isResending,
}: StepConfirmarEmailProps) {
  const [code, setCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  function handleResend() {
    if (secondsLeft > 0 || isResending) return;
    setSecondsLeft(RESEND_SECONDS);
    onResend();
  }

  return (
    <WizardStepShell
      accountType={accountType}
      stepsConfig={stepsConfig}
      currentStep={currentStep}
      title="Confirmar seu e-mail"
      subtitle={`Enviamos um código de 6 dígitos para o e-mail ${email || 'informado'}. Digite o código abaixo para confirmar.`}
      footer={
        <div>
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={onBack} disabled={isVerifying}>
              ← Voltar
            </Button>
            <Button type="button" disabled={code.length !== 6 || isVerifying} onClick={() => onSubmit(code)}>
              {isVerifying && <Loader2 className="h-4 w-4 animate-spin" />}
              {isVerifying ? 'Confirmando…' : 'Confirmar código'}
            </Button>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Não recebeu o código?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={secondsLeft > 0 || isResending}
              className="font-medium text-violet-600 hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline dark:text-violet-400 dark:disabled:text-gray-600"
            >
              Reenviar código {secondsLeft > 0 && `(${formatSeconds(secondsLeft)})`}
            </button>
          </p>
        </div>
      }
    >
      <div className="space-y-4">
        <OtpInput value={code} onChange={setCode} onComplete={onSubmit} disabled={isVerifying} />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Não recebeu o código? Verifique sua caixa de spam ou lixo eletrônico.
        </p>
        <div className="flex items-start gap-2 rounded-lg bg-violet-50 p-3 text-sm text-violet-700 dark:bg-violet-900/20 dark:text-violet-300">
          <Mail className="mt-0.5 h-4 w-4 shrink-0" />
          <p>O código expira em 10 minutos por segurança. Caso o código expire, você poderá solicitar um novo.</p>
        </div>
      </div>
    </WizardStepShell>
  );
}
