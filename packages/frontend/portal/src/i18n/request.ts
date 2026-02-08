import {getRequestConfig} from "next-intl/server";
import { defaultLocale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? defaultLocale;
  return {
    locale,
    // We use Tolgee for translations; keep next-intl config minimal.
    messages: {},
  };
});
