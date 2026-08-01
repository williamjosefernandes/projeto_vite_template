import { z } from 'zod';
import { isValidCNPJ, isValidCPF } from '../../../lib/br-documents';
import { toIsoDate } from '../../../lib/masks';

/** Mesma regra forte exigida pelo backend em `RegisterDto.password` (`@Matches`). */
const SENHA_FORTE_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

export const acessoSchema = z
  .object({
    nome: z.string().min(1, 'Informe o nome.'),
    sobrenome: z.string().min(1, 'Informe o sobrenome.'),
    email: z.string().min(1, 'Informe o e-mail.').email('Informe um e-mail válido.'),
    senha: z
      .string()
      .min(8, 'A senha deve conter pelo menos 8 caracteres.')
      .regex(SENHA_FORTE_REGEX, 'A senha deve conter 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial (@$!%*?&).'),
    confirmarSenha: z.string().min(1, 'Confirme sua senha.'),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem.',
    path: ['confirmarSenha'],
  });

export type AcessoData = z.infer<typeof acessoSchema>;

export const confirmarEmailSchema = z.object({
  codigo: z.string().length(6, 'Informe o código de 6 dígitos.'),
});

export type ConfirmarEmailData = z.infer<typeof confirmarEmailSchema>;

const GENEROS = ['MALE', 'FEMALE', 'OTHER', 'NOT_INFORMED'] as const;

/** Step "Dados Pessoais" (Customer) — `CreatePersonalDataDto` no backend. */
export const dadosPessoaisSchema = z.object({
  cpf: z.string().refine((value) => isValidCPF(value), { message: 'Informe um CPF válido.' }),
  dataNascimento: z
    .string()
    .length(10, 'Informe a data completa (DD/MM/AAAA).')
    .refine(
      (value) => {
        const iso = toIsoDate(value);
        if (!iso) return false;
        const date = new Date(iso);
        return !Number.isNaN(date.getTime()) && date.getTime() <= Date.now() && date.getFullYear() >= 1900;
      },
      { message: 'Informe uma data de nascimento válida (não pode estar no futuro).' },
    ),
  telefone: z.string().min(14, 'Informe um telefone válido.'),
  genero: z.enum(GENEROS, { message: 'Selecione o gênero.' }),
});

export type DadosPessoaisData = z.infer<typeof dadosPessoaisSchema>;

/** Step "Endereço" (Customer e Company, componente compartilhado) — `CreateAddressDto` no backend. */
export const enderecoSchema = z.object({
  cep: z.string().min(9, 'Informe um CEP válido.'),
  logradouro: z.string().min(1, 'Informe o logradouro.'),
  numero: z.string().min(1, 'Informe o número.'),
  complemento: z.string().optional(),
  bairro: z.string().min(1, 'Informe o bairro.'),
  cidade: z.string().min(1, 'Informe a cidade.'),
  estado: z.string().min(1, 'Selecione o estado.'),
  paisId: z.string().min(1, 'Selecione o país.'),
});

export type EnderecoData = z.infer<typeof enderecoSchema>;

/** Step "Empresa" (Company) — `CreateCompanyDataDto` no backend. */
export const empresaDadosSchema = z.object({
  logoUrl: z.string().optional(),
  razaoSocial: z.string().min(1, 'Informe a razão social.'),
  nomeFantasia: z.string().min(1, 'Informe o nome fantasia.'),
  cnpj: z.string().refine((value) => isValidCNPJ(value), { message: 'Informe um CNPJ válido.' }),
  emailEmpresa: z.string().min(1, 'Informe o e-mail da empresa.').email('Informe um e-mail válido.'),
  telefoneComercial: z.string().min(14, 'Informe um telefone válido.'),
  whatsapp: z.string().min(14, 'Informe um WhatsApp válido.'),
  site: z.string().optional().or(z.literal('')),
});

export type EmpresaDadosData = z.infer<typeof empresaDadosSchema>;

const IDIOMAS = ['PT_BR', 'EN_US', 'ES_ES'] as const;

/** Step "Personalização" (Company) — `CreatePersonalizationDto` no backend. */
export const personalizacaoSchema = z.object({
  nomeConta: z.string().min(1, 'Informe o nome da conta.'),
  logoUrl: z.string().optional(),
  idioma: z.enum(IDIOMAS, { message: 'Selecione o idioma.' }),
  timezone: z.string().min(1, 'Selecione o fuso horário.'),
});

export type PersonalizacaoData = z.infer<typeof personalizacaoSchema>;

/**
 * Step "Confirmação" (ambos os fluxos) — `CompleteOnboardingDto` no backend.
 * `.refine` (não `z.literal(true)`) de propósito: mantém o tipo inferido como
 * `boolean` (não o literal `true`), compatível com o estado inicial
 * `useState(false)` dos checkboxes — a validação de "precisa ser true"
 * acontece do mesmo jeito, só no `refine`.
 */
export const confirmacaoSchema = z.object({
  termos: z.boolean().refine((value) => value === true, { message: 'É necessário aceitar os Termos de Uso.' }),
  privacidade: z.boolean().refine((value) => value === true, { message: 'É necessário aceitar a Política de Privacidade.' }),
});

export type ConfirmacaoData = z.infer<typeof confirmacaoSchema>;
