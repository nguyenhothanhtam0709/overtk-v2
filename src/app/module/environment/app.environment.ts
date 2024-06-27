import type { CoreEnvironment } from '@overtk/core/environment';
import { Class, Mixin } from '@overtk/common/class';
import { CoreEnvironmentImpl } from '@overtk/core/environment';

export type AppEnvironment = {};

@Class({
  freeze: false,
  sealed: true,
  validate: false,
})
export class AppEnvironmentImpl
  extends Mixin(CoreEnvironmentImpl)
  implements CoreEnvironment, AppEnvironment {}
