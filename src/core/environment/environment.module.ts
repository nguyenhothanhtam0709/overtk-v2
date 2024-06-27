import type { TypedClass } from '@overtk/common/typing/class';
import type { CoreEnvironment } from './core.environment';
import { type DynamicModule, Module } from '@nestjs/common';
import {
  ENVIRONMENT_RECORD,
  ENVIRONMENT_SERVICE,
} from '@overtk/common/environment';
import { EnvironmentService } from './environment.service';

@Module({})
export class EnvironmentModule {
  public static register<T extends CoreEnvironment>(
    environmentClazz: TypedClass<T>,
  ): DynamicModule {
    const environmentService = new EnvironmentService(environmentClazz);

    return {
      module: EnvironmentModule,
      providers: [
        {
          provide: ENVIRONMENT_SERVICE,
          useValue: environmentService,
        },
        {
          provide: ENVIRONMENT_RECORD,
          useValue: environmentService.environment,
        },
      ],
      exports: [ENVIRONMENT_SERVICE, ENVIRONMENT_RECORD],
      global: true,
    };
  }
}
