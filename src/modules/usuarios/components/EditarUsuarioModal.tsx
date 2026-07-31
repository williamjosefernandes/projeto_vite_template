import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button, Input, Modal } from '../../../components/ui';
import { editarUsuarioSchema, type EditarUsuarioFormData } from '../schemas/usuario.schemas';

export interface EditarUsuarioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: EditarUsuarioFormData;
  onSubmit: (data: EditarUsuarioFormData) => void;
  isSubmitting?: boolean;
}

/**
 * `PUT /users/:id` — edita dados básicos (`UpdateUserAdminDto`: sem `email`,
 * que não é editável por esse endpoint). Monte com `key={usuario.userId}` no
 * chamador para que `initialValues` seja aplicado ao trocar de usuário.
 */
export function EditarUsuarioModal({ open, onOpenChange, initialValues, onSubmit, isSubmitting }: EditarUsuarioModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditarUsuarioFormData>({
    resolver: zodResolver(editarUsuarioSchema),
    defaultValues: initialValues,
  });

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Title>Editar usuário</Modal.Title>
        <Modal.Description>Atualize os dados básicos deste usuário.</Modal.Description>

        <form id="editar-usuario-form" onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 space-y-4">
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
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefone (opcional)</label>
            <Input placeholder="+5511999999999" {...register('phone')} />
            {errors.phone ? (
              <p className="text-xs text-red-600 dark:text-red-400">{errors.phone.message}</p>
            ) : (
              <p className="text-xs text-gray-400">Formato internacional E.164, ex.: +5511999999999.</p>
            )}
          </div>
        </form>

        <Modal.Footer>
          <Modal.Close asChild>
            <Button type="button" variant="secondary" disabled={isSubmitting}>
              Cancelar
            </Button>
          </Modal.Close>
          <Button type="submit" form="editar-usuario-form" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Salvando…' : 'Salvar alterações'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
