import { useState } from 'react';
import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
  type Updater,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../Button';
import { EmptyState } from '../EmptyState';
import { Pagination } from '../Pagination';

export interface TableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  pageSize?: number;
  /** Placeholder do campo de busca global. Se omitido, o campo de busca não é renderizado. */
  filterPlaceholder?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  /**
   * Modo servidor: `data` já é só a página atual (vinda da API) — desliga
   * paginação/sorting locais (não faz sentido ordenar/paginar de novo em cima
   * de um recorte que o servidor já paginou). Requer `pageCount` e o par
   * `pagination`/`onPaginationChange` controlado por quem chama.
   */
  manualPagination?: boolean;
  /** Total de páginas devolvido pela API (`PageMetaDto.totalPages`). Obrigatório quando `manualPagination`. */
  pageCount?: number;
  /** Estado de paginação controlado (0-based) — só usado em modo servidor. */
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
  /**
   * Filtro controlado por quem chama (ex.: dispara busca via API). Quando
   * fornecido junto com `onGlobalFilterChange`, substitui o filtro local —
   * `data` já deve chegar filtrada pelo backend.
   */
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
}

/**
 * Tabela de dados via `@tanstack/react-table`. Por padrão, sorting/filtragem/
 * paginação são locais (client-side) — passe `manualPagination`/
 * `onGlobalFilterChange` para operar em modo servidor (ver `UsuariosTable`,
 * em `src/modules/usuarios`, para um exemplo).
 */
export function Table<TData>({
  columns,
  data,
  pageSize = 10,
  filterPlaceholder,
  emptyTitle = 'Nenhum registro encontrado',
  emptyDescription,
  className,
  manualPagination = false,
  pageCount,
  pagination: controlledPagination,
  onPaginationChange,
  globalFilter: controlledGlobalFilter,
  onGlobalFilterChange,
}: TableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [internalGlobalFilter, setInternalGlobalFilter] = useState('');
  const [internalPagination, setInternalPagination] = useState<PaginationState>({ pageIndex: 0, pageSize });

  const isFilterControlled = onGlobalFilterChange !== undefined;
  const globalFilter = isFilterControlled ? (controlledGlobalFilter ?? '') : internalGlobalFilter;
  const pagination = manualPagination ? (controlledPagination ?? internalPagination) : internalPagination;

  function handleGlobalFilterChange(updater: Updater<string>) {
    const next = typeof updater === 'function' ? updater(globalFilter) : updater;
    if (isFilterControlled) onGlobalFilterChange!(next);
    else setInternalGlobalFilter(next);
  }

  function handlePaginationChange(updater: Updater<PaginationState>) {
    const next = typeof updater === 'function' ? updater(pagination) : updater;
    if (manualPagination && onPaginationChange) onPaginationChange(next);
    else setInternalPagination(next);
  }

  const table = useReactTable({
    data,
    columns,
    state: { sorting: manualPagination ? [] : sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: handleGlobalFilterChange,
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: manualPagination ? undefined : getSortedRowModel(),
    getFilteredRowModel: isFilterControlled ? undefined : getFilteredRowModel(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
    manualPagination,
    manualFiltering: isFilterControlled,
    enableSorting: !manualPagination,
    pageCount: manualPagination ? (pageCount ?? -1) : undefined,
  });

  const rows = table.getRowModel().rows;

  return (
    <div className={cn('w-full', className)}>
      {filterPlaceholder && (
        <div className="mb-3 flex h-10 max-w-xs items-center gap-2 rounded-lg border border-gray-300 px-3 dark:border-gray-700">
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            value={globalFilter}
            onChange={(event) => handleGlobalFilterChange(event.target.value)}
            placeholder={filterPlaceholder}
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-200"
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="w-full text-left text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-gray-800">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortState = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400"
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          disabled={!canSort}
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            'flex items-center gap-1',
                            canSort && 'cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200',
                          )}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort &&
                            (sortState === 'asc' ? (
                              <ArrowUp className="h-3 w-3" />
                            ) : sortState === 'desc' ? (
                              <ArrowDown className="h-3 w-3" />
                            ) : (
                              <ArrowUpDown className="h-3 w-3 opacity-40" />
                            ))}
                        </button>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {rows.length ? (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-gray-700 dark:text-gray-200">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-0">
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {rows.length > 0 && manualPagination && (
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>
            Página {pagination.pageIndex + 1} de {pageCount ?? 1}
          </span>
          <Pagination
            currentPage={pagination.pageIndex + 1}
            totalPages={pageCount ?? 1}
            onPageChange={(page) => handlePaginationChange({ ...pagination, pageIndex: page - 1 })}
          />
        </div>
      )}

      {rows.length > 0 && !manualPagination && (
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount() || 1}
          </span>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Próxima
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
