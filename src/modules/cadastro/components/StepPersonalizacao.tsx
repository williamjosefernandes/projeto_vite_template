import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Building2, Globe2, Image, Loader2, Clock } from 'lucide-react';
import { Button, ImageUpload, Input, Select } from '../../../components/ui';
import { WizardStepShell } from './WizardStepShell';
import { personalizacaoSchema, type PersonalizacaoData } from '../schemas/cadastro.schemas';
import type { AccountType } from '../hooks/useCadastroWizard';
import type { StepItem } from '../../../components/ui/Steps';

const IDIOMAS = [
  { value: 'PT_BR', label: 'Português (Brasil)' },
  { value: 'EN_US', label: 'English (US)' },
  { value: 'ES_ES', label: 'Español' },
] as const;

const TIMEZONES = [
  { value: 'America/Sao_Paulo', label: 'Brasília (GMT-3)' },
  { value: 'America/Manaus', label: 'Manaus (GMT-4)' },
  { value: 'America/Rio_Branco', label: 'Rio Branco (GMT-5)' },
  { value: 'America/Noronha', label: 'Fernando de Noronha (GMT-2)' },
  { value: 'UTC', label: 'UTC' },
];

export interface StepPersonalizacaoProps {
  accountType: AccountType;
  stepsConfig: StepItem[];
  currentStep: number;
  defaultValues?: Partial<PersonalizacaoData>;
  onSubmit: (data: PersonalizacaoData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

/** `PATCH /v1/onboarding/draft/personalization` — Step "Personalização" (Company). */
export function StepPersonalizacao({
  accountType,
  stepsConfig,
  currentStep,
  defaultValues,
  onSubmit,
  onBack,
  isSubmitting,
}: StepPersonalizacaoProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PersonalizacaoData>({
    resolver: zodResolver(personalizacaoSchema),
    defaultValues: { timezone: 'America/Sao_Paulo', idioma: 'PT_BR', ...defaultValues },
  });

  return (
    <WizardStepShell
      accountType={accountType}
      stepsConfig={stepsConfig}
      currentStep={currentStep}
      title="Personalização"
      subtitle="Deixe a conta da sua empresa com a sua cara."
      footer={
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={onBack} disabled={isSubmitting}>
            ← Voltar
          </Button>
          <Button type="submit" form="step-personalizacao-form" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Salvando…' : 'Continuar →'}
          </Button>
        </div>
      }
    >
      <form id="step-personalizacao-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ImageUpload
          label="Enviar logo"
          helperText="PNG, JPG ou SVG. Máx. 5MB"
          icon={<Image className="h-5 w-5" />}
          onFileSelect={(file) => setValue('logoUrl', file ? file.name : undefined)}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome da conta</label>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Como sua conta vai aparecer no portal" className="pl-9" {...register('nomeConta')} />
          </div>
          {errors.nomeConta && <p className="text-xs text-red-600 dark:text-red-400">{errors.nomeConta.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Idioma</label>
          <Controller
            control={control}
            name="idioma"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <Select.Trigger className="relative pl-9">
                  <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Select.Value placeholder="Selecione o idioma" />
                </Select.Trigger>
                <Select.Content>
                  {IDIOMAS.map((idioma) => (
                    <Select.Item key={idioma.value} value={idioma.value}>
                      {idioma.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            )}
          />
          {errors.idioma && <p className="text-xs text-red-600 dark:text-red-400">{errors.idioma.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Fuso horário</label>
          <Controller
            control={control}
            name="timezone"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <Select.Trigger className="relative pl-9">
                  <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Select.Value placeholder="Selecione o fuso horário" />
                </Select.Trigger>
                <Select.Content>
                  {TIMEZONES.map((tz) => (
                    <Select.Item key={tz.value} value={tz.value}>
                      {tz.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            )}
          />
          {errors.timezone && <p className="text-xs text-red-600 dark:text-red-400">{errors.timezone.message}</p>}
        </div>
      </form>
    </WizardStepShell>
  );
}
