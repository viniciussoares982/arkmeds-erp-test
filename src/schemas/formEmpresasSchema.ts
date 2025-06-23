import { formatCEP } from "@/utils/formatCEP";
import { formatCNPJ } from "@/utils/formatCNPJ";
import { isValidCNPJ } from "@/utils/isValidCNPJ";
import { z } from "zod";

export const empresaSchema = z.object({
  cnpj: z
    .string()
    .max(18, 'CNPJ excede tamanho máximo')
    .transform(formatCNPJ)
    .refine(isValidCNPJ, 'CNPJ inválido'),

  razaoSocial: z
    .string()
    .max(100, 'Máx. 100 caracteres')
    .nonempty('Razão Social obrigatória'),

  nomeFantasia: z
    .string()
    .max(100, 'Máx. 100 caracteres')
    .nonempty('Nome Fantasia obrigatória'),

  cep: z
    .string()
    .max(100, 'Máx. 100 caracteres')
    .transform(formatCEP)
    .refine((v) => v.replace(/\D/g, '').length === 8, 'CEP inválido'),

  estado: z
    .string()
    .max(2, 'Use a sigla do Estado')
    .nonempty('Estado obrigatório'),

  municipio: z.string().nonempty('Município obrigatório'),

  logradouro: z.string(),

  numero: z
    .number({ invalid_type_error: 'Número inválido' })
    .int('Sem decimais')
    .nonnegative('Sem negativos'),

  complemento: z.string().max(300, 'Máx. 300 caracteres').optional(),
});

export type EmpresaFormData = z.infer<typeof empresaSchema>;