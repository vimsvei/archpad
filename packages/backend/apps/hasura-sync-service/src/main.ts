import { NestFactory } from '@nestjs/core';
import { HasuraSyncServiceModule } from './hasura-sync-service.module';
import { HasuraSyncService } from './hasura-sync-service.service';
import { LoggerService } from '@archpad/logger';
import { loadVaultSecrets } from '@archpad/vault-config';

async function bootstrap() {
  // Load secrets from Vault before creating the application
  await loadVaultSecrets({
    nodeEnv: process.env.NODE_ENV,
  });

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
  console.error('Fatal error in hasura-repo-sync:', err);
  process.exit(1);
});
