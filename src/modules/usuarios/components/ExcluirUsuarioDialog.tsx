import { Loader2, TriangleAlert } from 'lucide-react';
import { Button, Modal } from '../../../components/ui';

export interface ExcluirUsuarioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  onConfirm: () => void;
  isSubmitting?: boolean;
}

/** `DELETE /users/:id` — soft delete (remove o vínculo com a conta, não o usuário). */
export function ExcluirUsuarioDialog({ open, onOpenChange, userName, onConfirm, isSubmitting }: ExcluirUsuarioDialogProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content className="max-w-sm">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <TriangleAlert className="h-5 w-5" />
          </span>
          <div>
            <Modal.Title>Remover usuário</Modal.Title>
            <Modal.Description>
              Tem certeza que deseja remover <strong>{userName}</strong> desta conta? Essa ação encerra o vínculo dele
              com a conta (soft delete).
            </Modal.Description>
          </div>
        </div>

        <Modal.Footer>
          <Modal.Close asChild>
            <Button type="button" variant="secondary" disabled={isSubmitting}>
              Cancelar
            </Button>
          </Modal.Close>
          <Button type="button" variant="danger" onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Removendo…' : 'Remover usuário'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
