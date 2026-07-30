import type { ComponentPropsWithoutRef, Ref } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../../../lib/utils';

interface AvatarProps extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  ref?: Ref<HTMLSpanElement>;
}

function AvatarRoot({ className, ref, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn('relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  );
}

interface AvatarImageProps extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  ref?: Ref<HTMLImageElement>;
}

function AvatarImage({ className, ref, ...props }: AvatarImageProps) {
  return <AvatarPrimitive.Image ref={ref} className={cn('h-full w-full object-cover', className)} {...props} />;
}

interface AvatarFallbackProps extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  ref?: Ref<HTMLSpanElement>;
}

function AvatarFallback({ className, ref, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center bg-violet-100 text-sm font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
        className,
      )}
      {...props}
    />
  );
}

/** Wrapper estilizado de `@radix-ui/react-avatar`. */
export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});
