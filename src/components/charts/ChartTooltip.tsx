export interface ChartTooltipPayloadEntry {
  dataKey?: string | number;
  name?: string | number;
  value?: string | number;
  color?: string;
}

export interface ChartTooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: ChartTooltipPayloadEntry[];
}

/** Tooltip customizado compartilhado pelos wrappers de `components/charts`. */
export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-md dark:border-gray-700 dark:bg-gray-800">
      {label !== undefined && <p className="mb-1 font-medium text-gray-900 dark:text-gray-100">{label}</p>}
      <ul className="space-y-0.5">
        {payload.map((entry, index) => (
          <li key={entry.dataKey?.toString() ?? index} className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span>{entry.name}:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{entry.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
