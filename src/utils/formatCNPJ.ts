export function formatCNPJ(value: string): string {
  return value
    .replace(/\D/g, "") // remove tudo que não for número
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .substring(0, 18); // garante que não ultrapasse o formato
}
