/** Espelha `PageMetaDto` do backend — mesclado na raiz da resposta, nunca aninhado em `pagination`. */
export interface PageMeta {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Resposta paginada padrão da API: metadados de página mesclados com `content`. */
export interface Paginated<T> extends PageMeta {
  content: T[];
}

/** `PaginationQueryDto` — parâmetros aceitos por todo endpoint paginado. */
export interface PaginationQuery {
  page?: number;
  size?: number;
}
