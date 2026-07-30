import {
  Activity,
  Boxes,
  Calendar,
  LayoutDashboard,
  LineChart,
  Megaphone,
  MessagesSquare,
  Settings,
  UserSquare2,
  Wallet,
  Workflow,
} from 'lucide-react';
import { moduleColors } from './module-colors';
import type { MenuGroup } from '../types/rbac';

/**
 * Configuração estática do menu — grupos e itens, cada um com a permissão
 * necessária para ser exibido. `useVisibleMenu` filtra isto contra as
 * permissões da conta ativa (ver `useSessionStore`).
 *
 * Para adicionar um item novo: acrescente-o ao grupo correspondente aqui
 * e inclua a `requiredPermission` nas contas que devem enxergá-lo em
 * `src/lib/mock-accounts.ts` (`mockMemberships`).
 */
export const menuConfig: MenuGroup[] = [
  {
    id: 'navegacao',
    label: 'Navegação',
    collapsible: false,
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/', requiredPermission: 'nav.dashboard' },
      { id: 'visao-geral', label: 'Visão Geral', icon: LineChart, path: '/visao-geral', requiredPermission: 'nav.visao-geral' },
      { id: 'relatorios', label: 'Relatórios', icon: Boxes, path: '/relatorios', requiredPermission: 'nav.relatorios' },
      { id: 'atividades', label: 'Atividades', icon: Activity, path: '/atividades', requiredPermission: 'nav.atividades' },
      { id: 'calendario', label: 'Calendário', icon: Calendar, path: '/calendario', requiredPermission: 'nav.calendario' },
    ],
  },
  {
    id: 'cadastros',
    label: 'Cadastros',
    collapsible: true,
    colorClass: moduleColors.cadastros.iconClassName,
    items: [
      { id: 'cadastros-alunos', label: 'Alunos', icon: UserSquare2, path: '/cadastros/alunos', requiredPermission: 'cadastros.alunos' },
      { id: 'cadastros-instrutores', label: 'Instrutores', icon: UserSquare2, path: '/cadastros/instrutores', requiredPermission: 'cadastros.instrutores' },
      { id: 'cadastros-veiculos', label: 'Veículos', icon: UserSquare2, path: '/cadastros/veiculos', requiredPermission: 'cadastros.veiculos' },
    ],
  },
  {
    id: 'financeiro',
    label: 'Financeiro',
    collapsible: true,
    colorClass: moduleColors.financeiro.iconClassName,
    items: [
      { id: 'financeiro-receitas', label: 'Receitas', icon: Wallet, path: '/financeiro/receitas', requiredPermission: 'financeiro.receitas' },
      { id: 'financeiro-despesas', label: 'Despesas', icon: Wallet, path: '/financeiro/despesas', requiredPermission: 'financeiro.despesas' },
      { id: 'financeiro-faturas', label: 'Faturas', icon: Wallet, path: '/financeiro/faturas', requiredPermission: 'financeiro.faturas' },
    ],
  },
  {
    id: 'comunicacao',
    label: 'Comunicação',
    collapsible: true,
    colorClass: moduleColors.comunicacao.iconClassName,
    items: [
      { id: 'comunicacao-mensagens', label: 'Mensagens', icon: MessagesSquare, path: '/comunicacao/mensagens', requiredPermission: 'comunicacao.mensagens' },
      { id: 'comunicacao-notificacoes', label: 'Notificações', icon: MessagesSquare, path: '/comunicacao/notificacoes', requiredPermission: 'comunicacao.notificacoes' },
    ],
  },
  {
    id: 'operacoes',
    label: 'Operações',
    collapsible: true,
    colorClass: moduleColors.operacoes.iconClassName,
    items: [
      { id: 'operacoes-aulas', label: 'Aulas', icon: Workflow, path: '/operacoes/aulas', requiredPermission: 'operacoes.aulas' },
      { id: 'operacoes-frota', label: 'Frota', icon: Workflow, path: '/operacoes/frota', requiredPermission: 'operacoes.frota' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    collapsible: true,
    colorClass: moduleColors.marketing.iconClassName,
    items: [
      { id: 'marketing-campanhas', label: 'Campanhas', icon: Megaphone, path: '/marketing/campanhas', requiredPermission: 'marketing.campanhas' },
      { id: 'marketing-promocoes', label: 'Promoções', icon: Megaphone, path: '/marketing/promocoes', requiredPermission: 'marketing.promocoes' },
    ],
  },
  {
    id: 'configuracoes',
    label: 'Configurações',
    collapsible: true,
    colorClass: moduleColors.configuracoes.iconClassName,
    items: [
      { id: 'configuracoes-geral', label: 'Geral', icon: Settings, path: '/configuracoes/geral', requiredPermission: 'configuracoes.geral' },
      { id: 'configuracoes-usuarios', label: 'Usuários', icon: Settings, path: '/configuracoes/usuarios', requiredPermission: 'configuracoes.usuarios' },
    ],
  },
];
