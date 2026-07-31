import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'A senha deve conter pelo menos 8 caracteres.')
      .regex(/[a-zA-Z]/, 'A senha deve conter letras.')
      .regex(/[0-9]/, 'A senha deve conter números.'),
    confirmPassword: z.string().min(1, 'Confirme sua senha.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
