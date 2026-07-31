import { Skeleton } from '../../components/ui';

/** Tela cheia exibida enquanto a sessão persistida está sendo restaurada (rehydrate do `useAuthStore`). */
export function SessionLoadingScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-xs space-y-4 px-6">
        <Skeleton className="mx-auto h-12 w-12 rounded-2xl" />
        <Skeleton className="mx-auto h-4 w-32" />
        <Skeleton className="mx-auto h-3 w-48" />
      </div>
    </div>
  );
}
