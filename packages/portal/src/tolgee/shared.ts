import { DevTools, Tolgee } from '@tolgee/web';
import {FormatIcu} from "@tolgee/format-icu";

const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL;

export const ALL_LANGUAGES = ['en', 'ru-RU', 'es-ES'];

export type Locale = {
  code: string;
  label: string;
  flag?: string
};

export const LOCALES: Locale[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru-RU", label: "Русский", flag: "🇷🇺" },
  { code: "es-ES", label: "Español", flag: "🇪🇸" },
]

export const DEFAULT_LANGUAGE = 'ru-RU';

export function TolgeeBase() {
  return Tolgee()
  .use(FormatIcu())
  .use(DevTools())
  .updateDefaults({
    apiKey,
    apiUrl,
  });
}
