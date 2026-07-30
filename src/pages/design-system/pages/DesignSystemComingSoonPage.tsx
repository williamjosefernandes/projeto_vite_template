import { useLocation } from 'react-router-dom';
import { Card, Typography } from '../../../components/ui';
import { dsMenuItems } from '../../../lib/ds-menu-config';

/**
 * Placeholder para menus da documentação ainda não construídos (prompts
 * DS-02 em diante). Substituído por um `<XyzPage />` completo quando o
 * respectivo prompt for executado.
 */
export function DesignSystemComingSoonPage() {
  const location = useLocation();
  const item = dsMenuItems.find((i) => i.path === location.pathname);

  return (
    <Card className="flex flex-col items-center gap-2 py-16 text-center">
      <Typography as="h2" variant="h2">
        {item?.label ?? 'Em breve'}
      </Typography>
      <Typography className="max-w-md">
        Esta página da documentação ainda será construída. {item?.provisional
          ? 'Aguardando o print de referência para o ajuste fino.'
          : 'Volte em breve.'}
      </Typography>
    </Card>
  );
}
