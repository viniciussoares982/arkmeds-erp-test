// services/cnpjService.ts
import axios from 'axios';

/** Ajuste conforme o payload real retornado pela Arkmeds */
export interface ArkmedsCompany {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  cep: string;
  uf: string;
  municipio: string;
  logradouro: string;
  numero: string;
  complemento?: string;
}

/** Instância reaproveitável da API Arkmeds */
const arkmedsApi = axios.create({
  baseURL: 'https://api.arkmeds.com',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'nWCamsFISv84YLTZWPEN61sGyhDnSsqF3eIny8IA'
  },
});

/**
 * Consulta Arkmeds enviando `{ cnpj: "12345678000199" }` via POST.
 *  - `rawCnpj` pode vir mascarado; a função remove tudo que não é dígito.
 *  - Lança erros descritivos para o React Hook Form exibir.
 */
export async function getCompanyByCnpj(
  rawCnpj: string,
): Promise<ArkmedsCompany> {
  const digits = rawCnpj.replace(/\D/g, '');

  if (digits.length !== 14) {
    throw new Error('CNPJ inválido - são esperados 14 dígitos.');
  }

  try {
    const { data } = await arkmedsApi.post<ArkmedsCompany>('/cnpj', {
      cnpj: digits,
    });
    return data;
  } catch (err: unknown) {
    const fallback = 'Erro ao consultar CNPJ na Arkmeds';

    if (axios.isAxiosError(err)) {
      const message = err.response?.data?.message;
      throw new Error(message ?? fallback);
    }

    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error(fallback);
  }
}