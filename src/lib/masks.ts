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
