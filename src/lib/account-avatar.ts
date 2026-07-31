/**
 * Paleta de cor do avatar de iniciais de uma conta no `AccountSwitcherMenu`.
 * A API não retorna cor/ícone por conta — a cor é derivada do `id` (mesmo
 * id sempre cai na mesma cor), só para diferenciar contas visualmente.
 */
const ACCOUNT_AVATAR_PALETTE = [
  'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
  'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
];

export function getAccountAvatarColorClass(accountId: string): string {
  let hash = 0;
  for (let i = 0; i < accountId.length; i++) {
    hash = (hash * 31 + accountId.charCodeAt(i)) | 0;
  }
  return ACCOUNT_AVATAR_PALETTE[Math.abs(hash) % ACCOUNT_AVATAR_PALETTE.length];
}
