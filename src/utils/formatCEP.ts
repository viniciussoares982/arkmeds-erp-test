export function formatCEP(value: string): string {
  return value
    .replace(/\D/g, "") // remove não dígitos
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .substring(0, 9); // garante no máximo 9 caracteres
}
