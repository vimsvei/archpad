# Tolgee: auth.footer.agree и auth.common.continue

## auth.footer.agree

Ключ с параметром `{button}` — подставляется текст кнопки формы (Create account, Sign in, Send code и т.д.).

Важно: сохраните параметр `{button}` и теги `<terms>...</terms>`, `<privacy>...</privacy>`.

| Язык | Код | Текст |
|------|-----|-------|
| English | en | By clicking {button}, you agree to our <terms>Terms of Service</terms> and <privacy>Privacy Policy</privacy>. |
| Русский | ru-RU | Нажимая «{button}», вы соглашаетесь с нашими <terms>Условиями использования</terms> и <privacy>Политикой конфиденциальности</privacy>. |
| Español | es-ES | Al hacer clic en {button}, acepta nuestros <terms>Términos de servicio</terms> y <privacy>Política de privacidad</privacy>. |
| Srpski | sr | Klikom na {button} prihvatate naše <terms>Uslove korišćenja</terms> i <privacy>Politiku privatnosti</privacy>. |

## auth.common.continue

Запасной ключ для страниц без явной кнопки (например verify-email). Fallback: "continue".

| Язык | Код | Текст |
|------|-----|-------|
| English | en | continue |
| Русский | ru-RU | продолжить |
| Español | es-ES | continuar |
| Srpski | sr | nastavak |

## Связь с формами

| Страница | footerSubmitButtonKey | Текст кнопки |
|----------|----------------------|--------------|
| sign-up | auth.sign-up.submit | Create account / Создать аккаунт |
| sign-in | auth.sign-in.submit | Sign in / Войти |
| recovery | auth.common.submit-send-code | Send code / Отправить код |
| verify | auth.common.submit-send-code | Send code / Отправить код |
| verify-email | (default) | auth.common.continue |
