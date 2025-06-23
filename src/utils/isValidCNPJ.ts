export function isValidCNPJ(raw: string): boolean {
  const cnpj = raw.replace(/\D/g, '');

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const calc = (len: number) => {
    let sum = 0, pos = len - 7;
    for (let i = len; i >= 1; i--) {
      sum += Number(cnpj[len - i]) * pos--;
      if (pos < 2) pos = 9;
    }
    const res = sum % 11;
    return res < 2 ? 0 : 11 - res;
  };

  return calc(12) === Number(cnpj[12]) && calc(13) === Number(cnpj[13]);
}