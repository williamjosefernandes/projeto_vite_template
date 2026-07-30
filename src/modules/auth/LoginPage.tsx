import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect to dashboard
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white p-4 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white/80 shadow-2xl shadow-blue-900/5 ring-1 ring-gray-900/5 backdrop-blur-xl dark:bg-slate-900/80 dark:shadow-blue-900/20 dark:ring-white/10">
        <div className="p-8 sm:p-10">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Bem-vindo de volta
            </h1>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Insira suas credenciais para acessar sua conta
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
                >
                  E-mail
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="voce@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
                  >
                    Senha
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative group">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-gray-200">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 transition focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-800"
                />
                Lembrar de mim por 30 dias
              </label>
            </div>

            <Button
              type="submit"
              className="group w-full h-11 text-base font-medium shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30"
            >
              Entrar
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </div>

        <div className="border-t border-gray-100 bg-gray-50/50 px-8 py-5 text-center text-sm text-gray-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-gray-400">
          Não tem uma conta?{' '}
          <a
            href="#"
            className="font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400"
          >
            Crie sua conta agora
          </a>
        </div>
      </div>
    </div>
  );
}
