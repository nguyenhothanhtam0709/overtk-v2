import type { TypedClass } from '../class';

export type TypedClassDecorator<
  T,
  TClass extends TypedClass<T> = TypedClass<T>,
> = (target: TClass) => TClass | void;
