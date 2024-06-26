import type { Class } from '../class';

export type TypedClassDecorator<T, TClass extends Class<T> = Class<T>> = (
  target: TClass,
) => TClass | void;
