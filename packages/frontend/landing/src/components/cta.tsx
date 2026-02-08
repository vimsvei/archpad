'use client';

import Link from 'next/link';
import { T } from '@tolgee/react';
import { Button } from '@/components/ui/button';

type CTAProps = {
  title: React.ReactNode;
  body: React.ReactNode;
  primary?: { labelKey: string; href: string };
  secondary?: { labelKey: string; href: string };
};

export function CTA({ title, body, primary, secondary }: CTAProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      <p className="max-w-2xl text-lg text-muted-foreground">{body}</p>
      <div className="flex flex-wrap justify-center gap-4">
        {primary && (
          <Button asChild size="lg">
            <Link href={primary.href} prefetch={false}>
              <T keyName={primary.labelKey} />
            </Link>
          </Button>
        )}
        {secondary && (
          <Button asChild variant="outline" size="lg">
            <Link href={secondary.href} prefetch={false}>
              <T keyName={secondary.labelKey} />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
