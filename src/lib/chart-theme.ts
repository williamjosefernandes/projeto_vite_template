import { useEffect, useState } from 'react';

/**
 * Cores hex usadas pelo Recharts (que exige `string`, não classe Tailwind).
 * Mantém os wrappers de `components/charts` livres de cor "hardcoded".
 */
export const chartColors = {
  primary: '#7C3AED', // violet-600
  secondary: '#9CA3AF', // gray-400
  /** Paleta para gráficos categóricos (ex.: fatias do DonutChartCard). */
  categorical: ['#7C3AED', '#A78BFA', '#9CA3AF', '#D1D5DB', '#6B7280', '#4B5563'],
  grid: {
    light: '#E5E7EB',
    dark: '#1F2937',
  },
  axisText: {
    light: '#6B7280', // gray-500
    dark: '#9CA3AF', // gray-400
  },
  tooltip: {
    light: { bg: '#FFFFFF', border: '#E5E7EB', text: '#111827' },
    dark: { bg: '#1F2937', border: '#374151', text: '#F3F4F6' },
  },
} as const;

export interface ChartTheme {
  primary: string;
  secondary: string;
  grid: string;
  axisText: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipText: string;
}

export function isDarkMode(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

/** Resolve os tokens de cor do gráfico conforme o tema. Por padrão detecta o tema atual da página. */
export function getChartTheme(isDark: boolean = isDarkMode()): ChartTheme {
  return {
    primary: chartColors.primary,
    secondary: chartColors.secondary,
    grid: isDark ? chartColors.grid.dark : chartColors.grid.light,
    axisText: isDark ? chartColors.axisText.dark : chartColors.axisText.light,
    tooltipBg: isDark ? chartColors.tooltip.dark.bg : chartColors.tooltip.light.bg,
    tooltipBorder: isDark ? chartColors.tooltip.dark.border : chartColors.tooltip.light.border,
    tooltipText: isDark ? chartColors.tooltip.dark.text : chartColors.tooltip.light.text,
  };
}

/**
 * Igual a `getChartTheme`, mas reativo: observa a classe `.dark` em `<html>`
 * (ver `useTheme`) e reflete a mudança de tema nos gráficos sem reload.
 */
export function useChartTheme(): ChartTheme {
  const [isDark, setIsDark] = useState(isDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setIsDark(root.classList.contains('dark')));
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return getChartTheme(isDark);
}
