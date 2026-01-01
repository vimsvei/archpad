import { LoggerService } from '@archpad/logger';
import { HasuraClientService } from '../hasura-client/hasura-client.service';

export async function reloadMetadata(args: {
  hasura: HasuraClientService;
  logger: LoggerService;
}): Promise<void> {
  const { hasura, logger } = args;
  logger.log('Reloading Hasura metadata...');
  try {
    await hasura.postMetadata({
      type: 'reload_metadata',
      args: { reload_remote_schemas: true, reload_sources: true },
    });
  } catch (e) {
    logger.warn(`Failed to reload metadata: ${e}`);
  }
}
