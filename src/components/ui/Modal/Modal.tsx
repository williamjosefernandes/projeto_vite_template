import type { ComponentPropsWithoutRef, HTMLAttributes, Ref } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../../lib/utils';

const ModalRoot = DialogPrimitive.Root;
const ModalTrigger = DialogPrimitive.Trigger;
const ModalClose = DialogPrimitive.Close;

interface ModalContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  ref?: Ref<HTMLDivElement>;
  showCloseButton?: boolean;
}

function ModalContent({ className, children, ref, showCloseButton = true, ...props }: ModalContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg focus:outline-none dark:border-gray-800 dark:bg-gray-900',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-md text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:text-gray-200">
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

interface ModalHeadingProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  ref?: Ref<HTMLHeadingElement>;
}

function ModalTitle({ className, ref, ...props }: ModalHeadingProps) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('text-base font-semibold text-gray-900 dark:text-gray-100', className)}
      {...props}
    />
  );
}

interface ModalDescriptionProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
  ref?: Ref<HTMLParagraphElement>;
}

function ModalDescription({ className, ref, ...props }: ModalDescriptionProps) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn('mt-1 text-sm text-gray-600 dark:text-gray-300', className)}
      {...props}
    />
  );
}

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

function ModalFooter({ className, ref, ...props }: ModalFooterProps) {
  return <div ref={ref} className={cn('mt-6 flex justify-end gap-2', className)} {...props} />;
}

/**
 * Wrapper estilizado de `@radix-ui/react-dialog`.
 * Uso: `<Modal><Modal.Trigger />...<Modal.Content><Modal.Title/>...<Modal.Footer/></Modal.Content></Modal>`.
 */
export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Title: ModalTitle,
  Description: ModalDescription,
  Footer: ModalFooter,
  Close: ModalClose,
});
