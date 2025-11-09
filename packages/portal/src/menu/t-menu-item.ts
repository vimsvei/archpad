import type {LucideIcon} from "lucide-react";

export type TMenuItem = {
  title: string
  url?: string
  color?: string;
  icon?: LucideIcon
  isActive?: boolean
  items?: TMenuItem[]
}

export type TMenuItemGroup = {
  title: string
  items: TMenuItem[]
}

export type TMenu = TMenuItemGroup[]
export type TSecondaryMenu = TMenuItem[]
