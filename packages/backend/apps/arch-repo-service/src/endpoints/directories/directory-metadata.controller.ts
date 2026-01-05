import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ENTITY_DIRECTORY_KIND_MAPPING } from '@/model/directories/directory-entity-mapping.const';

/**
 * Контроллер для получения метаданных о связях справочников с сущностями.
 * Используется фронтендом для валидации и отображения доступных справочников.
 */
@ApiTags('Directories Metadata')
@Controller('directories/metadata')
export class DirectoryMetadataController {
  @Get('entity-mapping')
  @ApiOperation({
    summary: 'Get mapping of entities to allowed directory kinds',
    description:
      'Returns a mapping of entity names to arrays of allowed DirectoryKind values. ' +
      'Used for validation and UI filtering on the frontend.',
  })
  @ApiOkResponse({
    description: 'Entity to directory kinds mapping',
    schema: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: { type: 'string' },
      },
      example: {
        ApplicationComponent: [
          'COMPONENT_STATE',
          'LICENSE_TYPE',
          'ARCHITECTURE_STYLE',
          'CRITICAL_LEVEL',
          'FAILOVER_TYPE',
          'RECOVERY_TIME',
          'REDUNDANCY_TYPE',
          'MONITORING_LEVEL',
          'SCALING_TYPE',
        ],
      },
    },
  })
  getEntityDirectoryMapping(): Record<string, string[]> {
    // Конвертируем DirectoryKind enum в строки для фронтенда
    const result: Record<string, string[]> = {};
    for (const [entityName, kinds] of Object.entries(
      ENTITY_DIRECTORY_KIND_MAPPING,
    )) {
      result[entityName] = kinds.map((k) => k.toString());
    }
    return result;
  }
}

