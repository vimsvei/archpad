'use client';

import { T } from '@tolgee/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type PersonaItem = {
  id: string;
  titleKey: string;
  bodyKey: string;
};

type PersonaCardsProps = {
  items: PersonaItem[];
  className?: string;
};

export function PersonaCards({ items, className }: PersonaCardsProps) {
  return (
    <div
      className={cn(
        'grid gap-6 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
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
      ))}
    </div>
  );
}
