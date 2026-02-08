'use client';

import { T } from '@tolgee/react';
import {
  Layers,
  Link2,
  FileText,
  Shield,
  Plug,
  Eye,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  layers: Layers,
  link: Link2,
  'file-text': FileText,
  shield: Shield,
  plug: Plug,
  eye: Eye,
};

type FeatureItem = {
  id: string;
  icon: string;
  titleKey: string;
  bodyKey: string;
};

type FeatureGridProps = {
  items: FeatureItem[];
  className?: string;
};

export function FeatureGrid({ items, className }: FeatureGridProps) {
  return (
    <div
      className={cn(
        'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {items.map((item) => {
        const Icon = iconMap[item.icon] ?? Layers;
        return (
          <Card key={item.id}>
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="size-5 text-primary" />
              </div>
              <CardTitle>
                <T keyName={item.titleKey} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                <T keyName={item.bodyKey} />
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
