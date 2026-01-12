import { NestFactory } from '@nestjs/core';
import { TenantServiceModule } from './tenant-service.module';
import { LoggerService } from '@archpad/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { loadVaultSecrets } from '@archpad/vault-config';

async function bootstrap() {
  // Load secrets from Vault before creating the application
  // В Kubernetes секреты уже загружены через Vault Agent Injector в переменные окружения
  // В local development загружаем из Vault API
  const nodeEnv = process.env.NODE_ENV || 'development';
  if (nodeEnv === 'local') {
    await loadVaultSecrets({
      nodeEnv,
      secretsPath: 'kv/data/archpad/demo/backend/tenant-service',
    });
  }

  const app = await NestFactory.create(TenantServiceModule);

  const appLogger = app.get(LoggerService);
  app.useLogger(appLogger);

  const config = new DocumentBuilder()
    .setTitle('Archpad Tenant API')
    .setDescription('')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  SwaggerModule.setup('api-json', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
