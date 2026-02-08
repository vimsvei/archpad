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

/**
 * For server-side logging only. Does not expose apiKey.
 * apiUrlSource: which env var was used (for debugging prod API unreachable issues).
 */
export function getTolgeeEnvInfo(): {
  apiUrl: string | undefined;
  hasApiKey: boolean;
  apiUrlSource: 'TOLGEE_API_URL' | 'TOLGEE_INTERNAL_API_URL' | 'NEXT_PUBLIC_TOLGEE_API_URL' | 'none';
  isInternalUrl: boolean;
} {
  const url =
    process.env.TOLGEE_API_URL ??
    process.env.TOLGEE_INTERNAL_API_URL ??
    process.env.NEXT_PUBLIC_TOLGEE_API_URL;

  let source: 'TOLGEE_API_URL' | 'TOLGEE_INTERNAL_API_URL' | 'NEXT_PUBLIC_TOLGEE_API_URL' | 'none' = 'none';
  if (process.env.TOLGEE_API_URL) source = 'TOLGEE_API_URL';
  else if (process.env.TOLGEE_INTERNAL_API_URL) source = 'TOLGEE_INTERNAL_API_URL';
  else if (process.env.NEXT_PUBLIC_TOLGEE_API_URL) source = 'NEXT_PUBLIC_TOLGEE_API_URL';

  const isInternal =
    !!url &&
    (url.includes('.svc') || url.includes('tolgee:') || url.startsWith('http://tolgee'));

  return {
    apiUrl: url,
    hasApiKey: Boolean(getTolgeeApiKey()),
    apiUrlSource: source,
    isInternalUrl: isInternal,
  };
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

/**
 * Fallback: Tolgee project may use "ru" while we use "ru-RU" in UI.
 * Same for es-ES -> es, etc.
 */
const FALLBACK_LANGUAGE: Record<string, string[]> = {
  'ru-RU': ['ru', 'en'],
  'es-ES': ['es', 'en'],
};

export function TolgeeBase() {
  const apiKey = getTolgeeApiKey();
  const apiUrl = getTolgeeApiUrl();

  const tolgee = Tolgee()
    .use(FormatIcu())
    .updateDefaults({
      apiKey: apiKey || undefined,
      apiUrl: apiUrl || undefined,
      fallbackLanguage: FALLBACK_LANGUAGE,
      availableLanguages: ALL_LANGUAGES,
      // Static JSON — fetched at Docker build from Tolgee API. Fallback when API unreachable (prod K8s).
      // Update locally: pnpm fetch-tolgee (requires NEXT_PUBLIC_TOLGEE_API_KEY)
      staticData: {
        en: () => import('../../messages/en.json'),
        'ru-RU': () => import('../../messages/ru-RU.json'),
        'es-ES': () => import('../../messages/es-ES.json'),
        sr: () => import('../../messages/sr.json'),
      },
    });

  if (process.env.NODE_ENV === 'development') {
    tolgee.use(DevTools());
  }

  return tolgee;
}
