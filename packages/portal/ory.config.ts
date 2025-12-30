// Minimal config object used by `@ory/nextjs/app` helpers (getLoginFlow, getRegistrationFlow, ...).
// We intentionally avoid importing types from `@ory/elements-react` since we no longer use Ory Elements UI.
type OryClientConfigurationLike = {
  project: Record<string, unknown>
}

const config: OryClientConfigurationLike = {
  project: {
      default_locale: 'ru-RU',
      default_redirect_url: `/dashboard`,
      error_ui_url: `/error`,
      locale_behavior: "force_default",
      name: "",
      registration_enabled: true,
      verification_enabled: true,
      recovery_enabled: true,
      registration_ui_url: `/sign-up`,
      verification_ui_url: `/verify`,
      recovery_ui_url: `/recovery`,
      login_ui_url: `/sign-in`,
      settings_ui_url: `/settings`
  }
}

export default config;
