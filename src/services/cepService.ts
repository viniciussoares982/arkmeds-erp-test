import axios from 'axios';

/** Tipagem básica do ViaCEP.
 *  Acrescente ou remova campos conforme seu uso real. */
export interface ViaCepAddress {
  cep: string;        // "01001-000"
  logradouro: string; // "Praça da Sé"
  complemento: string;
  bairro: string;
  localidade: string; // município
  uf: string;         // estado
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
}

const viaCepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws',
  timeout: 10_000,
});

/**
 * Consulta ViaCEP enviando o CEP (com ou sem máscara).
 * Retorna o endereço tipado ou lança erro com mensagem amigável.
 */
export async function getAddressByCep(rawCep: string): Promise<ViaCepAddress> {
  const digits = rawCep.replace(/\D/g, '');

  if (digits.length !== 8) {
    throw new Error('CEP inválido – são esperados 8 dígitos.');
  }


  try {
    const { data } = await viaCepApi.get<ViaCepAddress>(`/${digits}/json/`);

    if ('erro' in data) {
      throw new Error('CEP não encontrado.');
    }

    return data;
  } catch (err: unknown) {
    const fallback = 'Erro ao consultar CEP no ViaCEP';

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
