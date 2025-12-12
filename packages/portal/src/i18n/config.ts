import {ALL_LANGUAGES} from "@/tolgee/shared";

export const locales = ALL_LANGUAGES;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'ru-RU';
