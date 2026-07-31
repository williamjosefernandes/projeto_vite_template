import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Loader2, Mail, MailCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Typography } from '../../components/ui/Typography';
import { PublicLayout } from '../../auth/layouts';
import { authApi } from '../../auth/api';
import { getApiErrorMessage } from '../../auth/utils';
import { forgotPasswordSchema, type ForgotPasswordFormData } from './schemas/forgot-password.schema';

const SUPPORT_TEXT = 'Vamos te ajudar a recuperar o acesso à sua conta em poucos passos.';

export function ForgotPasswordPage() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const requestReset = useMutation({
    mutationFn: (data: ForgotPasswordFormData) => authApi.forgotPassword(data),
    onSuccess: (_, variables) => setSentTo(variables.email),
    onError: (error) => toast.error(getApiErrorMessage(error, 'Não foi possível enviar o link de recuperação.')),
  });

  return (
    <PublicLayout
      supportText={SUPPORT_TEXT}
      thirdHighlightDescription="Recuperação simples e segura"
      headerLink={
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Lembrou a senha?{' '}
          <Link to="/login" className="font-medium text-violet-700 hover:underline dark:text-violet-400">
            Fazer login
          </Link>
        </p>
      }
    >
      <div className="mx-auto w-full max-w-sm">
        {sentTo ? (
          <>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
              <MailCheck className="h-6 w-6" />
            </div>
            <Typography variant="h1" className="text-2xl">
              Verifique seu e-mail
            </Typography>
            <Typography className="mt-1">
              Se houver uma conta associada a <strong>{sentTo}</strong>, enviamos um link para redefinir sua senha.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h1" className="text-2xl">
              Esqueceu sua senha?
            </Typography>
            <Typography className="mt-1">Informe seu e-mail e enviaremos um link de recuperação.</Typography>

            <form onSubmit={handleSubmit((data) => requestReset.mutate(data))} noValidate className="mt-8 space-y-5">
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

              <Button type="submit" className="w-full" disabled={requestReset.isPending}>
                {requestReset.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {requestReset.isPending ? 'Enviando…' : 'Enviar link de recuperação'}
              </Button>
            </form>
          </>
        )}
      </div>
    </PublicLayout>
  );
}
