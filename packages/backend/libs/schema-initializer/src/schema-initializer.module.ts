import { DynamicModule, Module } from '@nestjs/common';
import { SchemaInitializer } from './schema-initializer.service';
import { SchemaInitializerOptions, SCHEMA_INITIALIZER_OPTIONS } from './schema-initializer-options.interface';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LoggerModule } from '@archpad/logger';

@Module({})
export class SchemaInitializerModule {
  static forRoot(options?: SchemaInitializerOptions): DynamicModule {
    return {
      module: SchemaInitializerModule,
      imports: [MikroOrmModule, LoggerModule],
      providers: [
        {
          provide: SCHEMA_INITIALIZER_OPTIONS,
          useValue: options ?? {},
        },
        SchemaInitializer,
      ],
      exports: [SchemaInitializer],
    };
  }
}
