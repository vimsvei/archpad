'use client';

import Link from 'next/link';
import { T } from '@tolgee/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

type UseCaseItem = {
  slug: string;
  titleKey: string;
  descriptionKey: string;
};

type UseCaseCardsProps = {
  items: UseCaseItem[];
};

export function UseCaseCards({ items }: UseCaseCardsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link key={item.slug} href={`/use-cases/${item.slug}`}>
          <Card className="h-full transition-colors hover:bg-accent/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base">
                <T keyName={item.titleKey} />
              </CardTitle>
              <ChevronRight className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <T keyName={item.descriptionKey} />
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
