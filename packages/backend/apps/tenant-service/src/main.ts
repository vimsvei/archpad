import { NestFactory } from '@nestjs/core';
import { TenantServiceModule } from './tenant-service.module';
import { LoggerService } from '@archpad/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
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
