/** Configuração mínima de uma série para os wrappers de gráfico em linha/área/barra. */
export interface ChartSeriesConfig {
  /** Chave do campo em cada item de `data`. */
  key: string;
  /** Rótulo exibido na legenda/tooltip. Por padrão usa `key`. */
  label?: string;
  /** Cor hex explícita. Por padrão: série 0 usa violet-600, as demais usam cinza neutro. */
  color?: string;
}
