'use server';

import { cookies, headers } from 'next/headers';
import { detectLanguageFromHeaders } from '@tolgee/react/server';
import { ALL_LANGUAGES, DEFAULT_LANGUAGE } from './shared';

const LOCALE_COOKIE = 'archpad_locale';

export async function setLanguage(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
}

export async function getLanguage(): Promise<string> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (locale && ALL_LANGUAGES.includes(locale)) {
    return locale;
  }
  const detected = detectLanguageFromHeaders(await headers(), ALL_LANGUAGES);
  return detected || DEFAULT_LANGUAGE;
}
