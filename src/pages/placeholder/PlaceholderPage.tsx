import { Typography } from '../../components/ui';

interface PlaceholderPageProps {
  title: string;
}

/** Placeholder genérico para rotas do menu ainda sem conteúdo de negócio. */
export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex h-full min-h-[60vh] flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
      <Typography variant="h2">{title}</Typography>
      <Typography variant="body">Conteúdo desta tela ainda não foi construído.</Typography>
    </div>
  );
}
