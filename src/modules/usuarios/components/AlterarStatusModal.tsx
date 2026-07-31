import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Alert, Button, Modal, Select } from '../../../components/ui';
import { alterarStatusSchema, type AlterarStatusFormData } from '../schemas/usuario.schemas';
import type { UserStatus } from '../../../users/types';

const STATUS_OPTIONS: { value: UserStatus; label: string }[] = [
  { value: 'PENDING_EMAIL', label: 'Pendente de confirmação de e-mail' },
  { value: 'ACTIVE', label: 'Ativo' },
  { value: 'SUSPENDED', label: 'Suspenso' },
  { value: 'BLOCKED', label: 'Bloqueado' },
];

export interface AlterarStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStatus: UserStatus;
  onSubmit: (data: AlterarStatusFormData) => void;
  isSubmitting?: boolean;
}

/**
 * `PATCH /users/:id/status` — contrato documentado (`UpdateUserStatusDto`) usa
 * o enum `UserStatus`, mas o service grava esse valor direto em
 * `Membership.status` (`MembershipStatus`, sem `PENDING_EMAIL`/`BLOCKED`) — ver
 * `docs/09-integracao-usuarios-admin-e-cadastro.md`. Só `ACTIVE`/`SUSPENDED`
 * existem nos dois enums; os outros dois valores tendem a falhar no servidor.
 */
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
                  {STATUS_OPTIONS.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            )}
          />

          <Alert
            variant="warning"
            title="Inconsistência conhecida no backend"
            description="Os status “Pendente de confirmação de e-mail” e “Bloqueado” não existem no vínculo do usuário com a conta e tendem a falhar ao salvar — reportado à equipe de backend."
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
