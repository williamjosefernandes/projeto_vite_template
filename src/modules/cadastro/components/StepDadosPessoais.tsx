import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Calendar, CreditCard, Loader2, Phone, Users } from 'lucide-react';
import { Button, Input, Select } from '../../../components/ui';
import { WizardStepShell } from './WizardStepShell';
import { dadosPessoaisSchema, type DadosPessoaisData } from '../schemas/cadastro.schemas';
import { maskCpf, maskDate, maskPhone } from '../../../lib/masks';
import type { AccountType } from '../hooks/useCadastroWizard';
import type { StepItem } from '../../../components/ui/Steps';

const GENEROS = [
  { value: 'FEMALE', label: 'Feminino' },
  { value: 'MALE', label: 'Masculino' },
  { value: 'OTHER', label: 'Outro' },
  { value: 'NOT_INFORMED', label: 'Prefiro não informar' },
] as const;

export interface StepDadosPessoaisProps {
  accountType: AccountType;
  stepsConfig: StepItem[];
  currentStep: number;
  defaultValues?: Partial<DadosPessoaisData>;
  onSubmit: (data: DadosPessoaisData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

/** `PATCH /v1/onboarding/draft/personal-data` — Step "Dados Pessoais" (Customer). */
export function StepDadosPessoais({
  accountType,
  stepsConfig,
  currentStep,
  defaultValues,
  onSubmit,
  onBack,
  isSubmitting,
}: StepDadosPessoaisProps) {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DadosPessoaisData>({ resolver: zodResolver(dadosPessoaisSchema), defaultValues });

  const cpf = watch('cpf');
  const dataNascimento = watch('dataNascimento');
  const telefone = watch('telefone');

  return (
    <WizardStepShell
      accountType={accountType}
      stepsConfig={stepsConfig}
      currentStep={currentStep}
      title="Dados pessoais"
      subtitle="Complete suas informações pessoais para continuar."
      footer={
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={onBack} disabled={isSubmitting}>
            ← Voltar
          </Button>
          <Button type="submit" form="step-dados-pessoais-form" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Salvando…' : 'Continuar →'}
          </Button>
        </div>
      }
    >
      <form id="step-dados-pessoais-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CPF</label>
          <div className="relative">
            <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="000.000.000-00"
              className="pl-9"
              value={cpf ?? ''}
              onChange={(e) => setValue('cpf', maskCpf(e.target.value))}
            />
          </div>
          {errors.cpf && <p className="text-xs text-red-600 dark:text-red-400">{errors.cpf.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data de nascimento</label>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="DD/MM/AAAA"
              className="pl-9"
              value={dataNascimento ?? ''}
              onChange={(e) => setValue('dataNascimento', maskDate(e.target.value))}
            />
          </div>
          {errors.dataNascimento && <p className="text-xs text-red-600 dark:text-red-400">{errors.dataNascimento.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="(00) 00000-0000"
              className="pl-9"
              value={telefone ?? ''}
              onChange={(e) => setValue('telefone', maskPhone(e.target.value))}
            />
          </div>
          {errors.telefone && <p className="text-xs text-red-600 dark:text-red-400">{errors.telefone.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gênero</label>
          <Controller
            control={control}
            name="genero"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <Select.Trigger className="relative pl-9">
                  <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Select.Value placeholder="Selecione seu gênero" />
                </Select.Trigger>
                <Select.Content>
                  {GENEROS.map((g) => (
                    <Select.Item key={g.value} value={g.value}>
                      {g.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            )}
          />
          {errors.genero && <p className="text-xs text-red-600 dark:text-red-400">{errors.genero.message}</p>}
        </div>
      </form>
    </WizardStepShell>
  );
}
