import { isAxiosError } from 'axios';

export function extractMessage(err: unknown, fallback: string): string {
  if (isAxiosError(err)) {
    const message = err.response?.data?.message;
    if (typeof message === 'string') {
      return message;
    }
    return err.message;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return fallback;
}
