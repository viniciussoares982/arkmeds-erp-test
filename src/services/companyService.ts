import axios from 'axios';
import { getErrorMessage } from '@/utils/getErrorMessage';

export interface Company {
  razao_social: string;
  nome_fantasia: string;
  estado: string;
  municipio: string;
  cnpj: string;
}

export interface CompanyYield {
  valor_rendimento: number;
}

export interface NewCompanyPayload {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  cep: string;
  estado: string;
  municipio: string;
  logradouro: string;
  numero: number;
  complemento?: string;
}

const BASE_URL = 'https://n8ndev.arkmeds.xyz/webhook/14686c31-d3ab-4356-9c90-9fbd2feff9f1';

const arkmedsApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ARKMEDS_TOKEN ?? ''}`,
  },
});

/** Lista todas as empresas cadastradas. */
export async function listCompanies(): Promise<Company[]> {
  try {
    const { data } = await arkmedsApi.get<Company[]>('/companies/');
    return data;
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err, 'Erro ao listar empresas'));
  }
}

/**
 * Obtém o rendimento de uma empresa pelo CNPJ.
 * Aceita CNPJ mascarado ou apenas dígitos.
 */
export async function getCompanyYield(
  rawCnpj: string,
): Promise<CompanyYield> {
  const digits = rawCnpj.replace(/\D/g, '');

  if (digits.length !== 14) {
    throw new Error('CNPJ inválido - são esperados 14 dígitos.');
  }

  try {
    const { data } = await arkmedsApi.get<CompanyYield>(
      `/companies/cnpj/${digits}`,
    );
    return data;
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err, 'Erro ao buscar rendimento da empresa'));
  }
}

/**
 * Cria uma nova empresa via POST /companies
 * Exemplo de uso:
 *
 * await createCompany({
 *   cnpj: '12.345.678/0001-99',
 *   razaoSocial: 'Empresa Exemplo LTDA',
 *   nomeFantasia: 'Exemplo Comércio',
 *   cep: '12345-678',
 *   estado: 'SP',
 *   municipio: 'São Paulo',
 *   logradouro: 'Rua Exemplo',
 *   numero: 123,
 *   complemento: 'Prédio 2, Sala 301',
 * });
 */

export async function createCompany(
  payload: NewCompanyPayload,
): Promise<void> {
  try {
    await arkmedsApi.post('/companies', payload);
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err, 'Erro ao criar empresa'));
  }
}