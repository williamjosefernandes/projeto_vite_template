import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Loader2, Mail, ShieldCheck, UserPlus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { CheckboxField } from '../../components/ui/Checkbox';
import { Typography } from '../../components/ui/Typography';
import { PublicLayout } from '../../auth/layouts';
import { PasswordField } from '../../auth/components';
import { useLogin } from '../../auth/hooks';
import { loginSchema, type LoginFormData } from './schemas/login.schema';

const SUPPORT_TEXT =
  'Um sistema completo para construir produtos digitais consistentes, acessíveis e de alta qualidade.';

export function LoginPage() {
  const login = useLogin();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = (data: LoginFormData) => {
    login.mutate({ email: data.email, password: data.password, authProvider: 'LOCAL' });
  };

  return (
    <PublicLayout
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

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              E-mail
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                className="pl-10"
                {...register('email')}
              />
            </div>
            {errors.email && <p className="text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>}
          </div>

          <PasswordField
            id="password"
            label="Senha"
            placeholder="Digite sua senha"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between">
            <Controller
              control={control}
              name="rememberMe"
              render={({ field }) => (
                <CheckboxField
                  id="remember-me"
                  label="Lembrar de mim"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={login.isPending}>
            {login.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {login.isPending ? 'Entrando…' : 'Entrar'}
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
    </PublicLayout>
  );
}
