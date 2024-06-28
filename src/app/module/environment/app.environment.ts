import type { CoreEnvironment } from '@overtk/core/environment';
import type { RedisEnvironment } from '@overtk/core/redis';
import type { TypedClass } from '@overtk/common/typing/class';
import { CoreEnvironmentMixin } from '@overtk/core/environment';
import { Class } from '@overtk/common/class';
import { RedisEnvironmentMixin } from '@overtk/core/redis';

export type AppEnvironment = CoreEnvironment & RedisEnvironment;

@Class({
  freeze: false,
  sealed: true,
  validate: false,
})
class AppEnvironmentImpl
  extends RedisEnvironmentMixin(CoreEnvironmentMixin())
  implements AppEnvironment {}

export function AppEnvironmentClass(): TypedClass<AppEnvironment> {
  return AppEnvironmentImpl;
}
