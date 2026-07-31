import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button, Input, Modal } from '../../../components/ui';
import { criarUsuarioSchema, type CriarUsuarioFormData } from '../schemas/usuario.schemas';

export interface CriarUsuarioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CriarUsuarioFormData) => void;
  isSubmitting?: boolean;
}

/** `POST /users` — convida um usuário para a conta ativa (`CreateUserAdminDto`). */
export function CriarUsuarioModal({ open, onOpenChange, onSubmit, isSubmitting }: CriarUsuarioModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CriarUsuarioFormData>({
    resolver: zodResolver(criarUsuarioSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '', profileId: '' },
  });

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) reset();
      }}
    >
      <Modal.Content>
        <Modal.Title>Novo usuário</Modal.Title>
        <Modal.Description>
          O usuário recebe um e-mail para definir a própria senha e acessar esta conta.
        </Modal.Description>

        <form id="criar-usuario-form" onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
              <Input {...register('firstName')} />
              {errors.firstName && <p className="text-xs text-red-600 dark:text-red-400">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sobrenome</label>
              <Input {...register('lastName')} />
              {errors.lastName && <p className="text-xs text-red-600 dark:text-red-400">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
            <Input type="email" {...register('email')} />
            {errors.email && <p className="text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefone (opcional)</label>
            <Input placeholder="+5511999999999" {...register('phone')} />
            {errors.phone ? (
              <p className="text-xs text-red-600 dark:text-red-400">{errors.phone.message}</p>
            ) : (
              <p className="text-xs text-gray-400">Formato internacional E.164, ex.: +5511999999999.</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">ID do perfil (UUID)</label>
            <Input placeholder="00000000-0000-0000-0000-000000000000" {...register('profileId')} />
            {errors.profileId ? (
              <p className="text-xs text-red-600 dark:text-red-400">{errors.profileId.message}</p>
            ) : (
              <p className="text-xs text-gray-400">
                O backend ainda não expõe uma listagem de perfis da conta — informe o UUID diretamente.
              </p>
            )}
          </div>
        </form>

        <Modal.Footer>
          <Modal.Close asChild>
            <Button type="button" variant="secondary" disabled={isSubmitting}>
              Cancelar
            </Button>
          </Modal.Close>
          <Button type="submit" form="criar-usuario-form" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Criando…' : 'Criar usuário'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
