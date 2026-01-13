import { DevTools, Tolgee } from '@tolgee/web';
import {FormatIcu} from "@tolgee/format-icu";

// В Next.js переменные NEXT_PUBLIC_* встраиваются в бандл во время сборки
// Но они также могут быть доступны в runtime через environment variables
// Используем функции для чтения в runtime, чтобы они читались каждый раз, а не замораживались при импорте
function getTolgeeApiKey(): string | undefined {
  // В Next.js переменные NEXT_PUBLIC_* доступны через process.env
  // Они могут быть встроены в бандл (build time) или доступны в runtime
  return process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
}

function getTolgeeApiUrl(): string | undefined {
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
  
  if (typeof window === 'undefined') {
    // Серверная часть - логируем только один раз
    console.log('[Tolgee Config Server] apiKey:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
    console.log('[Tolgee Config Server] apiUrl:', apiUrl || 'NOT SET');
    console.log('[Tolgee Config Server] NODE_ENV:', process.env.NODE_ENV);
  } else {
    // Клиентская часть (только для отладки в dev режиме)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Tolgee Config Client] apiKey:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
      console.log('[Tolgee Config Client] apiUrl:', apiUrl || 'NOT SET');
    }
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
    console.warn('[Tolgee] Missing configuration:', {
      apiKey: !!apiKey,
      apiUrl: !!apiUrl
    });
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
