import {
  BoxSelect,
  Circle,
  Component,
  Database,
  FileStack,
  Fingerprint,
  Grid3x3,
  LayoutGrid,
  LayoutPanelTop,
  MessageSquareWarning,
  MousePointerClick,
  Navigation,
  Palette,
  PencilLine,
  Ruler,
  Shapes,
  Sparkles,
  Square,
  SquareStack,
  TableProperties,
  Type,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface DesignSystemMenuItem {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  path: string;
  /** Página provisória — imagem de referência ainda não recebida (ver docs/00-indice.md). */
  provisional?: boolean;
}

export interface DesignSystemMenuGroup {
  id: string;
  label: string;
  items: DesignSystemMenuItem[];
}

const BASE_PATH = '/design-system';

export const dsMenuGroups: DesignSystemMenuGroup[] = [
  {
    id: 'fundamentos',
    label: 'Fundamentos',
    items: [
      {
        id: 'visao-geral',
        label: 'Visão Geral',
        description: 'Fundamentos visuais e padrões que constroem a experiência da interface.',
        icon: Sparkles,
        path: `${BASE_PATH}/visao-geral`,
      },
      {
        id: 'tokens',
        label: 'Tokens',
        description: 'Variáveis de design que garantem consistência entre todos os componentes.',
        icon: Component,
        path: `${BASE_PATH}/tokens`,
      },
      {
        id: 'cores',
        label: 'Cores',
        description: 'Paleta de cores primárias, de acento e neutras usada em toda a interface.',
        icon: Palette,
        path: `${BASE_PATH}/cores`,
      },
      {
        id: 'tipografia',
        label: 'Tipografia',
        description: 'Hierarquia tipográfica e estilos de texto padronizados.',
        icon: Type,
        path: `${BASE_PATH}/tipografia`,
      },
      {
        id: 'icones',
        label: 'Ícones',
        description: 'Biblioteca de ícones outline usada em toda a aplicação.',
        icon: Shapes,
        path: `${BASE_PATH}/icones`,
      },
      {
        id: 'espacamento',
        label: 'Espaçamento',
        description: 'Escala de espaçamento baseada em grid de 8px.',
        icon: Ruler,
        path: `${BASE_PATH}/espacamento`,
      },
      {
        id: 'sombras',
        label: 'Sombras',
        description: 'Elevação e profundidade através de sombras padronizadas.',
        icon: SquareStack,
        path: `${BASE_PATH}/sombras`,
      },
      {
        id: 'bordas',
        label: 'Bordas',
        description: 'Espessura, estilo e cor de bordas usadas nos componentes.',
        icon: Square,
        path: `${BASE_PATH}/bordas`,
        provisional: true,
      },
      {
        id: 'radios',
        label: 'Radios',
        description: 'Seleção única entre opções mutuamente exclusivas.',
        icon: Circle,
        path: `${BASE_PATH}/radios`,
      },
      {
        id: 'checkbox',
        label: 'Checkbox',
        description: 'Estados e variações do componente de seleção múltipla.',
        icon: BoxSelect,
        path: `${BASE_PATH}/checkbox`,
      },
    ],
  },
  {
    id: 'componentes',
    label: 'Componentes',
    items: [
      {
        id: 'layout',
        label: 'Layout',
        description: 'Estruturas de página, grids e containers do produto.',
        icon: LayoutPanelTop,
        path: `${BASE_PATH}/layout`,
      },
      {
        id: 'navegacao',
        label: 'Navegação',
        description: 'Componentes usados para orientar e mover o usuário pela aplicação.',
        icon: Navigation,
        path: `${BASE_PATH}/navegacao`,
      },
      {
        id: 'inputs',
        label: 'Inputs',
        description: 'Campos de entrada de texto e seus estados.',
        icon: PencilLine,
        path: `${BASE_PATH}/inputs`,
      },
      {
        id: 'formularios',
        label: 'Formulários',
        description: 'Composição de campos, validação e padrões de formulário.',
        icon: FileStack,
        path: `${BASE_PATH}/formularios`,
      },
      {
        id: 'dados',
        label: 'Dados',
        description: 'Componentes para exibição de dados e listas.',
        icon: Database,
        path: `${BASE_PATH}/dados`,
      },
      {
        id: 'feedback',
        label: 'Feedback',
        description: 'Alertas, toasts e mensagens de retorno ao usuário.',
        icon: MessageSquareWarning,
        path: `${BASE_PATH}/feedback`,
      },
      {
        id: 'sobreposicoes',
        label: 'Sobreposições',
        description: 'Modais, popovers e demais elementos flutuantes.',
        icon: LayoutGrid,
        path: `${BASE_PATH}/sobreposicoes`,
      },
      {
        id: 'dashboard',
        label: 'Dashboard',
        description: 'Padrões de composição de painéis e indicadores.',
        icon: Grid3x3,
        path: `${BASE_PATH}/dashboard`,
      },
      {
        id: 'graficos',
        label: 'Gráficos',
        description: 'Wrappers de visualização de dados baseados em Recharts.',
        icon: TableProperties,
        path: `${BASE_PATH}/graficos`,
      },
      {
        id: 'tabelas',
        label: 'Tabelas',
        description: 'Exibição tabular com ordenação, busca e paginação.',
        icon: TableProperties,
        path: `${BASE_PATH}/tabelas`,
      },
      {
        id: 'estados',
        label: 'Estados',
        description: 'Estados visuais de sucesso, erro, carregamento e vazio.',
        icon: MessageSquareWarning,
        path: `${BASE_PATH}/estados`,
      },
      {
        id: 'autenticacao',
        label: 'Autenticação',
        description: 'Telas e componentes usados nos fluxos de login e acesso.',
        icon: Fingerprint,
        path: `${BASE_PATH}/autenticacao`,
        provisional: true,
      },
      {
        id: 'select',
        label: 'Select',
        description: 'Componente de seleção com suporte a busca e múltiplas opções.',
        icon: MousePointerClick,
        path: `${BASE_PATH}/select`,
        provisional: true,
      },
    ],
  },
];

export const dsMenuItems = dsMenuGroups.flatMap((group) => group.items);
