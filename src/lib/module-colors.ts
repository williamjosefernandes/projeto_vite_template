/**
 * Tokens de cor por módulo do produto (Cadastros, Financeiro, etc.).
 * Usado futuramente na sidebar/ícones de módulo, mas os tokens já
 * ficam centralizados aqui desde a Etapa 2 (Design System).
 */
export type ModuleKey =
  | 'cadastros'
  | 'financeiro'
  | 'comunicacao'
  | 'operacoes'
  | 'marketing'
  | 'configuracoes';

export interface ModuleColorTokens {
  label: string;
  /** Classes para o fundo/ícone do módulo (ex.: círculo de ícone na sidebar). */
  iconClassName: string;
}

export const moduleColors: Record<ModuleKey, ModuleColorTokens> = {
  cadastros: {
    label: 'Cadastros',
    iconClassName: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  },
  financeiro: {
    label: 'Financeiro',
    iconClassName: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  },
  comunicacao: {
    label: 'Comunicação',
    iconClassName: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
  operacoes: {
    label: 'Operações',
    iconClassName: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  marketing: {
    label: 'Marketing',
    iconClassName: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  },
  configuracoes: {
    label: 'Configurações',
    iconClassName: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  },
};
