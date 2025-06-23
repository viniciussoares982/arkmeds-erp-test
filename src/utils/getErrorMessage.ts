import axios from "axios";

export function getErrorMessage(err: unknown, fallback = 'Erro inesperado'): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message ?? err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return fallback;
}
