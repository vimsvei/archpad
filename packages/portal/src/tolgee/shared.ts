import { DevTools, Tolgee } from '@tolgee/web';
import {FormatIcu} from "@tolgee/format-icu";

// В Next.js переменные NEXT_PUBLIC_* должны быть доступны во время сборки
// Они встраиваются в бандл на этапе next build
// Если они не доступны во время сборки, они будут undefined в runtime
const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL;

// Логирование для отладки
if (typeof window === 'undefined') {
  // Серверная часть
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
  if (!apiKey || !apiUrl) {
    console.warn('[Tolgee] Missing configuration:', {
      apiKey: !!apiKey,
      apiUrl: !!apiUrl
    });
  }
  
  return Tolgee()
  .use(FormatIcu())
  .use(DevTools())
  .updateDefaults({
    apiKey: apiKey || undefined,
    apiUrl: apiUrl || undefined,
  });
}
