import type { BadgeProps } from '../../components/ui/Badge';
import type { MembershipStatus } from '../types';

/**
 * Rótulo/variante de `Badge` por `MembershipStatus` — única fonte de verdade,
 * compartilhada entre a coluna "Vínculo" da tabela e o modal "Alterar status"
 * (ambos em `src/modules/usuarios`), para não duplicar os textos em PT-BR.
 */
export const MEMBERSHIP_STATUS_META: Record<MembershipStatus, { label: string; variant: BadgeProps['variant'] }> = {
  ACTIVE: { label: 'Ativo', variant: 'success' },
  INVITED: { label: 'Convidado', variant: 'info' },
  SUSPENDED: { label: 'Suspenso', variant: 'warning' },
  REMOVED: { label: 'Removido', variant: 'neutral' },
};

/** Ordem de exibição no `Select` do modal "Alterar status". */
export const MEMBERSHIP_STATUS_OPTIONS: MembershipStatus[] = ['ACTIVE', 'INVITED', 'SUSPENDED', 'REMOVED'];
