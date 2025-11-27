import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const appLogger = app.get(LoggerService);
  app.useLogger(appLogger);
  
  if (process.env.NODE_ENV !== 'production') {
    const orm = app.get(MikroORM);
    const generator = orm.getSchemaGenerator();
    
    // Если БД пустая — можно один раз сделать createSchema()
    // await generator.createSchema();
    await generator.updateSchema();
  }

  const config = new DocumentBuilder()
    .setTitle('Archpad API')
    .setDescription('')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
