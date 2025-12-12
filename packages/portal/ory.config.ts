import type {OryClientConfiguration} from "@ory/elements-react";

const config: OryClientConfiguration = {
  project: {
      default_locale: 'ru-RU',
      default_redirect_url: `/dashboard`,
      error_ui_url: `/error`,
      locale_behavior: "force_default",
      name: "Archpad (next + ory)",
      registration_enabled: true,
      verification_enabled: true,
      recovery_enabled: true,
      registration_ui_url: `/sign-up`,
      verification_ui_url: `/verify`,
      recovery_ui_url: `/recovery`,
      login_ui_url: `/sign-in`,
      settings_ui_url: ""
  }
}

export default config;
