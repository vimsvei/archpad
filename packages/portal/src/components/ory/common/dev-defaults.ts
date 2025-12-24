export function getDevDefaultValue(fieldName?: string): string | undefined {
  const isDev = process.env.NODE_ENV !== 'production'
  if (!isDev) return undefined
  switch (fieldName) {
    case 'traits.email':
      return 'alexandr.zelentsov@gmail.com'
    case 'traits.phone':
      return '+79998051081'
    case 'traits.name.first':
      return 'Александр'
    case 'traits.name.last':
      return 'Зеленцов'
    default:
      return undefined
  }
}

