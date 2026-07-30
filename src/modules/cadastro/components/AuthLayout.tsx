import type { ReactNode } from 'react';
import { Lock, ShieldCheck, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const highlights = [
  { icon: ShieldCheck, title: 'Seguro e confiável', description: 'Seus dados sempre protegidos' },
  { icon: Zap, title: 'Rápido e simples', description: 'Cadastro fácil e em poucos passos' },
];

export interface AuthLayoutProps {
  /** Texto de apoio abaixo do logo — muda conforme a etapa (seleção vs. wizard). */
  supportText: string;
  /** Terceiro item de destaque — descrição muda entre a tela de seleção e o wizard. */
  thirdHighlightDescription: string;
  /** Badge "Tipo de conta selecionado" — omitido na tela de seleção (Step 0) e no login. */
  accountTypeBadge?: ReactNode;
  /** Link de apoio no canto superior direito (ex.: "Já tem uma conta?" vs. "Não tem conta?"). */
  headerLink?: ReactNode;
  children: ReactNode;
}

const defaultHeaderLink = (
  <p className="text-sm text-gray-500 dark:text-gray-400">
    Já tem uma conta?{' '}
    <Link to="/login" className="font-medium text-violet-700 hover:underline dark:text-violet-400">
      Fazer login
    </Link>
  </p>
);

/**
 * Casca das telas de cadastro/autenticação: painel esquerdo fixo (~38-40%,
 * gradiente + destaques) e painel direito com o conteúdo do step atual.
 * `h-screen`, sem scroll na página — cada step controla seu próprio
 * scroll interno se o conteúdo for maior que a viewport.
 */
export function AuthLayout({
  supportText,
  thirdHighlightDescription,
  accountTypeBadge,
  headerLink = defaultHeaderLink,
  children,
}: AuthLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950">
      <div className="relative hidden w-[38%] shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-800 to-violet-700 p-10 text-white lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute right-8 top-8 grid grid-cols-4 gap-2 opacity-30"
        >
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-white" />
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-10 left-10 grid grid-cols-4 gap-2 opacity-20"
        >
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-white" />
          ))}
        </div>

        <div className="relative flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-violet-700 shadow-lg shadow-violet-900/40 ring-1 ring-white/10">
            <Lock className="h-11 w-11 text-white" />
          </div>
          <p className="text-3xl font-bold tracking-wide">SUA MARCA</p>
          <p className="mt-1 text-violet-200">Design System</p>
          <div className="mt-4 h-1 w-12 rounded-full bg-violet-400" />
          <p className="mt-6 max-w-xs text-sm text-violet-100">{supportText}</p>

          <div className="mt-10 w-full max-w-xs space-y-4 text-left">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 shadow-sm">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-violet-200">{description}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 shadow-sm">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">Feito para você</p>
                <p className="text-xs text-violet-200">{thirdHighlightDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-6 pt-6 lg:px-16">
          <div>{accountTypeBadge}</div>
          {headerLink}
        </div>
        <div className="flex flex-1 flex-col justify-center px-6 py-8 lg:px-16">{children}</div>
      </div>
    </div>
  );
}
