'use client';

import { T } from '@tolgee/react';

type TwoColProps = {
  leftTitle: React.ReactNode;
  rightTitle: React.ReactNode;
  leftItems: string[];
  rightItems: string[];
};

export function TwoCol({
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
}: TwoColProps) {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      <div>
        <h3 className="mb-4 text-xl font-semibold">{leftTitle}</h3>
        <ul className="space-y-2 text-muted-foreground">
          {leftItems.map((key) => (
            <li key={key} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive" />
              <T keyName={key} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-4 text-xl font-semibold">{rightTitle}</h3>
        <ul className="space-y-2 text-muted-foreground">
          {rightItems.map((key) => (
            <li key={key} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <T keyName={key} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
