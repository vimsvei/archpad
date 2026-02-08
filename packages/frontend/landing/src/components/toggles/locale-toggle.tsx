'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTolgee } from '@tolgee/react';
import { LOCALES } from '@/tolgee/shared';
import { setLanguage } from '@/tolgee/language';

export function LocaleToggle() {
  const tolgee = useTolgee(['language']);
  const currentLocale = tolgee.getLanguage();
  const router = useRouter();
  const [_, startTransition] = useTransition();

  const onValueChange = (newLocale: string) => {
    if (!newLocale || newLocale === currentLocale) return;
    void setLanguage(newLocale);
    tolgee.changeLanguage(newLocale);
    startTransition(() => router.refresh());
  };

  return (
    <Select value={currentLocale} onValueChange={onValueChange}>
      <SelectTrigger size="sm" className="w-[130px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((locale) => (
          <SelectItem value={locale.code} key={locale.code}>
            <span className="inline-flex items-center gap-2">
              {locale.flag && <span className="text-base leading-none">{locale.flag}</span>}
              {locale.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
