import { DevTools, Tolgee } from '@tolgee/web';
import {FormatIcu} from "@tolgee/format-icu";
import { createServerLogger } from '@archpad/logger';

const log = createServerLogger('tolgee');

// В Next.js переменные NEXT_PUBLIC_* встраиваются в бандл во время сборки
// Но они также могут быть доступны в runtime через environment variables
// Используем функции для чтения в runtime, чтобы они читались каждый раз, а не замораживались при импорте
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

// Флаг для логирования конфигурации только один раз
let configLogged = false;

// Логирование для отладки (выполняется только один раз при первом вызове)
function logTolgeeConfigOnce() {
  if (configLogged) return;
  configLogged = true;
  
  const apiKey = getTolgeeApiKey();
  const apiUrl = getTolgeeApiUrl();
  
  const apiKeyMasked = apiKey
    ? (apiKey.length > 20 ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 10)}` : `${apiKey.substring(0, 10)}...`)
    : 'NOT SET';
  const side = typeof window === 'undefined' ? 'Server' : 'Client';
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'development') {
    log.info(`Config ${side}: apiKey=${apiKeyMasked} apiUrl=${apiUrl || 'NOT SET'} NODE_ENV=${process.env.NODE_ENV}`);
  }
}

export const ALL_LANGUAGES = ['en', 'ru-RU', 'es-ES', 'sr'];

export type Locale = {
  code: string;
  label: string;
  flag?: string
};

export const LOCALES: Locale[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru-RU", label: "Русский", flag: "🇷🇺" },
  { code: "es-ES", label: "Español", flag: "🇪🇸" },
  { code: "sr", label: "Srpski", flag: "🇷🇸" },
]

export const DEFAULT_LANGUAGE = 'ru-RU';

export function TolgeeBase() {
  // Читаем переменные в runtime, а не во время импорта модуля
  const apiKey = getTolgeeApiKey();
  const apiUrl = getTolgeeApiUrl();
  
  // Логируем конфигурацию только один раз при первом вызове
  logTolgeeConfigOnce();
  
  if (!apiKey || !apiUrl) {
    log.warn({ apiKey: !!apiKey, apiUrl: !!apiUrl });
    log.warn('Translations will not work without API key and URL!');
  }
  
  const tolgee = Tolgee()
    .use(FormatIcu())
    .updateDefaults({
      apiKey: apiKey || undefined,
      apiUrl: apiUrl || undefined,
    });
  
  // DevTools включаем только в development режиме
  // В production он создает избыточные логи (heartbeat/ping)
  if (process.env.NODE_ENV === 'development') {
    tolgee.use(DevTools());
  }
  
  return tolgee;
}
