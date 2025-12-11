import createMiddleware from 'next-intl/middleware';
import {ALL_LANGUAGES, DEFAULT_LANGUAGE} from "@/tolgee/shared";
import oryConfig from "../ory.config";

export default createMiddleware({
  locales: ALL_LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
  localePrefix: 'as-needed',
  ...oryConfig
});
