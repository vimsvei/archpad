import { NestFactory } from '@nestjs/core';
import { LoggerService } from './logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ArchRepoServiceModule} from "./arch-repo-service.module";

async function bootstrap() {
  const app = await NestFactory.create(ArchRepoServiceModule, {
    bufferLogs: true,
  });
  
  const appLogger = app.get(LoggerService);
  app.useLogger(appLogger);
  
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

