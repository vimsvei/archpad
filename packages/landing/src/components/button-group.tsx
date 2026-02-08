'use client';

import Link from 'next/link';
import { T } from '@tolgee/react';
import { Button } from '@/components/ui/button';

type ButtonGroupProps = {
  primary?: { labelKey: string; href: string };
  secondary?: { labelKey: string; href: string };
};

export function ButtonGroup({ primary, secondary }: ButtonGroupProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {primary && (
        <Button asChild size="lg">
          <Link href={primary.href}>
            <T keyName={primary.labelKey} />
          </Link>
        </Button>
      )}
      {secondary && (
        <Button asChild variant="outline" size="lg">
          <Link href={secondary.href}>
            <T keyName={secondary.labelKey} />
          </Link>
        </Button>
      )}
    </div>
  );
}
