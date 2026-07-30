import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Button, Input } from '../../../components/ui';
import { WizardStepShell } from './WizardStepShell';
import { acessoSchema, type AcessoData } from '../schemas/cadastro.schemas';
import type { AccountType } from '../hooks/useCadastroWizard';
import type { StepItem } from '../../../components/ui/Steps';

export interface StepAcessoProps {
  accountType: AccountType;
  stepsConfig: StepItem[];
  currentStep: number;
  defaultValues?: Partial<AcessoData>;
  onSubmit: (data: AcessoData) => void;
  onCancel: () => void;
}

export function StepAcesso({ accountType, stepsConfig, currentStep, defaultValues, onSubmit, onCancel }: StepAcessoProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcessoData>({ resolver: zodResolver(acessoSchema), defaultValues });

  return (
    <WizardStepShell
      accountType={accountType}
      stepsConfig={stepsConfig}
      currentStep={currentStep}
      title="Acesso"
      subtitle="Vamos começar criando seu acesso à plataforma."
      securityNote={
        <span>
          Ao continuar, você concorda com nossos{' '}
          <a href="#" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
            Termos de Uso
          </a>{' '}
          e{' '}
          <a href="#" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
            Política de Privacidade
          </a>
          .
        </span>
      }
      footer={
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" form="step-acesso-form">
            Continuar →
          </Button>
        </div>
      }
    >
      <form id="step-acesso-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Digite seu nome" className="pl-9" {...register('nome')} />
            </div>
            {errors.nome && <p className="text-xs text-red-600 dark:text-red-400">{errors.nome.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sobrenome</label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Digite seu sobrenome" className="pl-9" {...register('sobrenome')} />
            </div>
            {errors.sobrenome && <p className="text-xs text-red-600 dark:text-red-400">{errors.sobrenome.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input type="email" placeholder="Digite seu melhor e-mail" className="pl-9" {...register('email')} />
          </div>
          {errors.email && <p className="text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              className="px-9"
              {...register('senha')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.senha ? (
            <p className="text-xs text-red-600 dark:text-red-400">{errors.senha.message}</p>
          ) : (
            <p className="text-xs text-gray-400">A senha deve conter pelo menos 8 caracteres, incluindo letras e números.</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar senha</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Repita sua senha"
              className="px-9"
              {...register('confirmarSenha')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmarSenha && <p className="text-xs text-red-600 dark:text-red-400">{errors.confirmarSenha.message}</p>}
        </div>
      </form>
    </WizardStepShell>
  );
}
