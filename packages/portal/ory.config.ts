// Minimal config object used by `@ory/nextjs/app` helpers (getLoginFlow, getRegistrationFlow, ...).
// We intentionally avoid importing types from `@ory/elements-react` since we no longer use Ory Elements UI.
type OryClientConfigurationLike = {
  project: {
    // minimal set required by @ory/nextjs/app helpers
    settings_ui_url: string
    login_ui_url: string
    registration_ui_url: string
    verification_ui_url: string
    recovery_ui_url: string
    error_ui_url: string

    // other commonly used project settings
    default_locale?: string
    default_redirect_url?: string
    locale_behavior?: string
    name?: string
    registration_enabled?: boolean
    verification_enabled?: boolean
    recovery_enabled?: boolean

    // allow extra keys without losing type-safety on required urls
    [key: string]: unknown
  }
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
