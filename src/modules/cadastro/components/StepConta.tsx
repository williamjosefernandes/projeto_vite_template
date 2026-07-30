import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Calendar, Camera, Phone, Users } from 'lucide-react';
import { Button, ImageUpload, Input, Select } from '../../../components/ui';
import { WizardStepShell } from './WizardStepShell';
import { contaSchema, type ContaData } from '../schemas/cadastro.schemas';
import { maskDate, maskPhone } from '../../../lib/masks';
import type { AccountType } from '../hooks/useCadastroWizard';
import type { StepItem } from '../../../components/ui/Steps';

const generos = [
  { value: 'feminino', label: 'Feminino' },
  { value: 'masculino', label: 'Masculino' },
  { value: 'outro', label: 'Outro' },
  { value: 'prefiro-nao-informar', label: 'Prefiro não informar' },
];

export interface StepContaProps {
  accountType: AccountType;
  stepsConfig: StepItem[];
  currentStep: number;
  defaultValues?: Partial<ContaData>;
  onSubmit: (data: ContaData) => void;
  onBack: () => void;
}

export function StepConta({ accountType, stepsConfig, currentStep, defaultValues, onSubmit, onBack }: StepContaProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContaData>({ resolver: zodResolver(contaSchema), defaultValues });

  const telefone = watch('telefone');

  return (
    <WizardStepShell
      accountType={accountType}
      stepsConfig={stepsConfig}
      currentStep={currentStep}
      title="Dados do usuário"
      subtitle="Complete suas informações pessoais para continuar."
      footer={
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={onBack}>
            ← Voltar
          </Button>
          <Button type="submit" form="step-conta-form">
            Continuar →
          </Button>
        </div>
      }
    >
      <form id="step-conta-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ImageUpload
          label="Enviar foto"
          helperText="PNG, JPG ou GIF. Máx. 5MB"
          icon={<Camera className="h-5 w-5" />}
          shape="circle"
          onFileSelect={(file) => setValue('fotoUrl', file ? file.name : undefined)}
        />

        <div className="space-y-4">
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
                    {generos.map((g) => (
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

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data de nascimento</label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="DD/MM/AAAA"
                className="pl-9"
                {...register('dataNascimento')}
                onChange={(e) => setValue('dataNascimento', maskDate(e.target.value))}
              />
            </div>
            {errors.dataNascimento && <p className="text-xs text-red-600 dark:text-red-400">{errors.dataNascimento.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5 sm:col-span-2">
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
          {errors.telefone ? (
            <p className="text-xs text-red-600 dark:text-red-400">{errors.telefone.message}</p>
          ) : (
            <p className="text-xs text-gray-400">Utilizaremos seu telefone para comunicações importantes sobre sua conta.</p>
          )}
        </div>
      </form>
    </WizardStepShell>
  );
}
