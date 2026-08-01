import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Building2, CreditCard, Globe, Image, Loader2, Mail, MessageCircle, Phone } from 'lucide-react';
import { Button, ImageUpload, Input } from '../../../components/ui';
import { WizardStepShell } from './WizardStepShell';
import { empresaDadosSchema, type EmpresaDadosData } from '../schemas/cadastro.schemas';
import { maskCnpj, maskPhone } from '../../../lib/masks';
import type { AccountType } from '../hooks/useCadastroWizard';
import type { StepItem } from '../../../components/ui/Steps';

export interface StepEmpresaDadosProps {
  accountType: AccountType;
  stepsConfig: StepItem[];
  currentStep: number;
  defaultValues?: Partial<EmpresaDadosData>;
  onSubmit: (data: EmpresaDadosData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

/** `PATCH /v1/onboarding/draft/company-data` — Step "Empresa" (Company). */
export function StepEmpresaDados({
  accountType,
  stepsConfig,
  currentStep,
  defaultValues,
  onSubmit,
  onBack,
  isSubmitting,
}: StepEmpresaDadosProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EmpresaDadosData>({ resolver: zodResolver(empresaDadosSchema), defaultValues });

  const cnpj = watch('cnpj');
  const telefoneComercial = watch('telefoneComercial');
  const whatsapp = watch('whatsapp');

  return (
    <WizardStepShell
      accountType={accountType}
      stepsConfig={stepsConfig}
      currentStep={currentStep}
      title="Dados da empresa"
      subtitle="Informe os dados da sua empresa para continuarmos."
      securityNote="Suas informações estão seguras e protegidas."
      footer={
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={onBack} disabled={isSubmitting}>
            ← Voltar
          </Button>
          <Button type="submit" form="step-empresa-dados-form" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Salvando…' : 'Continuar →'}
          </Button>
        </div>
      }
    >
      <form id="step-empresa-dados-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ImageUpload
          label="Enviar logo"
          helperText="PNG, JPG ou SVG. Máx. 5MB"
          icon={<Image className="h-5 w-5" />}
          onFileSelect={(file) => setValue('logoUrl', file ? file.name : undefined)}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Razão social</label>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Digite a razão social da empresa" className="pl-9" {...register('razaoSocial')} />
          </div>
          {errors.razaoSocial && <p className="text-xs text-red-600 dark:text-red-400">{errors.razaoSocial.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome fantasia</label>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Digite o nome fantasia" className="pl-9" {...register('nomeFantasia')} />
          </div>
          {errors.nomeFantasia && <p className="text-xs text-red-600 dark:text-red-400">{errors.nomeFantasia.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CNPJ</label>
          <div className="relative">
            <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="00.000.000/0000-00"
              className="pl-9"
              value={cnpj ?? ''}
              onChange={(e) => setValue('cnpj', maskCnpj(e.target.value))}
            />
          </div>
          {errors.cnpj && <p className="text-xs text-red-600 dark:text-red-400">{errors.cnpj.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail da empresa</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="contato@suaempresa.com.br" className="pl-9" {...register('emailEmpresa')} />
          </div>
          {errors.emailEmpresa && <p className="text-xs text-red-600 dark:text-red-400">{errors.emailEmpresa.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefone comercial</label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="(00) 0000-0000"
              className="pl-9"
              value={telefoneComercial ?? ''}
              onChange={(e) => setValue('telefoneComercial', maskPhone(e.target.value))}
            />
          </div>
          {errors.telefoneComercial && <p className="text-xs text-red-600 dark:text-red-400">{errors.telefoneComercial.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp</label>
          <div className="relative">
            <MessageCircle className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="(00) 00000-0000"
              className="pl-9"
              value={whatsapp ?? ''}
              onChange={(e) => setValue('whatsapp', maskPhone(e.target.value))}
            />
          </div>
          {errors.whatsapp && <p className="text-xs text-red-600 dark:text-red-400">{errors.whatsapp.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Site (opcional)</label>
          <div className="relative">
            <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="https://suaempresa.com.br" className="pl-9" {...register('site')} />
          </div>
        </div>
      </form>
    </WizardStepShell>
  );
}
