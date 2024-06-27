import type { CoreEnvironment } from './core.environment';
import { loadEnv } from '@overtk/common/environment';
import { Injectable } from '@nestjs/common';
import { TypedClass } from '@overtk/common/typing/class';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

@Injectable()
export class EnvironmentService<T extends CoreEnvironment> {
  public readonly environment: Readonly<T>;

  constructor(environmentClazz: TypedClass<T>) {
    // load process.env
    loadEnv();

    const environment = plainToInstance(environmentClazz, process.env, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
      enableImplicitConversion: true,
    });
    const validateErr = validateSync(environment);
    if (validateErr.length) {
      throw validateErr;
    }
    this.environment = Object.freeze(environment);
  }
}
