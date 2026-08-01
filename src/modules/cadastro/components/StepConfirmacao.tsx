import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button, CheckboxField } from '../../../components/ui';
import { WizardStepShell } from './WizardStepShell';
import { confirmacaoSchema, type ConfirmacaoData } from '../schemas/cadastro.schemas';
import type { AccountType } from '../hooks/useCadastroWizard';
import type { CadastroWizardData } from '../hooks/useCadastroWizard';
import type { StepItem } from '../../../components/ui/Steps';

export interface StepConfirmacaoProps {
  accountType: AccountType;
  stepsConfig: StepItem[];
  currentStep: number;
  data: CadastroWizardData;
  onSubmit: (data: ConfirmacaoData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

function ResumoLinha({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  );
}

/** Step "Confirmação" (Customer e Company) — resumo + aceite de termos, submete `POST /v1/onboarding/complete`. */
export function StepConfirmacao({ accountType, stepsConfig, currentStep, data, onSubmit, onBack, isSubmitting }: StepConfirmacaoProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ConfirmacaoData>({
    resolver: zodResolver(confirmacaoSchema),
    defaultValues: { termos: false, privacidade: false },
  });

  const enderecoResumo = data.endereco
    ? `${data.endereco.logradouro}, ${data.endereco.numero} — ${data.endereco.cidade}/${data.endereco.estado}`
    : undefined;

  return (
    <WizardStepShell
      accountType={accountType}
      stepsConfig={stepsConfig}
      currentStep={currentStep}
      title="Confirmação"
      subtitle="Revise seus dados antes de concluir o cadastro."
      footer={
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={onBack} disabled={isSubmitting}>
            ← Voltar
          </Button>
          <Button type="submit" form="step-confirmacao-form" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Concluindo…' : 'Concluir cadastro'}
          </Button>
        </div>
      }
    >
      <div className="rounded-xl border border-gray-200 divide-y divide-gray-100 px-4 dark:border-gray-800 dark:divide-gray-800">
        <ResumoLinha label="Nome" value={data.acesso ? `${data.acesso.nome} ${data.acesso.sobrenome}` : undefined} />
        <ResumoLinha label="E-mail" value={data.acesso?.email} />

        {accountType === 'cliente' ? (
          <>
            <ResumoLinha label="CPF" value={data.dadosPessoais?.cpf} />
            <ResumoLinha label="Data de nascimento" value={data.dadosPessoais?.dataNascimento} />
            <ResumoLinha label="Telefone" value={data.dadosPessoais?.telefone} />
          </>
        ) : (
          <>
            <ResumoLinha label="Razão social" value={data.empresaDados?.razaoSocial} />
            <ResumoLinha label="Nome fantasia" value={data.empresaDados?.nomeFantasia} />
            <ResumoLinha label="CNPJ" value={data.empresaDados?.cnpj} />
            <ResumoLinha label="E-mail da empresa" value={data.empresaDados?.emailEmpresa} />
            <ResumoLinha label="Nome da conta" value={data.personalizacao?.nomeConta} />
          </>
        )}

        <ResumoLinha label="Endereço" value={enderecoResumo} />
      </div>

      <form id="step-confirmacao-form" onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Controller
          control={control}
          name="termos"
          render={({ field }) => (
            <CheckboxField
              id="termos"
              label={
                <>
                  Li e aceito os{' '}
                  <a href="#" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
                    Termos de Uso
                  </a>
                </>
              }
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        {errors.termos && <p className="text-xs text-red-600 dark:text-red-400">{errors.termos.message}</p>}

        <Controller
          control={control}
          name="privacidade"
          render={({ field }) => (
            <CheckboxField
              id="privacidade"
              label={
                <>
                  Li e aceito a{' '}
                  <a href="#" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
                    Política de Privacidade
                  </a>
                </>
              }
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        {errors.privacidade && <p className="text-xs text-red-600 dark:text-red-400">{errors.privacidade.message}</p>}
      </form>
    </WizardStepShell>
  );
}
