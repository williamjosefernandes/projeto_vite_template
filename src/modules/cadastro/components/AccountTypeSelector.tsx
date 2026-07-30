import { Building2, CheckCircle2, Info, User, UserPlus } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../../components/ui';
import type { AccountType } from '../hooks/useCadastroWizard';

const empresaFeatures = ['Gerencie sua equipe', 'Acesse recursos empresariais', 'Relatórios e insights avançados'];
const clienteFeatures = ['Acesso rápido e simplificado', 'Recursos essenciais', 'Experiência personalizada'];

export interface AccountTypeSelectorProps {
  onSelect: (type: AccountType) => void;
}

/** Step 0 — seleção de tipo de conta. O clique no card já navega para o Step 1. */
export function AccountTypeSelector({ onSelect }: AccountTypeSelectorProps) {
  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
        <UserPlus className="h-7 w-7" />
      </div>
      <Typography as="h1" variant="h1" className="text-2xl">
        Vamos criar sua conta
      </Typography>
      <Typography className="mt-1">Para começar, selecione o tipo de conta que melhor descreve você.</Typography>

      <div className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onSelect('empresa')}
          className={cn(
            'rounded-2xl border-2 border-gray-200 p-6 text-left transition-colors hover:border-violet-300 dark:border-gray-800 dark:hover:border-violet-800',
          )}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
            <Building2 className="h-6 w-6" />
          </span>
          <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Empresa</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Para negócios, empresas e organizações.</p>
          <div className="my-4 border-t border-gray-100 dark:border-gray-800" />
          <ul className="space-y-2">
            {empresaFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                {feature}
              </li>
            ))}
          </ul>
        </button>

        <button
          type="button"
          onClick={() => onSelect('cliente')}
          className={cn(
            'rounded-2xl border-2 border-gray-200 p-6 text-left transition-colors hover:border-violet-300 dark:border-gray-800 dark:hover:border-violet-800',
          )}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <User className="h-6 w-6" />
          </span>
          <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Cliente</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Para pessoas físicas que desejam usar nossos serviços.</p>
          <div className="my-4 border-t border-gray-100 dark:border-gray-800" />
          <ul className="space-y-2">
            {clienteFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                {feature}
              </li>
            ))}
          </ul>
        </button>
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-lg bg-gray-50 p-3 text-left text-sm text-gray-600 dark:bg-gray-800/60 dark:text-gray-300">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
        <p>Você poderá alterar o tipo de conta posteriormente nas configurações da sua conta.</p>
      </div>
    </div>
  );
}
