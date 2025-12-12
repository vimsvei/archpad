import createMiddleware from 'next-intl/middleware';
import {ALL_LANGUAGES, DEFAULT_LANGUAGE} from "@/tolgee/shared";
import oryConfig from "../ory.config";
import {createOryMiddleware} from "@ory/nextjs/middleware";

export default createMiddleware({
  locales: ALL_LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
  localePrefix: 'as-needed',
});

export const oryMiddleware = createOryMiddleware(oryConfig)

export const config = {}
