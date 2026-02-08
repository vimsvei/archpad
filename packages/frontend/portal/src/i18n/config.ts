export const locales = ['en', 'ru-RU'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'ru-RU';
