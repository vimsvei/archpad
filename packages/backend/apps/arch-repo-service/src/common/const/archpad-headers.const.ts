export const ARCHPAD_HEADERS = {
  USER_ID: 'x-archpad-user-id',
  TENANT_IDS: 'x-archpad-tenant-ids',
  ROLES: 'x-archpad-roles',
} as const;

export type ArchpadHeaderKey = keyof typeof ARCHPAD_HEADERS;
export type ArchpadHeaderName = (typeof ARCHPAD_HEADERS)[ArchpadHeaderKey];
