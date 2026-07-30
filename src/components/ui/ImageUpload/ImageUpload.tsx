import { useId, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export interface ImageUploadProps {
  label: string;
  helperText?: string;
  icon: ReactNode;
  shape?: 'square' | 'circle';
  accept?: string;
  onFileSelect?: (file: File | null) => void;
  className?: string;
}

/** Área de upload de imagem com preview local. Clique ou arraste um arquivo. */
export function ImageUpload({ label, helperText, icon, shape = 'square', accept = 'image/*', onFileSelect, className }: ImageUploadProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleFile(file: File | null) {
    onFileSelect?.(file);
    if (!file) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-colors hover:border-violet-400 hover:bg-violet-50/50 dark:border-gray-700 dark:bg-gray-800/40 dark:hover:border-violet-600 dark:hover:bg-violet-900/10',
          shape === 'circle' ? 'mx-auto h-32 w-32 rounded-full' : 'rounded-xl',
        )}
      >
        {preview ? (
          <img
            src={preview}
            alt=""
            className={cn('object-cover', shape === 'circle' ? 'h-full w-full rounded-full' : 'h-16 w-16 rounded-lg')}
          />
        ) : (
          <>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
              {icon}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
            {helperText && <span className="text-xs text-gray-400">{helperText}</span>}
          </>
        )}
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  );
}
