import { NestFactory } from '@nestjs/core';
import { HasuraSyncServiceModule } from './hasura-sync-service.module';
import { HasuraSyncService } from './hasura-sync-service.service';
import { LoggerService } from '@archpad/logger';
import { loadVaultSecrets } from '@archpad/vault-config';

async function bootstrap() {
  // Load secrets from Vault before creating the application
  // В Kubernetes секреты уже загружены через Vault Agent Injector в переменные окружения
  // В local/development загружаем из Vault API
  const nodeEnv = process.env.NODE_ENV || 'development';
  if (nodeEnv !== 'production') {
    // Hasura sync service config (HASURA_SOURCES, HASURA_SCHEMA, etc.)
    await loadVaultSecrets({
      nodeEnv,
      secretsPath: 'kv/data/archpad/demo/backend/hasura-sync-service',
    });
    // Hasura admin secret (required for /v1/metadata, /v2/query)
    await loadVaultSecrets({
      nodeEnv,
      secretsPath: 'kv/data/archpad/demo/hasura/secret',
    });
    // Hasura endpoint (optional; in k8s we use internal URL, locally you may use apim)
    await loadVaultSecrets({
      nodeEnv,
      secretsPath: 'kv/data/archpad/demo/hasura/endpoint',
    });
  }

  const app = await NestFactory.createApplicationContext(
    HasuraSyncServiceModule,
    {
      bufferLogs: true,
    },
  );
  app.useLogger(app.get(LoggerService));

  const svc = app.get(HasuraSyncService);
  await svc.syncAll();

  await app.close();
  process.exit(0);
}
bootstrap().catch((err) => {
  // Используем console.error только для критических ошибок при bootstrap, так как logger может быть недоступен
  console.error('Fatal error in hasura-repo-sync:', err);
  process.exit(1);
});
