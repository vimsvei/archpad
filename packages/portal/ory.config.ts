import type {OryClientConfiguration} from "@ory/elements-react";

const config: OryClientConfiguration = {
  sdk: {
    url: process.env.NEXT_PUBLIC_ORY_SDK_URL,
    options: {
      credentials: 'include',
    },
  },
  project: {
      default_locale: 'ru-RU',
      default_redirect_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
      error_ui_url: `${process.env.NEXT_PUBLIC_URL}/error`,
      locale_behavior: "force_default",
      name: "Archpad (next + ory)",
      registration_enabled: true,
      verification_enabled: true,
      recovery_enabled: true,
      registration_ui_url: `${process.env.NEXT_PUBLIC_URL}/sign-up`,
      verification_ui_url: `${process.env.NEXT_PUBLIC_URL}/verify`,
      recovery_ui_url: `${process.env.NEXT_PUBLIC_URL}/recovery`,
      login_ui_url: `${process.env.NEXT_PUBLIC_URL}/sign-in`,
      settings_ui_url: ""
  }
}

export default config;
