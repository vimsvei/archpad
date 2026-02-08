'use client';

import { T } from '@tolgee/react';

type StepItem = {
  titleKey: string;
  bodyKey: string;
};

type StepsProps = {
  items: StepItem[];
};

export function Steps({ items }: StepsProps) {
  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
            {index + 1}
          </div>
          <div>
            <h3 className="mb-2 font-semibold">
              <T keyName={item.titleKey} />
            </h3>
            <p className="text-muted-foreground">
              <T keyName={item.bodyKey} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
