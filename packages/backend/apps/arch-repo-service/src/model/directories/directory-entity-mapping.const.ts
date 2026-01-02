import { DirectoryKind } from '@/model/enums/directory-kind.enum';

/**
 * Маппинг сущностей на разрешенные типы справочников (DirectoryKind).
 * Используется для валидации связей через map-таблицы и для UI на фронтенде.
 * 
 * Ключ - имя сущности (например, 'ApplicationComponent')
 * Значение - массив разрешенных DirectoryKind для этой сущности
 * 
 * @example
 * // Валидация при создании связи:
 * const directoryKind = directory.kind;
 * if (!isDirectoryKindAllowedForEntity('ApplicationComponent', directoryKind)) {
 *   throw new BadRequestException(`Directory kind ${directoryKind} is not allowed for ApplicationComponent`);
 * }
 * 
 * @example
 * // Получение списка разрешенных kinds для фронтенда:
 * const allowedKinds = getAllowedDirectoryKindsForEntity('ApplicationComponent');
 * // Вернет: [COMPONENT_STATE, LICENSE_TYPE, ARCHITECTURE_STYLE, ...]
 */
export const ENTITY_DIRECTORY_KIND_MAPPING: Record<string, DirectoryKind[]> = {
  ApplicationComponent: [
    DirectoryKind.COMPONENT_STATE,
    DirectoryKind.LICENSE_TYPE,
    DirectoryKind.ARCHITECTURE_STYLE,
    DirectoryKind.CRITICAL_LEVEL,
    DirectoryKind.FAILOVER_TYPE,
    DirectoryKind.RECOVERY_TIME,
    DirectoryKind.REDUNDANCY_TYPE,
    DirectoryKind.MONITORING_LEVEL,
    DirectoryKind.SCALING_TYPE,
  ],
  // Здесь можно добавить другие сущности, например:
  // TechnologyNode: [DirectoryKind.NODE_TYPE, ...],
  // Solution: [DirectoryKind.SOLUTION_STATE, ...],
} as const;

/**
 * Получить разрешенные DirectoryKind для указанной сущности
 */
export function getAllowedDirectoryKindsForEntity(
  entityName: string,
): DirectoryKind[] {
  return ENTITY_DIRECTORY_KIND_MAPPING[entityName] ?? [];
}

/**
 * Проверить, разрешен ли указанный DirectoryKind для сущности
 */
export function isDirectoryKindAllowedForEntity(
  entityName: string,
  directoryKind: DirectoryKind,
): boolean {
  const allowedKinds = getAllowedDirectoryKindsForEntity(entityName);
  return allowedKinds.includes(directoryKind);
}

