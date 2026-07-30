import { z } from 'zod';

export const acessoSchema = z
  .object({
    nome: z.string().min(1, 'Informe o nome.'),
    sobrenome: z.string().min(1, 'Informe o sobrenome.'),
    email: z.string().min(1, 'Informe o e-mail.').email('Informe um e-mail válido.'),
    senha: z
      .string()
      .min(8, 'A senha deve conter pelo menos 8 caracteres.')
      .regex(/[a-zA-Z]/, 'A senha deve conter letras.')
      .regex(/[0-9]/, 'A senha deve conter números.'),
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

export const contaSchema = z.object({
  fotoUrl: z.string().optional(),
  genero: z.string().min(1, 'Selecione o gênero.'),
  dataNascimento: z.string().min(1, 'Informe a data de nascimento.'),
  telefone: z.string().min(1, 'Informe o telefone.'),
});

export type ContaData = z.infer<typeof contaSchema>;

export const empresaDadosSchema = z.object({
  logoUrl: z.string().optional(),
  razaoSocial: z.string().min(1, 'Informe a razão social.'),
  nomeFantasia: z.string().min(1, 'Informe o nome fantasia.'),
  cnpj: z.string().min(1, 'Informe o CNPJ.'),
  emailEmpresa: z.string().min(1, 'Informe o e-mail da empresa.').email('Informe um e-mail válido.'),
  telefoneComercial: z.string().min(1, 'Informe o telefone comercial.'),
  whatsapp: z.string().min(1, 'Informe o WhatsApp.'),
  site: z.string().optional(),
});

export type EmpresaDadosData = z.infer<typeof empresaDadosSchema>;

export const empresaEnderecoSchema = z.object({
  cep: z.string().min(1, 'Informe o CEP.'),
  logradouro: z.string().min(1, 'Informe o logradouro.'),
  numero: z.string().min(1, 'Informe o número.'),
  complemento: z.string().optional(),
  bairro: z.string().min(1, 'Informe o bairro.'),
  cidade: z.string().min(1, 'Informe a cidade.'),
  estado: z.string().min(1, 'Selecione o estado.'),
});

export type EmpresaEnderecoData = z.infer<typeof empresaEnderecoSchema>;
