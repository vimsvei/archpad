import { TolgeeBase } from './shared';
import { createServerInstance } from '@tolgee/react/server';
import {getLocale} from "next-intl/server";

export const { getTolgee, getTranslate, T } = createServerInstance({
    getLocale: getLocale,
    createTolgee: async (language) => {
      return TolgeeBase().init({
        observerOptions: {
          fullKeyEncode: true,
        },
        language,
      });
    },
  });
