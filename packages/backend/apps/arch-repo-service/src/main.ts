import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ArchRepoServiceModule } from './arch-repo-service.module';
import { LoggerService } from '@archpad/logger';
import { loadVaultSecrets } from '@archpad/vault-config';

async function bootstrap() {

  // Load secrets from Vault before creating the application
  // В Kubernetes секреты уже загружены через Vault Agent Injector в переменные окружения
  // В local development загружаем из Vault API
  const nodeEnv = process.env.NODE_ENV || 'development';
  if (nodeEnv === 'local') {
    await loadVaultSecrets({
      nodeEnv,
      secretsPath: 'kv/data/archpad/demo/backend/arch-repo-service',
    });
  }

  const app = await NestFactory.create(ArchRepoServiceModule, {
    bufferLogs: true,
  });

  const appLogger = app.get(LoggerService);
  app.useLogger(appLogger);

  // Debug: Check if database variables are loaded
  appLogger.debug(`PROJECT_DB: ${process.env.PROJECT_DB || 'NOT SET'}`, 'Bootstrap');
  appLogger.debug(`PROJECT_DB_USER: ${process.env.PROJECT_DB_USER || 'NOT SET'}`, 'Bootstrap');
  appLogger.debug(`PROJECT_DB_PASSWORD: ${process.env.PROJECT_DB_PASSWORD ? '***SET***' : 'NOT SET'}`, 'Bootstrap');
  appLogger.debug(`PG_HOST: ${process.env.PG_HOST || 'NOT SET'}`, 'Bootstrap');
  appLogger.debug(`POSTGRES_ENDPOINT: ${process.env.POSTGRES_ENDPOINT || 'NOT SET'}`, 'Bootstrap');
  appLogger.debug(`POSTGRES_PORT: ${process.env.POSTGRES_PORT || 'NOT SET'}`, 'Bootstrap');
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Archpad API')
    .setDescription('')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  SwaggerModule.setup('api-json', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
