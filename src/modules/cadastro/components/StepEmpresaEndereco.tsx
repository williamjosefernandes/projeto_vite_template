import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Building2, FileText, Hash, MapPin } from 'lucide-react';
import { Button, Input, Select } from '../../../components/ui';
import { WizardStepShell } from './WizardStepShell';
import { empresaEnderecoSchema, type EmpresaEnderecoData } from '../schemas/cadastro.schemas';
import { maskCep } from '../../../lib/masks';
import type { AccountType } from '../hooks/useCadastroWizard';
import type { StepItem } from '../../../components/ui/Steps';

const ESTADOS_BR = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

export interface StepEmpresaEnderecoProps {
  accountType: AccountType;
  stepsConfig: StepItem[];
  currentStep: number;
  defaultValues?: Partial<EmpresaEnderecoData>;
  onSubmit: (data: EmpresaEnderecoData) => void;
  onBack: () => void;
}

export function StepEmpresaEndereco({ accountType, stepsConfig, currentStep, defaultValues, onSubmit, onBack }: StepEmpresaEnderecoProps) {
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EmpresaEnderecoData>({ resolver: zodResolver(empresaEnderecoSchema), defaultValues });

  const cep = watch('cep');

  async function handleBuscarCep() {
    const digits = (cep ?? '').replace(/\D/g, '');
    if (digits.length !== 8) return;
    setIsSearchingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const result = await response.json();
      if (!result.erro) {
        setValue('logradouro', result.logradouro ?? '');
        setValue('bairro', result.bairro ?? '');
        setValue('cidade', result.localidade ?? '');
        setValue('estado', result.uf ?? '');
      }
    } catch {
      // Falha de rede/API — usuário preenche manualmente.
    } finally {
      setIsSearchingCep(false);
    }
  }

  return (
    <WizardStepShell
      accountType={accountType}
      stepsConfig={stepsConfig}
      currentStep={currentStep}
      title="Endereço da empresa"
      subtitle="Informe o endereço da sua empresa."
      securityNote="Suas informações estão seguras e protegidas."
      footer={
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={onBack}>
            ← Voltar
          </Button>
          <Button type="submit" form="step-empresa-endereco-form">
            Continuar →
          </Button>
        </div>
      }
    >
      <form id="step-empresa-endereco-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CEP</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="00000-000"
                className="pl-9"
                value={cep ?? ''}
                onChange={(e) => setValue('cep', maskCep(e.target.value))}
              />
            </div>
            <Button type="button" variant="secondary" onClick={handleBuscarCep} disabled={isSearchingCep}>
              {isSearchingCep ? 'Buscando...' : 'Buscar CEP'}
            </Button>
          </div>
          {errors.cep && <p className="text-xs text-red-600 dark:text-red-400">{errors.cep.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Logradouro</label>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Digite o logradouro" className="pl-9" {...register('logradouro')} />
          </div>
          {errors.logradouro && <p className="text-xs text-red-600 dark:text-red-400">{errors.logradouro.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Número</label>
          <div className="relative">
            <Hash className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Digite o número" className="pl-9" {...register('numero')} />
          </div>
          {errors.numero && <p className="text-xs text-red-600 dark:text-red-400">{errors.numero.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Complemento (opcional)</label>
          <div className="relative">
            <FileText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Ex.: Sala 101, Andar 2, etc." className="pl-9" {...register('complemento')} />
          </div>
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bairro</label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Digite o bairro" className="pl-9" {...register('bairro')} />
          </div>
          {errors.bairro && <p className="text-xs text-red-600 dark:text-red-400">{errors.bairro.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Cidade</label>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Digite a cidade" className="pl-9" {...register('cidade')} />
          </div>
          {errors.cidade && <p className="text-xs text-red-600 dark:text-red-400">{errors.cidade.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
          <Controller
            control={control}
            name="estado"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <Select.Trigger>
                  <Select.Value placeholder="Selecione o estado" />
                </Select.Trigger>
                <Select.Content>
                  {ESTADOS_BR.map((uf) => (
                    <Select.Item key={uf} value={uf}>
                      {uf}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            )}
          />
          {errors.estado && <p className="text-xs text-red-600 dark:text-red-400">{errors.estado.message}</p>}
        </div>
      </form>
    </WizardStepShell>
  );
}
