import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AppService } from '../app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  const svc = app.get(AppService);

  await svc.syncAll();

  await app.close();
  process.exit(0);
}
bootstrap().catch((err) => {
  console.error('Fatal error in hasura-repo-sync:', err);
  process.exit(1);
});
