import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button, Modal, Select } from '../../../components/ui';
import { alterarStatusSchema, type AlterarStatusFormData } from '../schemas/usuario.schemas';
import type { MembershipStatus } from '../../../users/types';
import { MEMBERSHIP_STATUS_META, MEMBERSHIP_STATUS_OPTIONS } from '../../../users/utils';

export interface AlterarStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Status atual do vínculo com esta conta (`AdminUserListItem.status`) — não o status global do usuário. */
  currentStatus: MembershipStatus;
  onSubmit: (data: AlterarStatusFormData) => void;
  isSubmitting?: boolean;
}

/** `PATCH /users/:id/status` — altera o status do vínculo do usuário com esta conta (`UpdateUserStatusDto`). */
export function AlterarStatusModal({ open, onOpenChange, currentStatus, onSubmit, isSubmitting }: AlterarStatusModalProps) {
  const { control, handleSubmit } = useForm<AlterarStatusFormData>({
    resolver: zodResolver(alterarStatusSchema),
    defaultValues: { status: currentStatus },
  });

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Title>Alterar status do usuário</Modal.Title>
        <Modal.Description>Define o novo status da conta deste usuário.</Modal.Description>

        <form id="alterar-status-form" onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  {MEMBERSHIP_STATUS_OPTIONS.map((status) => (
                    <Select.Item key={status} value={status}>
                      {MEMBERSHIP_STATUS_META[status].label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            )}
          />
        </form>

        <Modal.Footer>
          <Modal.Close asChild>
            <Button type="button" variant="secondary" disabled={isSubmitting}>
              Cancelar
            </Button>
          </Modal.Close>
          <Button type="submit" form="alterar-status-form" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Salvando…' : 'Salvar status'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
