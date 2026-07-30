import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ShieldCheckIcon, Sparkles, Zap } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { CheckboxField } from '../../components/ui/Checkbox';
import { Typography } from '../../components/ui/Typography';

const highlights = [
  {
    icon: ShieldCheck,
    title: 'Seguro e confiável',
    description: 'Seus dados sempre protegidos',
  },
  {
    icon: Zap,
    title: 'Rápido e eficiente',
    description: 'Performance que impulsiona',
  },
  {
    icon: Sparkles,
    title: 'Consistente e escalável',
    description: 'Padrões que facilitam a evolução',
  },
];

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-950">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg md:grid-cols-2 dark:bg-gray-900">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-violet-700 p-10 text-white md:flex">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-8 top-10 h-2 w-2 rounded-full bg-white/30"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-24 -right-10 h-56 w-56 rounded-full bg-white/10"
          />

          <div className="relative flex flex-1 flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
              <ShieldCheckIcon className="h-10 w-10 text-white" />
            </div>
            <p className="text-2xl font-bold tracking-wide uppercase">Sua Marca</p>
            <p className="mt-1 text-violet-200">Design System</p>
            <div className="mt-4 h-1 w-10 rounded-full bg-violet-300" />
            <p className="mt-6 max-w-xs text-sm text-violet-100">
              Um sistema completo para construir produtos digitais consistentes, acessíveis e de alta
              qualidade.
            </p>

            <div className="mt-10 w-full max-w-xs space-y-4 text-left">
              {highlights.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-violet-200">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-12">
          <Typography variant="h1" className="text-2xl">
            Bem-vindo de volta! 👋
          </Typography>
          <Typography className="mt-1">Faça login para acessar sua conta</Typography>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                E-mail
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Senha
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <CheckboxField
                id="remember-me"
                label="Lembrar de mim"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <a href="#" className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400">
                Esqueceu sua senha?
              </a>
            </div>

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
            <span className="text-xs text-gray-400">ou</span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          </div>

          <p className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
            <span>
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400">
                Termos de Uso
              </a>{' '}
              e{' '}
              <a href="#" className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400">
                Política de Privacidade
              </a>
              .
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
