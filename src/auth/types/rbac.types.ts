/** Permissão livre (ex.: "financeiro.receitas") — igual a `src/types/rbac.ts`, retornada pela API. */
export type Permission = string;

/** Código de menu autorizado (`CurrentAccountDto.menus`) — a API devolve só os códigos liberados, sem árvore/rótulo/ícone. */
export type MenuKey = string;

/** Chave de componente granular controlado por `<ComponentGuard component="...">` (`CurrentAccountDto.components`). */
export type ComponentKey = string;
