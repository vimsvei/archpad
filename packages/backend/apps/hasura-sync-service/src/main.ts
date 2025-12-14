import { NestFactory } from '@nestjs/core';
import { HasuraSyncServiceModule } from './hasura-sync-service.module';
import { HasuraSyncService } from './hasura-sync-service.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(
    HasuraSyncServiceModule,
    {
      logger: ['log', 'error', 'warn'],
    },
  );

  const svc = app.get(HasuraSyncService);
  await svc.syncAll();

  await app.close();
  process.exit(0);
}
bootstrap().catch((err) => {
  console.error('Fatal error in hasura-repo-sync:', err);
  process.exit(1);
});
