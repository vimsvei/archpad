import { DevTools, Tolgee } from '@tolgee/web';
import { FormatIcu } from '@tolgee/format-icu';

function getTolgeeApiKey(): string | undefined {
  return process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
}

/**
 * Server: prefers TOLGEE_API_URL (internal K8s, e.g. http://tolgee.platform.svc:8080).
 * Client: uses NEXT_PUBLIC_TOLGEE_API_URL (public, for fallback fetch).
 */
function getTolgeeApiUrl(): string | undefined {
  if (typeof window === 'undefined') {
    return (
      process.env.TOLGEE_API_URL ??
      process.env.TOLGEE_INTERNAL_API_URL ??
      process.env.NEXT_PUBLIC_TOLGEE_API_URL
    );
  }
  return process.env.NEXT_PUBLIC_TOLGEE_API_URL;
}

export const ALL_LANGUAGES = ['en', 'ru-RU', 'es-ES', 'sr'];
export const SUPPORTED_LOCALES = ALL_LANGUAGES;

export type Locale = {
  code: string;
  label: string;
  flag?: string;
};

export const LOCALES: Locale[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru-RU', label: 'Русский', flag: '🇷🇺' },
  { code: 'es-ES', label: 'Español', flag: '🇪🇸' },
  { code: 'sr', label: 'Srpski', flag: '🇷🇸' },
];

export const DEFAULT_LANGUAGE = 'ru-RU';

export function TolgeeBase() {
  const apiKey = getTolgeeApiKey();
  const apiUrl = getTolgeeApiUrl();

  const tolgee = Tolgee()
    .use(FormatIcu())
    .updateDefaults({
      apiKey: apiKey || undefined,
      apiUrl: apiUrl || undefined,
    });

  if (process.env.NODE_ENV === 'development') {
    tolgee.use(DevTools());
  }

  return tolgee;
}
