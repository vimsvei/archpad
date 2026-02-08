import { TolgeeBase } from './shared';
import { createServerInstance } from '@tolgee/react/server';
import { getLanguage } from './language';

export const { getTolgee, getTranslate, T } = createServerInstance({
  getLocale: getLanguage,
    createTolgee: async (language) => {
      return TolgeeBase().init({
        observerOptions: {
          fullKeyEncode: true,
        },
        language,
      });
    },
  });
