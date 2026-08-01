/** Máscaras de formatação para inputs de texto (aplicadas via `onChange`). */

export function maskPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, (_, ddd, part1, part2) =>
      part2 ? `(${ddd}) ${part1}-${part2}` : part1 ? `(${ddd}) ${part1}` : ddd ? `(${ddd}` : '',
    );
  }
  return digits.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, (_, ddd, part1, part2) =>
    part2 ? `(${ddd}) ${part1}-${part2}` : part1 ? `(${ddd}) ${part1}` : ddd ? `(${ddd}` : '',
  );
}

export function maskCpf(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2');
}

export function maskCnpj(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

export function maskCep(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  return digits.replace(/^(\d{5})(\d)/, '$1-$2');
}

export function maskDate(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  return digits.replace(/^(\d{2})(\d{2})(\d{0,4}).*/, (_, d, m, y) => (y ? `${d}/${m}/${y}` : m ? `${d}/${m}` : d));
}

/** `DD/MM/AAAA` (como `maskDate` produz) → `AAAA-MM-DD` (o que o backend espera em `@IsDateString()`). */
export function toIsoDate(brDate: string): string {
  const [day, month, year] = brDate.split('/');
  if (!day || !month || !year || year.length !== 4) return '';
  return `${year}-${month}-${day}`;
}

/** Inverso de `toIsoDate` — usado para pré-popular o formulário ao retomar um rascunho salvo no backend. */
export function toBrDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  if (!day || !month || !year) return '';
  return `${day}/${month}/${year}`;
}

/**
 * Telefone com máscara BR (`(11) 91234-5678`, como `maskPhone` produz) → E.164
 * (`+5511912345678`) — formato que o backend exige em todo campo de telefone.
 * Assume DDI 55 (Brasil) — único país suportado pelas máscaras deste arquivo.
 */
export function toE164BR(brPhone: string): string {
  const digits = brPhone.replace(/\D/g, '');
  return digits ? `+55${digits}` : '';
}
