import { z } from 'zod';

/** Mesma regra de `CreateUserAdminDto`/`UpdateUserAdminDto.phone` no backend. */
const PHONE_E164_REGEX = /^\+[1-9]\d{1,14}$/;
const PHONE_MESSAGE = 'Telefone deve seguir o padrão E.164 (ex.: +5511999999999).';

export const criarUsuarioSchema = z.object({
  firstName: z.string().min(1, 'Informe o nome.').max(100, 'Máximo de 100 caracteres.'),
  lastName: z.string().max(100, 'Máximo de 100 caracteres.').optional().or(z.literal('')),
  email: z.string().min(1, 'Informe o e-mail.').email('Informe um e-mail válido.'),
  phone: z.string().regex(PHONE_E164_REGEX, PHONE_MESSAGE).optional().or(z.literal('')),
  profileId: z.string().min(1, 'Informe o ID do perfil.'),
});

export type CriarUsuarioFormData = z.infer<typeof criarUsuarioSchema>;

export const editarUsuarioSchema = z.object({
  firstName: z.string().min(1, 'Informe o nome.').max(100, 'Máximo de 100 caracteres.'),
  lastName: z.string().max(100, 'Máximo de 100 caracteres.').optional().or(z.literal('')),
  phone: z.string().regex(PHONE_E164_REGEX, PHONE_MESSAGE).optional().or(z.literal('')),
});

export type EditarUsuarioFormData = z.infer<typeof editarUsuarioSchema>;

/** Valores documentados por `UpdateUserStatusDto` (enum `UserStatus` do Prisma). */
export const alterarStatusSchema = z.object({
  status: z.enum(['PENDING_EMAIL', 'ACTIVE', 'BLOCKED', 'SUSPENDED']),
});

export type AlterarStatusFormData = z.infer<typeof alterarStatusSchema>;
