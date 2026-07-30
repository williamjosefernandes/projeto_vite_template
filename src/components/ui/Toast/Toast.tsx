import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';

/**
 * `<Toaster />` do sonner com o visual do Design System.
 * As cores usam classes `dark:`, então acompanham o tema (classe `.dark` na
 * tag `<html>`, ver `useTheme`) sem precisar de estado React próprio.
 * Monte uma única vez no root da aplicação (`main.tsx`).
 */
export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      toastOptions={{
        classNames: {
          toast:
            'rounded-xl !border !border-gray-200 !bg-white text-sm !text-gray-900 shadow-md dark:!border-gray-800 dark:!bg-gray-900 dark:!text-gray-100',
          title: 'font-medium',
          description: '!text-gray-500 dark:!text-gray-400',
          actionButton: '!bg-violet-600 !text-white',
          cancelButton: '!bg-gray-100 !text-gray-700 dark:!bg-gray-800 dark:!text-gray-200',
          closeButton:
            '!bg-white !border-gray-200 !text-gray-400 hover:!text-gray-600 dark:!bg-gray-900 dark:!border-gray-800 dark:hover:!text-gray-200',
          success: '!border-green-200 dark:!border-green-900/50 [&_svg]:!text-green-600 dark:[&_svg]:!text-green-400',
          error: '!border-red-200 dark:!border-red-900/50 [&_svg]:!text-red-600 dark:[&_svg]:!text-red-400',
          info: '!border-blue-200 dark:!border-blue-900/50 [&_svg]:!text-blue-600 dark:[&_svg]:!text-blue-400',
          warning: '!border-amber-200 dark:!border-amber-900/50 [&_svg]:!text-amber-600 dark:[&_svg]:!text-amber-400',
        },
      }}
      {...props}
    />
  );
}
