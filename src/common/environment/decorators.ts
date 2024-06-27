import { Inject } from '@nestjs/common';
import { ENVIRONMENT_RECORD, ENVIRONMENT_SERVICE } from './constants';

export function InjectEnvironmentRecord(): ReturnType<typeof Inject> {
  return Inject(ENVIRONMENT_RECORD);
}
export function InjectEnvironmentService(): ReturnType<typeof Inject> {
  return Inject(ENVIRONMENT_SERVICE);
}
