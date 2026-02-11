import type { LucideIcon } from 'lucide-react';

export type TMenuSubItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
};

export type TMenuItem = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  color?: string;
  isActive?: boolean;
  items?: TMenuSubItem[];
};

export type TMenuSection = {
  title: string;
  items: TMenuItem[];
};

export type TMenu = TMenuSection[];

export type TSecondaryMenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export type TSecondaryMenu = TSecondaryMenuItem[];
