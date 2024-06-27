import {
  Class,
  EnumProperty,
  NumberProperty,
  StringProperty,
} from '@overtk/common/class';
import { loadEnv } from '@overtk/common/environment';
import {
  DEFAULT_APP_HOST,
  DEFAULT_APP_INSTANCE_ID,
  DEFAULT_APP_PORT,
  DEFAULT_NODE_ENV,
  NodeEnv,
} from '@overtk/common/http/server';
import { resolvePathFromRoot } from '@overtk/common/path';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export type CoreEnvironment = {
  API_HOST: string;
  API_PORT: number;
  HTTPS_CERT_FILE_PATH: string;
  HTTPS_KEY_FILE_PATH: string;
  INSTANCE_ID: string;
  NODE_ENV: NodeEnv;
};

@Class({
  freeze: false,
  validate: false,
})
export class CoreEnvironmentImpl implements CoreEnvironment {
  @StringProperty({
    optional: true,
  })
  public API_HOST: string = DEFAULT_APP_HOST;

  @NumberProperty({
    optional: true,
  })
  public API_PORT: number = DEFAULT_APP_PORT;

  @StringProperty({
    transform(params) {
      return resolvePathFromRoot(params.value as string);
    },
  })
  public HTTPS_CERT_FILE_PATH!: string;

  @StringProperty({
    transform(params) {
      return resolvePathFromRoot(params.value as string);
    },
  })
  public HTTPS_KEY_FILE_PATH!: string;

  @StringProperty({
    optional: true,
  })
  public INSTANCE_ID: string = DEFAULT_APP_INSTANCE_ID;

  @EnumProperty({
    enum: NodeEnv,
    optional: true,
  })
  public NODE_ENV: NodeEnv = DEFAULT_NODE_ENV;
}

let coreEnv: Readonly<CoreEnvironment> | undefined;
/**
 * Load core environment from process.env
 * For use in case that cannot inject EnvironmentService
 *
 * @returns {CoreEnvironment}
 */
export const getCoreEnvironment = (): Readonly<CoreEnvironment> => {
  if (!coreEnv) {
    // Load process.env
    loadEnv();

    const environment = plainToInstance(CoreEnvironmentImpl, process.env, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
      enableImplicitConversion: true,
    });

    const validateErr = validateSync(environment);
    if (validateErr.length) {
      throw validateErr;
    }
    coreEnv = Object.freeze(environment);
  }

  return coreEnv;
};
