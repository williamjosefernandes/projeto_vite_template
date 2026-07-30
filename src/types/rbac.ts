import type { LucideIcon } from 'lucide-react';

export type Permission = string;

export interface Account {
  id: string;
  name: string;
  description: string;
  colorClass: string;
  icon: LucideIcon;
}

export interface AccountMembership {
  accountId: string;
  permissions: Permission[];
}

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  requiredPermission: Permission;
}

export interface MenuGroup {
  id: string;
  label: string;
  collapsible: boolean;
  colorClass?: string;
  items: MenuItem[];
}
