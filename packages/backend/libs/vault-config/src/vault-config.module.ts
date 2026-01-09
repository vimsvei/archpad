import { DynamicModule, Global, Module } from '@nestjs/common';
import { VaultConfigService } from './vault-config.service';
import type { VaultConfigOptions } from './vault-config.interface';

@Global()
@Module({})
export class VaultConfigModule {
  static forRoot(options?: VaultConfigOptions): DynamicModule {
    return {
      module: VaultConfigModule,
      providers: [
        {
          provide: VaultConfigService,
          useFactory: () => {
            const service = new VaultConfigService(options);
            return service;
          },
        },
      ],
      exports: [VaultConfigService],
    };
  }
}
