import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, UserPlus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { CheckboxField } from '../../components/ui/Checkbox';
import { Typography } from '../../components/ui/Typography';
import { AuthLayout } from '../cadastro/components/AuthLayout';

const SUPPORT_TEXT =
  'Um sistema completo para construir produtos digitais consistentes, acessíveis e de alta qualidade.';

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
    <AuthLayout
      supportText={SUPPORT_TEXT}
      thirdHighlightDescription="Padrões que facilitam a evolução"
      headerLink={
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Não tem uma conta?{' '}
          <Link to="/cadastro" className="font-medium text-violet-700 hover:underline dark:text-violet-400">
            Cadastre-se
          </Link>
        </p>
      }
    >
      <div className="mx-auto w-full max-w-sm">
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

        <Link
          to="/cadastro"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-violet-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-violet-400 dark:hover:bg-gray-800"
        >
          <UserPlus className="h-4 w-4" />
          Criar minha conta
        </Link>

        <p className="mt-6 flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
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
    </AuthLayout>
  );
}
