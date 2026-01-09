import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ArchRepoServiceModule } from './arch-repo-service.module';
import { LoggerService } from '@archpad/logger';
import { loadVaultSecrets } from '@archpad/vault-config';

async function bootstrap() {
  // Load secrets from Vault before creating the application
  await loadVaultSecrets({
    nodeEnv: process.env.NODE_ENV,
  });

  // Debug: Check if database variables are loaded
  console.log(`[Debug] PROJECT_DB: ${process.env.PROJECT_DB || 'NOT SET'}`);
  console.log(`[Debug] PROJECT_DB_USER: ${process.env.PROJECT_DB_USER || 'NOT SET'}`);
  console.log(`[Debug] PROJECT_DB_PASS: ${process.env.PROJECT_DB_PASS ? '***SET***' : 'NOT SET'}`);
  console.log(`[Debug] PG_HOST: ${process.env.PG_HOST || 'NOT SET'}`);
  console.log(`[Debug] PG_PORT: ${process.env.PG_PORT || 'NOT SET'}`);

  const app = await NestFactory.create(ArchRepoServiceModule, {
    bufferLogs: true,
  });

  const appLogger = app.get(LoggerService);
  app.useLogger(appLogger);
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
