'use client';

import Link from 'next/link';
import { T } from '@tolgee/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

type IntegrationItem = {
  name: string;
  href: string;
  bodyKey: string;
};

type IntegrationListProps = {
  items: IntegrationItem[];
};

export function IntegrationList({ items }: IntegrationListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Link key={item.name} href={item.href}>
          <Card className="h-full transition-colors hover:bg-accent/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base">{item.name}</CardTitle>
              <ChevronRight className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <T keyName={item.bodyKey} />
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
