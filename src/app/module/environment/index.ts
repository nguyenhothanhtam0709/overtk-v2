import type { DynamicModule } from '@nestjs/common';
import { EnvironmentModule } from '@overtk/core/environment';
import { AppEnvironmentClass } from './app.environment';

export type { AppEnvironment } from './app.environment';

export const createAppEnvironmentModule = (): DynamicModule =>
  EnvironmentModule.register(AppEnvironmentClass());
