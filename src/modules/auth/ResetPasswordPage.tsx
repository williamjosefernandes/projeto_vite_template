import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Typography } from '../../components/ui/Typography';
import { PublicLayout } from '../../auth/layouts';
import { PasswordField } from '../../auth/components';
import { authApi } from '../../auth/api';
import { getApiErrorMessage } from '../../auth/utils';
import { resetPasswordSchema, type ResetPasswordFormData } from './schemas/reset-password.schema';

const SUPPORT_TEXT = 'Crie uma nova senha para voltar a acessar sua conta com segurança.';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const resetPassword = useMutation({
    mutationFn: (data: ResetPasswordFormData) =>
      authApi.resetPassword({ token: token ?? '', newPassword: data.password }),
    onSuccess: () => {
      toast.success('Senha redefinida com sucesso. Faça login com sua nova senha.');
      navigate('/login', { replace: true });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Não foi possível redefinir sua senha.')),
  });

  if (!token) {
    return (
      <PublicLayout supportText={SUPPORT_TEXT} thirdHighlightDescription="Recuperação simples e segura">
        <div className="mx-auto w-full max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <Typography variant="h1" className="text-2xl">
            Link inválido
          </Typography>
          <Typography className="mt-1">
            Este link de redefinição de senha é inválido ou expirou.{' '}
            <Link to="/forgot-password" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
              Solicite um novo link
            </Link>
            .
          </Typography>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout supportText={SUPPORT_TEXT} thirdHighlightDescription="Recuperação simples e segura">
      <div className="mx-auto w-full max-w-sm">
        <Typography variant="h1" className="text-2xl">
          Redefinir senha
        </Typography>
        <Typography className="mt-1">Escolha uma nova senha para sua conta.</Typography>

        <form onSubmit={handleSubmit((data) => resetPassword.mutate(data))} noValidate className="mt-8 space-y-5">
          <PasswordField
            id="password"
            label="Nova senha"
            placeholder="Digite sua nova senha"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <PasswordField
            id="confirmPassword"
            label="Confirmar nova senha"
            placeholder="Repita a nova senha"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" className="w-full" disabled={resetPassword.isPending}>
            {resetPassword.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {resetPassword.isPending ? 'Salvando…' : 'Redefinir senha'}
          </Button>
        </form>
      </div>
    </PublicLayout>
  );
}
