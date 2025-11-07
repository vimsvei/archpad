import {getRequestConfig} from "next-intl/server";
import {defaultLocale, locales} from "@/i18n/config";

// export default getRequestConfig(async ({ requestLocale }) => {
//   // const locale = await requestLocale;
//   const final = locales.includes(requestLocale as any) ? requestLocale : defaultLocale;
//   return {
//     locale: final,
//     messages: { },
//   };
// });

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  return {
    // do this to make next-intl not emmit any warnings
    locale,
    messages: { locale: locale! },
  };
});
