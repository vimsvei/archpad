import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { LoggerService } from '@archpad/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);

  const appLogger = app.get(LoggerService);
  app.useLogger(appLogger);

  const config = new DocumentBuilder()
    .setTitle('Archpad Auth Service')
    .setDescription('Minimal auth proxy for Keycloak (tokens + user actions).')
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

