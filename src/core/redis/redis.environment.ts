import type { TypedClass } from '@overtk/common/typing/class';
import { BooleanString } from '@overtk/common/boolean';
import {
  BooleanProperty,
  Class,
  Mixin,
  NumberProperty,
  StringProperty,
} from '@overtk/common/class';
import {
  DEFAULT_REDIS_COMMAND_TIMEOUT,
  DEFAULT_REDIS_CONNECT_TIMEOUT,
  REDIS_DEFAULT_PORT,
} from '@overtk/common/redis';

export type RedisEnvironment = {
  USE_REDIS_CLUSTER: boolean;
  /** All nodes of redis cluster */
  REDIS_CLUSTER_NODES?: string[];
  REDIS_HOST?: string;
  REDIS_PORT?: number;
  REDIS_USER?: string;
  REDIS_PASSWORD?: string;
  REDIS_CONNECT_TIMEOUT: number;
  REDIS_COMMAND_TIMEOUT: number;
};

@Class({
  sealed: false,
  validate: false,
  freeze: false,
})
class RedisEnvironmentImpl implements RedisEnvironment {
  @BooleanProperty({
    optional: true,
    transform: ({ value }) => value === BooleanString.TRUE,
  })
  public USE_REDIS_CLUSTER: boolean = false;

  public REDIS_CLUSTER_NODES?: string[];

  @StringProperty({
    optional: true,
  })
  public REDIS_HOST?: string;

  @NumberProperty({
    optional: true,
    transform: ({ value }) => +(value as any),
  })
  public REDIS_PORT?: number = REDIS_DEFAULT_PORT;

  @StringProperty({
    optional: true,
  })
  public REDIS_USER?: string;

  @StringProperty({
    optional: true,
  })
  public REDIS_PASSWORD?: string;

  @NumberProperty({
    optional: true,
  })
  public REDIS_CONNECT_TIMEOUT: number = DEFAULT_REDIS_CONNECT_TIMEOUT;

  @NumberProperty({
    optional: true,
  })
  public REDIS_COMMAND_TIMEOUT: number = DEFAULT_REDIS_COMMAND_TIMEOUT;
}

export function RedisEnvironmentMixin<T extends object>(
  targetClass: TypedClass<T>,
): TypedClass<RedisEnvironment & T> {
  return Mixin(RedisEnvironmentImpl, targetClass);
}
