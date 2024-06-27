import type { DynamicModule } from '@nestjs/common';
import { EnvironmentModule } from '@overtk/core/environment';
import { AppEnvironmentImpl } from './app.environment';

export { AppEnvironment } from './app.environment';

export const createAppEnvironmentModule = (): DynamicModule =>
  EnvironmentModule.register(AppEnvironmentImpl);
