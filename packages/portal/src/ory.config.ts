import type {OryClientConfiguration} from "@ory/elements-react";

const config: OryClientConfiguration = {
  project: {
      default_locale: 'ru-RU',
      default_redirect_url: "/",
      error_ui_url: "/error",
      locale_behavior: "force_default",
      name: "Archpad (next + ory)",
      registration_enabled: true,
      verification_enabled: true,
      recovery_enabled: true,
      registration_ui_url: "/auth/sign-up",
      verification_ui_url: "/auth/verify",
      recovery_ui_url: "/auth/recovery",
      login_ui_url: "/auth/sign-in",
      settings_ui_url: ""
  }
}

export default config;
