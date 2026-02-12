import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap = Icons as unknown as Record<string, LucideIcon>;

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Icons.HelpCircle;
}
