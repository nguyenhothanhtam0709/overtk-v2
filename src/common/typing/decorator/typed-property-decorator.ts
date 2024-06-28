import type { CheckProperty } from './_helpers';
import type { ObjectKey } from '../class';

export type TypedPropertyDecorator<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
  TValue,
  TOptional extends boolean = false,
> = (
  target: TTarget,
  propertyKey: TKey,
) => void | CheckProperty<
  {
    slot: TTarget[TKey];
    value: TValue;
    optional: TOptional;
    slotName: 'property';
    valueName: 'decorator';
  },
  never
>;
