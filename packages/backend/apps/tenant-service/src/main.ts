import { NestFactory } from '@nestjs/core';
import { TenantServiceModule } from './tenant-service.module';
import { LoggerService } from '@archpad/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { loadVaultSecrets } from '@archpad/vault-config';

async function bootstrap() {
  // Load secrets from Vault before creating the application
  await loadVaultSecrets({
    nodeEnv: process.env.NODE_ENV,
  });

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
